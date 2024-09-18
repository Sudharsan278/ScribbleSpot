const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,  //Works similar to a foreign key
        ref : 'user'                            //Works similar to Reference in the foreign key
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : 'General'
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);
