const mongoose = require("mongoose");
const parameter = require("./Parameter")

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   amount:{
       type:Number,
       required:true
   },
   parameter:[parameter]
});

module.exports = mongoose.model("Test",testSchema);
