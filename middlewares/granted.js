const roles = require("../startup/accessControl");
const { ErrorHandler } = require("../utils/error");

module.exports = (action,resource)=>{
    return (req,res,next)=>{
        try {
            let role = req.requester.role;
            const isGranted = roles.can(role)[action](resource).granted;
            if (isGranted){
                next();
            }else {
                throw new ErrorHandler(403,"Not Authorized");
            }
        }catch(err){
            next(err);
        };
    }

}
