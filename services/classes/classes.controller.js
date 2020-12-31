const { ErrorHandler } = require("../../utils/error");
const errors = require("../../utils/errors");
const respondWith = require("../../utils/respond");
const getUniqueId = require("../../helpers/getUniqueId");
// classes stuff: 
const classesServices = require("./classes.service");




exports.create = async (req,res,next)=>{
try {
    // get class's info from body
    const class_info = req.body;
    // put the creator id in the class's info
    class_info.creator_teacher_id = req.requester.teacher_id;
    // add a code to the class: 
    class_info.class_code = getUniqueId();
    // create the class
    const createdClass = await classesServices.create(class_info);
    // return the created class's info
    return respondWith(true,201,createdClass,res);
}catch(err){
    next(err);
}
};

exports.getClasses = async (req,res,next)=>{
    try {
        // get the classes: 
        const teacher_id = req.requester.teacher_id;
        const classes = await classesServices.getClasses(teacher_id);
        return respondWith(true,200,classes,res);
    }catch(err){
        next(err);
    }
};

exports.deleteClass = async (req,res,next)=>{
    try {
        // get class id from body: 
        const {class_id} = req.body;
        // get teacher_id from req: 
        const {teacher_id} = req.requester;
        // get and delete the class which need to be deleted
        // this will always return true since we are using where clouse to delete, it may be updated later TODO
        const deleteCLass = await classesServices.getAndDeleteClass(teacher_id,class_id);
        return respondWith(true,200,deleteCLass,res);
    }catch(err){
        next(err);  
    }
};