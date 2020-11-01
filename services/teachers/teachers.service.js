const teachersModel = require("./teachers.model");

// get specific teacher"
exports.getTeacher  = async (teacher_phone_number,attributes,raw = true) => { // raw will be used when need to update only, to get a model object.
    const teacher = await teachersModel.findOne({where: {teacher_phone_number}, attributes: attributes, raw});
    return teacher;
};

// to create a teacher: 
exports.create = async (teacher_info)=>{
    const teacher = await teachersModel.create(teacher_info);
    return teacher.dataValues;
}

// to delete specific teacher: 
exports.deleteTeacher = async (teacher_phone_number)=>{
    const teacher = await teachersModel.destroy({where: {teacher_phone_number}});
    return teacher;
}