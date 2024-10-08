const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw new HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      favoriteGames: newUser.favoriteGames,
    },
  });
});

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new HttpError(401, "Bad email or password");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new HttpError(401, "Bad email or password");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      favoriteGames: user.favoriteGames,
    },
  });
});

const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { name, email, favoriteGames } = req.user;

  return res.status(200).json({
    name,
    email,
    favoriteGames,
  });
});

const logout = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  return res.status(200).json({
    message: "Logout successful",
  });
});

const addToFavoriteGames = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { gameId } = req.body;

  if (!isValidObjectId(gameId)) {
    throw new HttpError(400, `id ${gameId} is not valid`);
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.favoriteGames.includes(gameId)) {
    throw new HttpError(400, "Game already in favorites");
  }

  user.favoriteGames.push(gameId);
  await user.save();

  return res.status(200).json({
    favoriteGames: user.favoriteGames,
    message: "The game was added to your favorites",
  });
});

const removeFromFavoriteGames = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { gameId } = req.params;

  if (!isValidObjectId(gameId)) {
    throw new HttpError(400, `id ${gameId} is not valid`);
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const gameIndex = user.favoriteGames.indexOf(gameId);

  if (gameIndex === -1) {
    throw new HttpError(400, "Game not found in favorites");
  }

  user.favoriteGames.splice(gameIndex, 1);

  await user.save();

  return res.status(200).json({
    favoriteGames: user.favoriteGames,
    message: "The game was removed from your favorites",
  });
});

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  addToFavoriteGames,
  removeFromFavoriteGames,
};
