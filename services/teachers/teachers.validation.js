const Joi = require("joi");

exports.create = Joi.object({
    teacher_name: Joi.string().required(),
    teacher_phone_number: Joi.string().required(),
    password: Joi.string().required(),
    teacher_role: Joi.string().valid("teacher", "principle").required(),
});

exports.signin = Joi.object({
    teacher_phone_number: Joi.string().required(),
    password:Joi.string().required()
});