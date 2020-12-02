const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            required:true
        },
        body:{
            type:String
        
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
    
        }
    }, {timestamps:true}
)
const Note = mongoose.model('Notes',noteSchema)


module.exports = Note