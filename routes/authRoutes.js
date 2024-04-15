const express = require("express");
const { validateBody, authenticate } = require("../middlewares");
const { registerSchema, loginSchema } = require("../schemas");
const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../controllers/authCtrl");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrentUser);

router.post("/logout", authenticate, logout);

module.exports = {
  authRouter: router,
};
