const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:255,
    },
    role:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("User",userSchema);
