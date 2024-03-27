const { readFile } = require("fs");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const gamesPath = path.resolve("db", "games.json");

const getAllGamesService = async () => {
  const games = await fs.readFile(gamesPath);
  return JSON.parse(games);
};

const getGameService = async (id) => {
  const games = await getAllGamesService();
  const game = games.find((game) => game.id === id);
  return game || null;
};

const addGameService = async (data) => {
  const games = await getAllGamesService();

  const newGame = {
    id: nanoid(),
    ...data,
  };

  games.push(newGame);
  await fs.writeFile(gamesPath, JSON.stringify(games, null, 2));

  return newGame;
};

const updateGameService = async (id, data) => {
  const games = await getAllGamesService();
  const index = games.findIndex((game) => game.id === id);
  if (index === -1) return null;

  games[index] = { id, ...data };
  await fs.writeFile(gamesPath, JSON.stringify(games, null, 2));

  return games[index];
};

const deleteGameService = async (id) => {
  const games = await getAllGamesService();
  const index = games.findIndex((game) => game.id === id);
  if (index === -1) return null;

  games.splice(index, 1);
  await fs.writeFile(gamesPath, JSON.stringify(games, null, 2));

  return id;
};

module.exports = {
  getAllGamesService,
  getGameService,
  addGameService,
  updateGameService,
  deleteGameService,
};
