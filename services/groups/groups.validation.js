const Joi = require("joi");


exports.create = Joi.object({
    group_name: Joi.string().required(),
    group_description: Joi.string().required(),
    join_using: Joi.string().valid("request", "code").required(),
});
