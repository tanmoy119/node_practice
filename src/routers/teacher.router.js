const express = require("express");
// const { addTeacher, getTeachers, getOneTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacher.controllers");
const {registerTeacher, getTeacher} = require('../controllers/teacher.controllers');
const teacherRouter = express.Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.get("/get",getTeacher);
// teacherRouter.get("/getteacherbyid/:id",getOneTeacher);
// teacherRouter.put("/updateteacher/:id",updateTeacher);
// teacherRouter.delete("/deleteteacher/:id",deleteTeacher);

module.exports = teacherRouter;