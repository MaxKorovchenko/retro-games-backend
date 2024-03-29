const express = require("express");
const {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/gamesCtrl");
const { validateBody } = require("../middlewares");
const { addGameSchema } = require("../schemas");

const router = express.Router();

router.get("/", getAllgames);

router.get("/:gameId", getGame);

router.post("/", validateBody(addGameSchema), addGame);

router.put("/:gameId", validateBody(addGameSchema), updateGame);

router.delete("/:gameId", deleteGame);

module.exports = {
  gamesRouter: router,
};
