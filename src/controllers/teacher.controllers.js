const teacherModel = require("../models/teacher.model");
const Joi = require('joi');
const bcrypt = require('bcryptjs');

//! Create  Joy validation object -------------
const teacherValidationObject = Joi.object({
    name: Joi.string().min(4).max(20).required().messages({
        "string.base":"Name must be string",
        "string.min":"Name should contains atlist 4 characters",
        "string.max":"Name should contains maximum 20 charactors",
        "string.empty":"Name is mandatory"
    }),
    age: Joi.number().min(24).max(50).required().messages({
        "number.base":"age must be number",
        "number.min":"age should be graterthan or equal 24 ",
        "number.max":"age should be maximum 50 ",
        "number.empty":"age is mandatory"
    }),
    gender: Joi.string().required().messages({
        "string.base":"gender must be string",
        "string.empty":"gender is mandatory"
    }),
    email: Joi.string().email().required().messages({
        "string.base":"Email must be string",
        "string.empty":"Email is mandatory",
        "string.email":"Your input should be email"
    }),
    password: Joi.string().min(6).max(15).required().messages({
        "string.base":"password must be string",
        "string.min":"password should contains atlist 6 characters",
        "string.max":"password should contains maximum 15 charactors",
        "string.empty":"password is mandatory"
    })

})



//! Teacher register -----------------------
const registerTeacher = async (req,res,next)=>{
    try {
        const {name,age,gender,email,password} = req.body;
        const {value,error} = teacherValidationObject.validate({name,age,gender,email,password}); 

        if(error){
            return res.status(400).json({error:true,message:"Validation failed",err:error.details[0].message});
        }
        else{
        const isTeacher = await teacherModel.findOne({email:value.email});

        if(!isTeacher)
        {
            const Teacher = await new teacherModel(value);
            const saveTeacher = await Teacher.save();
            return res.status(201).json({error:false,message:"Teacher Added successfully",data:{name:saveTeacher.name,
            age:saveTeacher.age,gender:saveTeacher.gender,email:saveTeacher.email}});
        }

        res.status(403).json({error:true,message:"Teacher already exist with this email!!"})
    }
    } catch (error) {
        next(error);
    }
}

//!Get all the Teachers  ------------------
const getTeacher = async (req,res,next)=>{
    try {
      
        const Teachers = await teacherModel.find({},{password:0});
        if(Teachers){
            return res.status(200).json({error:false,message:"Teachers find successfully",data:Teachers});
        }
        

        res.status(404).json({error:true,message:"No Teacher found !!"});
    }
     catch (error) {
        next(error);
    }
}

//! Teacher Login--------------
 
const loginTeacher = async (req,res,next)=>{
    try {
        const {name,age,gender,email,password} = req.body;
        const {value,error} = teacherValidationObject.validate({name,age,gender,email,password}); 

        if(error){
            return res.status(400).json({error:true,message:"Validation failed",err:error.details[0].message});
        }
        else{
        const isTeacher = await teacherModel.findOne({email:value.email});

        if(!isTeacher)
        {
            const Teacher = await teacherModel.create(value);
            return res.status(201).json({error:false,message:"Teacher Added successfully",data:{name:Teacher.name,
            age:Teacher.age,gender:Teacher.gender,email:Teacher.email}});
        }

        res.status(403).json({error:true,message:"Teacher already exist!!"})
    }
    } catch (error) {
        next(error);
    }
}



// const addTeacher = async (req, res, next)=>{
//     try {
//         const {name, age, gender, email} = req.body;
//         const adata = await teacherModel.create({name,age, gender, email});
//         res.status(201).json({error:false,messsage:"Teacher added successfully!!",data:adata});
//     } catch (error) {
//          console.log(error);
//         res.status(400).json({error:true,data:error.message});
//     }
// }


// const getTeachers = async (req, res, next)=>{
//     try {

//         const gdata = await teacherModel.find();
//         if(!gdata){
//             return res.status(404).json({error:true,messsage:"No Teacher found !!",data:null});
          
//         }
//         res.status(201).json({error:false,messsage:"Teacher Find successfully!!",data:gdata});
//     } catch (error) {
//         console.log(error);
//     }
// }


// const getOneTeacher = async (req, res, next)=>{
//     try {
//         const {id} = req.params;
//         const gdata = await teacherModel.findById(id);
//         if(!gdata){
//             return res.status(404).json({error:true,messsage:"No Teacher found !!",data:null});
          
//         }
//        return res.status(200).json({error:false,messsage:"Teacher found successfully!!",data:gdata});
//     } catch (error) {
//         next(error);
//         console.log(error);

//     }
// }

// const updateTeacher = async (req, res, next)=>{
//     try {
//         const {id} = req.params;
//         const {name, age, gender, email} = req.body;
//         const gdata = await teacherModel.findById(id);
//         if(!gdata){
//             return res.status(404).json({error:true,messsage:`No Teacher found with this given id ${id} !!`,data:null});
//         }

//         const ddata = await teacherModel.updateOne({_id:id},{name,age,gender,email});
//         return res.status(201).json({error:false,messsage:"Teacher update successfully!!",data:ddata});

//     } catch (error) {
//         console.log(error);
//     }
// }

// const deleteTeacher = async (req, res, next)=>{
//     try {
//         const {id} = req.params;
//         const gdata = await teacherModel.findById(id);
//         if(!gdata){
//             return res.status(404).json({error:true,messsage:`No Teacher found with this given id ${id} !!`,data:null});
//         }
//         const ddata = await teacherModel.deleteOne({_id:id});
//         res.status(201).json({error:false,messsage:"Teacher added successfully!!",data:ddata});
//     } catch (error) {
//         console.log(error);
//     }
// }




module.exports = {
    registerTeacher,
    getTeacher,
    loginTeacher

}







