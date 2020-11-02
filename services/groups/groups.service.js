const groupsModel = require("./groups.model");

// create new group: 
exports.create = async (group_info)=>{
    const group = await groupsModel.create(group_info);
    return group.dataValues;
};


// delete a specific group: 
exports.deleteGroup = async (group_id)=>{
    const group = await groupsModel.destroy({where: {group_id}});
    return group;
}

