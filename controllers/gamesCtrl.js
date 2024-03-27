const {
  getAllGamesService,
  getGameService,
  addGameService,
} = require("../db/gamesService");
const { HttpError } = require("../helpers");

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
    const game = await addGameService(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllgames,
  getGame,
  addGame,
};
