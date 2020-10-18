const Joi = require("joi");

exports.signup = Joi.object({
    student_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
});

exports.signin = Joi.object({
    phone_number: Joi.string().required(),
    password:Joi.string().required()
});