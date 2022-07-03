const mongoose  = require('mongoose');
const Schema  = mongoose.Schema;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        // A forign key to link notes to a user
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
       
    },
    tag:{
        type: String,
        default: "default"
       
    },

    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('notes', NotesSchema);