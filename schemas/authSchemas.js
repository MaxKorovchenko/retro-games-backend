const Joi = require("joi");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  title: Joi.string().required(),
  platform: Joi.string().valid("8-bit", "16-bit").required(),
  favorite: Joi.boolean(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
