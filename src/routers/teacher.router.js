const express = require("express");
// const { addTeacher, getTeachers, getOneTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacher.controllers");
const {registerTeacher, getTeacher, loginTeacher} = require('../controllers/teacher.controllers');
const teacherRouter = express.Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.get("/get",getTeacher);
teacherRouter.post("/login",loginTeacher);
// teacherRouter.put("/updateteacher/:id",updateTeacher);
// teacherRouter.delete("/deleteteacher/:id",deleteTeacher);

module.exports = teacherRouter;