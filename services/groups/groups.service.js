const groupsModel = require("./groups.model");

// create new group: 
exports.create = async (group_info)=>{
    const group = await groupsModel.create(group_info);
    return group.dataValues;
}