const bcrypt = require("bcrypt");
const config = require("config");

exports.encryptPassword = async (password)=>{
    const encodedPassword = await bcrypt.hash(password,config.get("bcrypt.saltRounds"));
    return encodedPassword;
};

exports.comparePassword = async (password,encrypted)=>{
    const isSamePassword = await bcrypt.compare(password,encrypted);
    return isSamePassword;
};