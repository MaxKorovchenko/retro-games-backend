const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["8-bit", "16-bit"],
      required: true,
    },
    coverImageURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
    genre: {
      type: String,
      enum: [
        "action",
        "adventure",
        "RPG",
        "strategy",
        "simulation",
        "puzzle",
        "sports",
        "platformer",
        "shooter",
        "fighting",
        "racing",
        "horror",
        "educational",
        "music",
        "party",
        "other",
      ],
      required: true,
    },
    numberOfPlayers: {
      type: Number,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

gameSchema.post("save", handleMongooseError);

const Game = model("game", gameSchema);

module.exports = {
  Game,
};
