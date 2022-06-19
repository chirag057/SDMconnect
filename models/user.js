const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:45,
        unique:true
    },

 
    email:{
        type:String,
        required:true,
        max:75,
        unique:true,

    },

    password:{
        type:String,
        min:6,
        required:true,

    },
 
    profilePicture:{
        type:String,
        default:"",
    },

    followers:{
        type:Array,
        default:[]

    },

    followings:{
        type:Array,
        default:[]

    },

    isAdmin:{
        type:Boolean,
        default:false,

    },
     
    desc:{
        type :String,
        max:50,

    },
    city:{
        type:String,
        max:50,
    },
     Workplace:{
        type:String,
        max:100,
     },

     Pursuing_Field:{
        type:String,
        max:100,
     },



},
{timestamps: true}

);


// To Export 
module.exports = mongoose.model("user",UserSchema);
