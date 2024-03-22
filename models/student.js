const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    grade:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('studentinfo',studentSchema)  //导出一