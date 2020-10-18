const studentsModel = require("./students.model");

// get a specific student: 
exports.getStudent  = async (phone_number,attributes) => {
    const student = await studentsModel.findOne({where: {phone_number}, attributes: attributes});
    return student;
};
// add new student: 
exports.addStudent = async (student_info)=>{
    const student = await studentsModel.create(student_info);
    return student.dataValues;
}