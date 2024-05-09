const Joi = require("joi");

const addGameSchema = Joi.object({
  title: Joi.string().required(),
  platform: Joi.string().valid("8-bit", "16-bit").required(),
  coverImageURL: Joi.string().required(),
  description: Joi.string().required(),
  gallery: Joi.array().items(Joi.string()).required(),
  genre: Joi.string()
    .valid(
      "action",
      "adventure",
      "RPG",
      "strategy",
      "simulation",
      "puzzle",
      "sports",
      "platformer",
      "shooter",
      "fighting",
      "racing",
      "horror",
      "educational",
      "music",
      "party",
      "other"
    )
    .required(),
  numberOfPlayers: Joi.number().required(),
  releaseYear: Joi.number().required(),
});

module.exports = {
  addGameSchema,
};
