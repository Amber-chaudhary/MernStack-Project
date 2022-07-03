const express = require("express");
let router = express.Router();

//modelschema
//curly bracket use when file export more then 1 module and parameter in sequence
const { Course } = require("../../models/Course");
let commentModel = require("../../models/Comments");
let validateCourse = require("../../middlewares/validateCourse");
let auth = require("../../middlewares/auth");
let admin = require("../../middlewares/admin");
router.get("/", (req, res) => {
  res.send("<h1>Server is Running </h1>");
  // res.render("../views/index");
});

//Course Post here
router.post("/post",validateCourse, async (req, res) => {
  try {
    let data = req.body;
    const course = new Course({
      courseName: data.courseName,
      instructorName: data.instructorName,
      link: data.link,
      description: data.description,
    });
    const result = await Course(course.save());

    res.send(result);
    console.log(result);
  } catch (err) {
    console.log("error " + err.message);
    res.status(400).send(err.message);
  }
});

//course Get from here
router.get("/getdata", async (req, res) => {
  try {
    const data = await Course.find();
    if (!data) return res.status(400).send("Data not found In dataBase");
    res.send(data);
  } catch (err) {
    console.log("Error " + err.message);
  }
});

//comment post here
router.post("/postComments", auth, async (req, res) => {
  let user = req.user;
  try {
    const comment = new commentModel({
      email: user.email,
      // courseName: req.body.courseName,
      comment: req.body.comment,
    });
    const result = await commentModel(comment.save());
    console.log(comment);
    res.send("Comment posted Successfully");
  } catch (err) {
    console.log("Error " + err.message);
  }
});

//cooments get form here
router.get("/getComments", async (req, res) => {
  try {
    const data = await commentModel.find();
    if (!data) return res.status(400).send("Data not found In dataBase");
    res.send(data);
  } catch (err) {
    console.log("Error " + err.message);
  }
});

module.exports = router;
