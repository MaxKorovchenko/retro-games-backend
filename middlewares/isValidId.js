const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { gameId } = req.params;

  if (!isValidObjectId(gameId)) {
    return next(new HttpError(404, `id ${gameId} is not valid`));
  }

  next();
};

module.exports = {
  isValidId,
};
