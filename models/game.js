const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");

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
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

gameSchema.post("save", handleMongooseError);

const Game = model("game", gameSchema);

module.exports = {
  Game,
};