let { Course, validateInput, validateUser } = require("../models/user");

function validateUserInput(req, res, next) {
  let { error } = validateInput(req.body);
  if (error) {
    let err = error.message;
    return res.send(err).status(400);
  }
  next();
}

module.exports = validateUserInput;
