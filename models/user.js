const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const res = require("express/lib/response");
const { number } = require("joi");

const user = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  role: {
    type: String,
    default: "user",
  },
});

user.methods.generateHashedPassword = async function () {
  try {
    //encryption of password
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    res.send("error " + err.message);
  }
};

userModel = mongoose.model("userModel", user);

//for sign up user
function validationInput(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(5).max(15).required(),
  });
  return schema.validate(data);
}

//for sign in
function validationUser(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports.User = userModel;
module.exports.validateInput = validationInput;
module.exports.validateUser = validationUser;
