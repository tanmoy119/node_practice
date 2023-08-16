const {Schema, model} = require("mongoose"); 

const studentSchema = new Schema({

    name:{
        type:String,
        required:[true,"Name is Mandatory"],
        minLength:[3,"Name Should contain Atleast 3 characters"],
        minLength:[3,"Name Should contain Only 10 characters"]
        
    },
    age:{
        type:Number,
        required:[true,"Age is Mandatory"],
        min: [24, "Minimum age should be 18 and you entered {VALUE}"],
        max: [50, "Maximum age should be 30 and you entered {VALUE}"]   
        
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
        enum:{
            values:["Male","Female","Others"],
            message:"Only Male, Female and Other are allowed and you entered {VALUE}"
        }
        
    },
    email:{
        type:String,
        required:[true,"Email is Nedded"],
        unique:true
    }
},
{
    timestamps:true
});

const student = new model("student",studentSchema);

module.exports = student;