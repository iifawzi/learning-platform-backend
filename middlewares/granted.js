const roles = require("../startup/accessControl");
const { ErrorHandler } = require("../utils/error");
const errors = require("../utils/errors");

module.exports = (action,resource)=>{
    return (req,res,next)=>{
        try {
            let role = req.requester.role;
            const isGranted = roles.can(role)[action](resource).granted;
            if (isGranted){
                next();
            }else {
                throw new ErrorHandler(403,errors.GRANTED_NOT_AUTHORIZED);
            }
        }catch(err){
            throw new ErrorHandler(403,errors.GRANTED_NOT_AUTHORIZED);
        };
    }

}
