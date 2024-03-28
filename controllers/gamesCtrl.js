const {
  getAllGamesService,
  getGameService,
  addGameService,
  updateGameService,
  deleteGameService,
} = require("../db/gamesService");
const { HttpError } = require("../helpers");
const { addGameSchema } = require("../schemas");

const getAllgames = async (req, res, next) => {
  try {
    const games = await getAllGamesService();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

const getGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await getGameService(gameId);

    if (!game) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const addGame = async (req, res, next) => {
  try {
    const { error } = addGameSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const game = await addGameService(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const { error } = addGameSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const { gameId } = req.params;
    const game = await updateGameService(gameId, req.body);

    if (!game) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await deleteGameService(gameId);

    if (!game) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json({ message: "Game deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
};
