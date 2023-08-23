const express = require("express");
// const { addTeacher, getTeachers, getOneTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacher.controllers");
const {registerTeacher, getTeacher, loginTeacher, sendMail, verifyOtp, resendOtp} = require('../controllers/teacher.controllers');
const { auth } = require("../services/auth");
const teacherRouter = express.Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.get("/get", auth, getTeacher);
teacherRouter.post("/login",loginTeacher);
teacherRouter.post("/sendmail",sendMail);
teacherRouter.post("/verifyotp",verifyOtp);
teacherRouter.post("/resendotp", auth, resendOtp);

module.exports = teacherRouter;