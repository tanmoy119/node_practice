const express = require("express");
// const { addTeacher, getTeachers, getOneTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacher.controllers");
const {registerTeacher, getTeacher, loginTeacher, sendMail, verifyOtp} = require('../controllers/teacher.controllers');
const teacherRouter = express.Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.get("/get",getTeacher);
teacherRouter.post("/login",loginTeacher);
teacherRouter.post("/sendmail",sendMail);
teacherRouter.post("/verifyotp",verifyOtp);

module.exports = teacherRouter;