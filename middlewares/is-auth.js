const { ErrorHandler } = require("../helpers/error");
const {checkToken} = require("../helpers/jwt");
const errors = require("../utils/errors");

const isAuth = ()=>{
    return (req, res, next) => {
        try {
            const encoded_token = req.headers.authorization;
            if (!encoded_token) {
                throw new ErrorHandler(401, errors.NOT_AUTENTICATED);
            } else {
                let splicedToken;
                if (encoded_token.startsWith("Bearer ")) {
                // Remove Bearer from string
                    const spliced = encoded_token.split(" ");
                    splicedToken = spliced[1];
                }else {
                    splicedToken = encoded_token;
                }
   
                let decoded_token = checkToken(splicedToken);
                req.requester = {
                    ...decoded_token,
                };
                return next();
            }
        } catch (err) {
            err.statusCode = 401;
            next(err);
        }
    };
};
 
module.exports = isAuth;