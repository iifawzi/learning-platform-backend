const { ErrorHandler } = require("../../utils/error");
const errors = require("../../utils/errors");
const respondWith = require("../../utils/respond");
const { createToken } = require("../../helpers/jwt");
const tokens = require("../../helpers/tokens");
const { encryptPassword, comparePassword } = require("../../helpers/bcrypt");
const crypto = require("crypto");
// Teachers stuff: 
const teachersServices = require("./teachers.service");




exports.create = async (req,res,next)=>{
try {
    const teacher_info = req.body;
    // check if the teacher exists or not: 
    const isExist = await teachersServices.getTeacher(teacher_info.teacher_phone_number, ["teacher_id"]);
    if (isExist) {
        throw new ErrorHandler(409,errors.ALREADY_EXIST);
    };
    // encrypt the password: 
    const encrypted_password = await encryptPassword(teacher_info.password);
    teacher_info.password = encrypted_password;
    // generate the refresh token: 
    const refresh_token = crypto.randomBytes(16).toString("hex");
    teacher_info.teacher_refresh_token = refresh_token;
    // add the teacher: 
    const addTeacher = await teachersServices.create(teacher_info);
    // delete the password from response and generate the token:
    delete addTeacher.password;
    const token = createToken(tokens.teacher_token(addTeacher.teacher_id,addTeacher.teacher_name,addTeacher.teacher_phone_number,addTeacher.teacher_role));
    // send the response:
    return respondWith(true,201,{...addTeacher, token},res);
}catch(err){
    next(err);
};
};