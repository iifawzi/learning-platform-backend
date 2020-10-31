const { ErrorHandler } = require("../../utils/error");
const errors = require("../../utils/errors");
const respondWith = require("../../utils/respond");
const groupsServices = require("./groups.service");
const getUniqueId = require("../../helpers/getUniqueId");
exports.create = async (req,res,next)=>{
try {
    // get group's info from body
    const group_info = req.body;
    // put the creator id in the group's info
    group_info.teacher_id = req.requester.teacher_id;
    // add a code to the group: 
    group_info.group_code = getUniqueId();
    // create the group
    const createGroup = await groupsServices.create(group_info);
    // return the created group's info
    return respondWith(true,201,createGroup,res);
}catch(err){
    next(err);
}
};