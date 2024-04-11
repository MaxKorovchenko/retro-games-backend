const express = require("express");
const { validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas");
const { register, login } = require("../controllers/authCTRL");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

module.exports = {
  authRouter: router,
};
