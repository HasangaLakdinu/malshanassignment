const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//create note Schema & model
const NoteSchema=new Schema({
  Title:{
    type: String,
    required: [true,'Name field is required']
  },
  Description:{
    type: String,
  },
  archived: {
    type: Boolean,
    default: false
  },
});

const Note=mongoose.model('note',NoteSchema);
module.exports=Note;
