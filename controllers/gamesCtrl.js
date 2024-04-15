const { HttpError, ctrlWrapper } = require("../helpers");
const { Game } = require("../models/game");

const getAllgames = ctrlWrapper(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const games = await Game.find({}, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit);

  res.status(200).json(games);
});

const getGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await Game.findById(gameId);

  if (!game) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(game);
});

const addGame = ctrlWrapper(async (req, res) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
});

const updateGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await Game.findByIdAndUpdate(gameId, req.body, { new: true });

  if (!game) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(game);
});

const deleteGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await Game.findByIdAndDelete(gameId);

  if (!game) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json({ message: "Game deleted" });
});

module.exports = {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
};
