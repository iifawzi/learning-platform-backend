const classesModel = require("./classes.model");
const Sequelize = require("sequelize");
const {db} = require("../../startup/db");

// create new class: 
exports.create = async (class_info)=>{
    const created_class = await classesModel.create(class_info);
    return created_class.dataValues;
};


// delete a specific class: 
exports.deleteClass = async (class_id)=>{
    const deletedClass = await classesModel.destroy({where: {class_id}});
    return deletedClass;
}


// get the classes for specific teacher either he is the creator or helper to the creator
exports.getClasses = async (teacher_id) => { 
    const classes = await db.query("SELECT classes.class_id, classes.class_name, classes.class_description, classes.class_code, classes.join_using, classes.creator_teacher_id FROM classes LEFT JOIN teachers_classes ON classes.class_id = teachers_classes.class_id where classes.creator_teacher_id = :teacher_id or teachers_classes.teacher_id = :teacher_id",{
        replacements:  { teacher_id },
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
    });
    return classes;
};


// get and delete specific class: 
exports.getAndDeleteClass = async (teacher_id, class_id)=>{
    
    const deletedClass = await classesModel.destroy({where: {creator_teacher_id: teacher_id, class_id}});
    return deletedClass;
};