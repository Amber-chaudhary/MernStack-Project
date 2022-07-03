const mongoose = require("mongoose");
const Joi = require("joi");

const CourseSchema = new mongoose.Schema({
  courseName:String, 
  instructorName:String,
  link: String,
  description: String,
});
courseModel = mongoose.model("courseModel", CourseSchema);

//validation for Comoing input
function validationInput(data) {
  const schema = Joi.object({
    courseName: Joi.string().min(4).required(),
    instructorName: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports.Course = courseModel;
module.exports.validate = validationInput;
