const studentsModel = require("./students.model");

// get a specific student: 
exports.getStudent  = async (phone_number,attributes,raw = true) => { // raw will be used when need to update only, to get a model object.
    const student = await studentsModel.findOne({where: {phone_number}, attributes: attributes, raw});
    return student;
};
//delete a specific student by phone_number: 
exports.deleteStudent  = async (phone_number) => {
    const student = await studentsModel.destroy({where: {phone_number}});
    return student;
};
// add new student: 
exports.addStudent = async (student_info)=>{
    const student = await studentsModel.create(student_info);
    return student.dataValues;
}