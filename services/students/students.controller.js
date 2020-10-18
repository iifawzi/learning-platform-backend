const { ErrorHandler } = require("../../utils/error");
const errors = require("../../utils/errors");
const respondWith = require("../../utils/respond");
const { createToken } = require("../../helpers/jwt");
const { student_token } = require("../../helpers/tokens");
const { encryptPassword } = require("../../helpers/bcrypt");
const crypto = require("crypto");
const {format,addMonths} = require("date-fns");
const studentsServices = require("./students.service");


exports.signup = async (req,res,next)=>{
try {
    const student_info = req.body;
    // check if the student exists or not: 
    const isExist = await studentsServices.getStudent(student_info.phone_number, ["student_id"]);
    if (isExist) {
        throw new ErrorHandler(409,errors.ALREADY_EXIST);
    };
    // encrypt the password: 
    const encrypted_password = await encryptPassword(student_info.password);
    student_info.password = encrypted_password;
    // generate the refresh token: 
    const refresh_token = crypto.randomBytes(16).toString("hex");
    student_info.refresh_token = refresh_token;
    // set the end subscription date: 
    student_info.subscription_end_date = format(addMonths(new Date(),1),'yyyy-MM-dd');
    // add the student: 
    const addStudent = await studentsServices.addStudent(student_info);
    // delete the password from response and generate the token:
    delete addStudent.password;
    const token = createToken(student_token(addStudent.student_id,addStudent.student_name,addStudent.phone_number));
    return respondWith(true,201,{...addStudent, token},res);
}catch(err){
    next(err);
}
}