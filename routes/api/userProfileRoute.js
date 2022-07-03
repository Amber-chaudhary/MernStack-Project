const express = require("express");
let router = express.Router();

//modelschema
//curly bracket use when file export more then 1 module and parameter in sequence
let auth = require("../../middlewares/auth");
//course Get from here
router.get("/profile",auth,async (req, res) => {
let user = req.user;
res.send(user);
});

module.exports = router;
