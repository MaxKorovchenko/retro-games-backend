const express = require("express");
const {
  getAllGames,
  updateGame,
  getGame,
  addGame,
} = require("../controllers/gamesCtrl");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { addGameSchema } = require("../schemas");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:gameId", isValidId, getGame);

router.post("/", validateBody(addGameSchema), addGame);

router.put("/:gameId", authenticate, isValidId, updateGame);

//router.delete("/:gameId", isValidId, deleteGame);

module.exports = {
  gamesRouter: router,
};
