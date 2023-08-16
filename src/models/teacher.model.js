const {Schema,model} = require("mongoose");
const bcrypt = require('bcryptjs');
const teacherSchema = new Schema({

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
            values:["male","female","others"],
            message:"Only male, female and other are allowed and you entered {VALUE}"
        }
        
    },
    email:{
        type:String,
        required:[true,"Email is Nedded"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"],
        minLength:[6,'Password length should be grater than 6 characters'],
        maxlength:[15,"Password length should be lessthan or equal 15 characters"]
    }
},
{timestamps:true}
)

teacherSchema.pre("save", async function (next){
    console.log(this.password)
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    next();
})
const teacher= new model("teacher", teacherSchema);

module.exports = teacher; 