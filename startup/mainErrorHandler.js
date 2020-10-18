const {handleError} = require("../utils/error");
module.exports = (app)=>{
    app.use((err,req,res,next)=>{
        handleError(err,res);
    });
};