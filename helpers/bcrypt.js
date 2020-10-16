const bcrypt = require("bcrypt");
const config = require("config");
const { ErrorHandler } = require("./error");
const errors = require("../utils/errors");

exports.encryptPassword = async (password)=>{
    const encodedPassword = await bcrypt.hash(password,config.get("bcrypt.saltRounds"));
    return encodedPassword;
};

exports.decryptPassword = async (password,encrypted)=>{
    const decodedPassword = await bcrypt.compare(password,encrypted);
    if (!decodedPassword){
        throw new ErrorHandler(401,errors.CHECK_CREDENTIALS);
    }
    return decodedPassword;
};