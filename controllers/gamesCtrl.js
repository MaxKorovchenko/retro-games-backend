const {
  getAllGamesService,
  getGameService,
  addGameService,
  updateGameService,
  deleteGameService,
} = require("../db/gamesService");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllgames = ctrlWrapper(async (req, res) => {
  const games = await getAllGamesService();
  res.status(200).json(games);
});

const getGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await getGameService(gameId);

  if (!game) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(game);
});

const addGame = ctrlWrapper(async (req, res) => {
  const game = await addGameService(req.body);
  res.status(201).json(game);
});

const updateGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await updateGameService(gameId, req.body);

  if (!game) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(game);
});

const deleteGame = ctrlWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await deleteGameService(gameId);

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
