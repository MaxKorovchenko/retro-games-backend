const express = require("express");
const { validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas");
const { register } = require("../controllers/authCTRL");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

module.exports = {
  authRouter: router,
};
