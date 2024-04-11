const express = require("express");
const {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/games");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { addGameSchema } = require("../schemas");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllgames);

router.get("/:gameId", isValidId, getGame);

router.post("/", validateBody(addGameSchema), addGame);

router.put("/:gameId", isValidId, validateBody(addGameSchema), updateGame);

router.delete("/:gameId", isValidId, deleteGame);

module.exports = {
  gamesRouter: router,
};
