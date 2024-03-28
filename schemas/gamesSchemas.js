const Joi = require("joi");

const addGameSchema = Joi.object({
  title: Joi.string().required(),
  platform: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

module.exports = {
  addGameSchema,
};
