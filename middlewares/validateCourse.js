let { Course , validate } = require("../models/Course");

function validateCourse(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  next();
}

module.exports = validateCourse;
