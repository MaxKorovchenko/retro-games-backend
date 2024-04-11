const { addGameSchema } = require("./gamesSchemas");
const { loginSchema, registerSchema } = require("./authSchemas");

module.exports = {
  addGameSchema,
  loginSchema,
  registerSchema,
};
