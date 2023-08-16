const student = require("../models/student.model");
const Joi = require('joi');


let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name Must String",
        "string.min":"Name Should contain Minimum 4 Characters",
        "string.empty":"Name is Mandatory"
    }),
    age: Joi.number().min(18).required().messages({
        "number.base":"Age must be string",
        "number.min": "Age should be graterthan 18",
        "number.empty":"age is mandatory"
    }),
    gender: Joi.string().required().messages({
        "string.base": "gender must be string",
        "string.empty": "gender is mandatory"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "email must be string",
        "string.email":"email should be in a proper format",
        "string.empty":"email is mandatory"
    })
})

//! add student --------------------------
const addstudent = async (req,res,next)=>{
    try {
        const {name,age,gender,email} = req.body;

        let {value,error} = studentSchema.validate({name,age,gender,email})
        console.log(value);
        console.log(error);
        if(error){
            return res.status(400).json({error:true, message:"validation failed", err:error.details[0].message });
        }
        else{
            
            const sdata = await student.create(value);
            res.status(201).json({error:false,message:"Student Created..",data:sdata}); 
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//! find all student-----------------
const getstudent = async (req,res,next)=>{
    try {
        
        const sdata = await student.find();
        res.status(201).json({error:false,message:"Student get successfully ",data:sdata}); 
    } catch (error) {
        console.log(error);
    }
}


//!get student by ID -----------------------------

const getstudentbyid = async (req,res,next)=>{
    try {
        const {id}= req.query;
      
         console.log(id);
          const sdata =await student.findById(id);
          if(!sdata){
           return res.status(404).json({error:true,message:"No student found !! ",data:null}); 
            }
        return res.status(201).json({error:false,message:"Student get successfully ",data:sdata}); 

    } catch (error) {
        console.log(error);
    }
}



//! Update student-------------------------------

const updatestudent = async (req,res,next)=>{
    try {
        const {sid} = req.params;
        const {name,age,gender} = req.body;

        const fdata  = await student.findById(sid);

        if(!fdata){
            return res.status(404).json({error:true,message:`No student found with given id ${sid} !! `,data:null});         
        }

        const udata = await student.findOneAndUpdate({_id:sid},{name,age,gender},{new: true, validate:true})

        return res.status(201).json({error:false,message:`${udata.name}s update successfully "`,data:udata}); 
    } catch (error) {
        console.log(error);
    }
}


//! Delete student ----------------------------------

const deletestudent = async (req,res,next)=>{
    try {
        const {sid} = req.params;

        const fdata  = await student.findById(sid);

        if(!fdata){
            return res.status(404).json({error:true,message:`No student found with given id ${sid} !! `,data:null});         
        }

        const ddata = await student.findOneAndDelete({_id:sid},{new: true});


        return res.status(201).json({error:false,message:`${ddata.name} deleted successfully "`,data:ddata}); 

    } catch (error) {
        console.log(error);
    }
}













//? put accepts all the keys present in database and update it . it updates the whole document .
//? patch accepts any number of keys and update . it updates only the specific fild.






module.exports ={
    addstudent,
    getstudent,
    getstudentbyid,
    updatestudent,
    deletestudent

}