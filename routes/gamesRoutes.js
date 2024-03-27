const express = require("express");
const { getAllgames, getGame, addGame } = require("../controllers/gamesCtrl");

const router = express.Router();

router.get("/", getAllgames);

router.get("/:gameId", getGame);

router.post("/", addGame);

module.exports = {
  gamesRouter: router,
};
