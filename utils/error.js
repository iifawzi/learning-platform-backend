class ErrorHandler extends Error {
    constructor(statusCode,message){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const handleError = (err,res)=>{
    const {message,statusCode = 500} = err;
    res.status(statusCode).json({
        status: false,
        message,
        data: {}
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
  