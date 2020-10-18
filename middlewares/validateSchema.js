const { ErrorHandler } = require("../utils/error");
const validateSchema = (schema, property, abortEarly = false) => {
    return (req, res, next) => {
        if (!req[property]) {
            req[property] = {}; // for the case if called with empty body, to return the errors.
        }
        const { error } = schema.validate(req[property], {
            abortEarly,
        });
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const errors = details.map((detail) => detail.message);
            const err = new ErrorHandler(400, errors);
            next(err);
        }
    };
};

module.exports = validateSchema;
