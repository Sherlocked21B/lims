const joi = require("@hapi/joi");

const registervalidation = (data) => {
    const schema = joi.object({
        userName: joi.string().min(4).required(),
        password: joi.string().min(6).required(),
        role: joi.string().required(),
        adminId:joi.string().required(),
        adminPassword:joi.string().min(6).required()

    });
    return schema.validate(data);
};

const loginvalidation = (data) => {
    const schema = joi.object({
        userName: joi.string().min(4).required(),
        password: joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
