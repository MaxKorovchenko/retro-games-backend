const { getAllGamesService } = require("../db/gamesService");

const getAllgames = async (req, res) => {
  const games = await getAllGamesService();

  res.status(200).json(games);
};

module.exports = {
  getAllgames,
};
