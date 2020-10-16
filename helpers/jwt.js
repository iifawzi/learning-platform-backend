const jwt = require("jsonwebtoken");
const config = require("config");
const {ErrorHandler} = require("../helpers/error");
const errors = require("../utils/errors");


exports.createToken = (payload)=>{
    try {
        const token = jwt.sign(payload,config.get("jwt.secret"),{expiresIn: config.get("jwt.expiresIn")});
        return token;
    }catch(err){
        throw new ErrorHandler(401,err);
    }
};


exports.checkToken = (token)=>{
    try {
        const checkingResult = jwt.verify(token,config.get("jwt.secret"));
        return checkingResult;
    }catch(err){
        throw new ErrorHandler(401,err);
    }
};

exports.decodeToken = (token)=>{
    try {
        const user_data = jwt.decode(token);
        return user_data;
    }catch(err){
        throw new ErrorHandler(401,errors.INVALID_TOKEN);
    }
};