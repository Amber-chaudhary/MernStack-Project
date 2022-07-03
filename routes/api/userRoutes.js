const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateUserInput = require("../../middlewares/validateUserInput");
const auth = require("../../middlewares/auth");
let router = express.Router();

let { User } = require("../../models/user");

router.post("/signUp", validateUserInput, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("Email is already Exist failed to register");
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    await user.generateHashedPassword();

    let result = await user.save();
    res.send("User Successfully registered");
    console.log(result);
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.send(false);

    let isVAlid = await bcrypt.compare(req.body.password, user.password);
    if (!isVAlid) return res.send(false);

    //here i have assign login user his detail and token with are embeded
    const payload = {
      id: user._id,
      name:user.name,
      email: user.email,
      phone: user.phone
    };
    let token = jwt.sign(payload, "myprivatekey");
    res.send(token);
    
    console.log(req.body.email + " login ");
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

module.exports = router;
