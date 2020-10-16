const {handleError} = require("../utils/error");
module.exports = (app)=>{
    app.use((err,req,res)=>{
        handleError(err,res);
    });
};