const express = require("express");
const {
  getAllgames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/gamesCtrl");

const router = express.Router();

router.get("/", getAllgames);

router.get("/:gameId", getGame);

router.post("/", addGame);

router.put("/:gameId", updateGame);

router.delete("/:gameId", deleteGame);

module.exports = {
  gamesRouter: router,
};
