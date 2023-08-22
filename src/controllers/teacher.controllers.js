const teacherModel = require("../models/teacher.model");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { sendMail } = require("../mailer/mail");

const jwt = require("jsonwebtoken");


//! Create  Joy validation object -------------
const teacherValidationObject = Joi.object({
    name: Joi.string().min(4).max(20).required().messages({
        "string.base": "Name must be string",
        "string.min": "Name should contains atlist 4 characters",
        "string.max": "Name should contains maximum 20 charactors",
        "string.empty": "Name is mandatory"
    }),
    age: Joi.number().min(24).max(50).required().messages({
        "number.base": "age must be number",
        "number.min": "age should be graterthan or equal 24 ",
        "number.max": "age should be maximum 50 ",
        "number.empty": "age is mandatory"
    }),
    gender: Joi.string().required().messages({
        "string.base": "gender must be string",
        "string.empty": "gender is mandatory"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be string",
        "string.empty": "Email is mandatory",
        "string.email": "Your input should be email"
    }),
    password: Joi.string().min(6).max(15).required().messages({
        "string.base": "password must be string",
        "string.min": "password should contains atlist 6 characters",
        "string.max": "password should contains maximum 15 charactors",
        "string.empty": "password is mandatory"
    }),
    otp: Joi.number().required().messages({
        "number.base": "otp must be string",
        "number.empty": "otp is mandatory"
    })

})



//! Teacher register -----------------------
const registerTeacher = async (req, res, next) => {
    try {
        const { name, age, gender, email, password } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(typeof (otp));
        const { value, error } = teacherValidationObject.validate({ name, age, gender, email, password, otp });
        if (error) {
            return res.status(400).json({ error: true, message: "Validation failed", err: error.details[0].message });
        }
        else {
            const isTeacher = await teacherModel.findOne({ email: value.email });

            if (!isTeacher) {
                const Teacher = await new teacherModel(value);
                const saveTeacher = await Teacher.save();
                //!send mail--------------
                sendMail(value.email, value.name, value.otp);
                return res.status(201).json({
                    error: false, message: "Teacher Added successfully", data: {
                        name: saveTeacher.name,
                        age: saveTeacher.age, gender: saveTeacher.gender, email: saveTeacher.email
                    }
                });
            }

            res.status(403).json({ error: true, message: "Teacher already exist with this email!!" })
        }
    } catch (error) {
        next(error);
    }
}

//!Get all the Teachers  ------------------
const getTeacher = async (req, res, next) => {
    try {

        let authToken = req.headers.authorization;
        console.log(authToken);


        if(!authToken || !authToken.startsWith("Bearer"))
        {
            return res.status(500).json({error:true,message:"Token Required"})
        }
         authToken = authToken.split(" ");
        //  console.log(authToken[1]); 

        let isVerified =  jwt.verify(`${authToken}`,"tanmoy1234");
        console.log(isVerified);

        const Teachers = await teacherModel.find({}, { password: 0 });
        if (Teachers) {
            return res.status(200).json({ error: false, message: "Teachers find successfully", data: Teachers });
        }


        res.status(404).json({ error: true, message: "No Teacher found !!" });
    }
    catch (error) {
        next(error);
    }
}

//! Teacher Login--------------

const loginTeacher = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isTeacher = await teacherModel.findOne({ email: email });

        if (!isTeacher) {
            return res.status(404).json({ error: true, message: "No Teacher found  with this id!!" });
        }

        const isPasswordMatch = await isTeacher.comparePassword(password);

        if (isPasswordMatch) {
            //! Creating The JWT token 

             const token = jwt.sign({email:isTeacher.email,name:isTeacher.name},"tanmoy1234");
            return res.status(201).json({ error: false, message: "Login Successfull" ,token});
        }
        else {
            return res.status(401).json({ error: true, message: "Invalid details" });

        }

    } catch (error) {
        next(error);
    }
}

//! verify otp---------------
const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const Teacher = await teacherModel.findOne({ email });
        if (Teacher) {

            const isOtpMatch = await Teacher.compareOtp(otp);
            if (isOtpMatch) {
                const udata = await teacherModel.findOneAndUpdate({ _id: Teacher._id }, { verify: true });

                return res.status(200).json({ error: false, message: "Teachers verified successfully", data: udata });
            }
            else {
                return res.status(404).json({ error: true, message: "Invalid OTP !!" });
            }
        }


        res.status(404).json({ error: true, message: "No Teacher found !!" });
    }
    catch (error) {
        next(error);
    }
}




// const sendMail = async (req,res,next)=>{
//     try {

//         const {email} = req.body;



//           res.status(200).json({error:false,message:"message send successfully"});


//     } catch (error) {
//         next(error);
//     }
// }




// <p>Dear,<br>We thank you for your registration at Netflix Online streaming platforms</p><br/><p>Your user id is :${email}<p/><p>Your email id Verification OTP code is :</p><h1></h1><p>Warm Regards,<br/>
//             Customer Care<br/>
//             Internet Ticketing<br/>
//             NETFLIX<br/><br/>
//             * Terms & Conditions Apply
//             </p>


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
    loginTeacher,
    sendMail,
    verifyOtp

}







