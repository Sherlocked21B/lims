const mongoose = require("mongoose");
const Reagent = require("./Reagent");
const Customer = require("./Customer")

const sampleSchema = new mongoose.Schema({
    number:{
        type:String,
        required:true
    },
   dueDate:{
       type:Date,
       required:true
   },
   collectedBy:{
       type:string,
       required:true
   },
   paymaentStatus:{
    type:Boolean,
    required:true
   },
   testName:{
       type:String,
       required:true
   },
   status:{
       type:Boolean,
       required:true
   },
   reagent:[Reagent],
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'}

});

module.exports = mongoose.model("Sample",sampleSchema);
