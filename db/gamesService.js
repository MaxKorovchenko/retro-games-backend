const { readFile } = require("fs");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const gamesPath = path.resolve("db", "games.json");

const getAllGamesService = async () => {
  const games = await fs.readFile(gamesPath);
  return JSON.parse(games);
};

module.exports = {
  getAllGamesService,
};
