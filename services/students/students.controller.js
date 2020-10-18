const { ErrorHandler } = require("../../utils/error");
const errors = require("../../utils/errors");
const respondWith = require("../../utils/respond");
const { createToken } = require("../../helpers/jwt");
const { student_token } = require("../../helpers/tokens");
const { encryptPassword, comparePassword } = require("../../helpers/bcrypt");
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
    student_info.subscription_end_date = format(addMonths(new Date(),1),'yyyy-MM-dd'); // TODO:: THIS IS DEPEND ON THE TEACHER NEEDS. (USE CONFIG)
    // add the student: 
    const addStudent = await studentsServices.addStudent(student_info);
    // delete the password from response and generate the token:
    delete addStudent.password;
    const token = createToken(student_token(addStudent.student_id,addStudent.student_name,addStudent.phone_number));
    // send the response:
    return respondWith(true,201,{...addStudent, token},res);
}catch(err){
    next(err);
}
};

exports.signin = async (req,res,next)=>{
try {
    const student_info = req.body;
    // Check if the account exists and return the password to compare:
    const isExist = await studentsServices.getStudent(student_info.phone_number, ["password","student_id","phone_number","student_name","refresh_token"]);
    if (!isExist){
        throw new ErrorHandler(401,errors.NOT_AUTHENTICATED);
    }
    // check if the passwoed is correct:
    const isCorrectPassword = await comparePassword(student_info.password,isExist.password);
    if(!isCorrectPassword){
        throw new ErrorHandler(401,errors.NOT_AUTHENTICATED);
    }
    // generate a token: 
    const token = createToken(student_token(isExist.student_id,isExist.student_name,isExist.phone_number));
    // delete password and send the response: 
    delete isExist.password;
    // send the response:
    return respondWith(true,200,{...isExist, token},res);
}catch(err){
    next(err);
}
};