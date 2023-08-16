const express = require("express");
const { addstudent, getstudent, getstudentbyid, updatestudent, deletestudent } = require("../controllers/student.control");
const studentRouter = express.Router();

studentRouter.post("/addstudent",addstudent);
studentRouter.get("/getstudent",getstudent);
studentRouter.get("/getstudentbyid",getstudentbyid);
studentRouter.get("/updatestudent/:sid",updatestudent);
studentRouter.get("/deletestudent/:sid",deletestudent);

module.exports = studentRouter;