const bcrypt = require("bcrypt");
const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");

const register = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw new HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
});

module.exports = {
  register,
};