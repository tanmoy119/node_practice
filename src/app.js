require("dotenv").config();
const express = require("express");
const studentRouter = require("./routers/student.router");
const app = express();
const teacherRouter = require("./routers/teacher.router");

//! Require DB-----------

require("./adapter/connectDB");

//! Express.json-----------------
app.use(express.json());

//!PORT -----------
const PORT = process.env.PORT;



//!Use Router--------
app.use("/api/v1/student",studentRouter);
app.use("/api/v1/teacher",teacherRouter);



//! Page Not Found-------------
app.use("*",(req,res,next)=>{
    res.status(404).json({error:false,message:"404 Page Not Found"});
})

//! error handling middleware ------------------

app.use((error,req,res,next)=>{
    res.status(401).json({error:true,message:error.message});
})


//! Listen-----------

app.listen(PORT,(error)=>{

    if(error) throw error;

    console.log(`Server running on PORT : ${PORT}`);
})
