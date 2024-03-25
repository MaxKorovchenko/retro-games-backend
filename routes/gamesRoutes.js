const express = require("express");
const { getAllgames } = require("../controllers/gamesCtrl");

const router = express.Router();

router.get("/", getAllgames);

module.exports = {
  gamesRouter: router,
};
