const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
});

const submitFile = mongoose.model("submitFile", fileSchema);
module.exports = submitFile;