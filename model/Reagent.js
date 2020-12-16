const mongoose = require("mongoose");

const reagentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   unit:{
       type:String,
       required:true
   },
   volume:{
       type:Number,
       required:true
   }

});

module.exports = mongoose.model("Reagent",reagentSchema);
