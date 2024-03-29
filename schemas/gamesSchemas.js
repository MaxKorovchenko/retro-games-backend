const Joi = require("joi");

const addGameSchema = Joi.object({
  title: Joi.string().required(),
  platform: Joi.string().valid("8-bit", "16-bit").required(),
  favorite: Joi.boolean(),
});

module.exports = {
  addGameSchema,
};
