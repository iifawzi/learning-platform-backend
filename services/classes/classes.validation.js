const Joi = require("joi");


exports.create = Joi.object({
    class_name: Joi.string().required(),
    class_description: Joi.string().required(),
    join_using: Joi.string().valid("request", "code").required(),
});
