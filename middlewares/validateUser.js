let { Course, validateInput, validateUser } = require("../models/user");

function validateUserData(req, res, next) {
  let { error } = validateUser(req.body);
  if (error) {
    let err = error.message;
    return res.send(err);
  }
  next();
}

module.exports = validateUserData;
