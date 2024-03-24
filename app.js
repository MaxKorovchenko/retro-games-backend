const express = require("express");
const cors = require("cors");

const { gamesRouter } = require("./routes/gamesRoutes");

const app = express();

app.use(cors());

app.use("/api/games", gamesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

module.exports = app;
