const express = require("express");
const {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/gamesCtrl");
const { validateBody, isValidId } = require("../middlewares");
const { addGameSchema } = require("../schemas");

const router = express.Router();

router.get("/", getAllgames);

router.get("/:gameId", isValidId, getGame);

router.post("/", validateBody(addGameSchema), addGame);

router.put("/:gameId", isValidId, validateBody(addGameSchema), updateGame);

router.delete("/:gameId", isValidId, deleteGame);

module.exports = {
  gamesRouter: router,
};
