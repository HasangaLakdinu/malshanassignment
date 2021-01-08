const express=require('express');
const router=express.Router();
const Note=require('../models/note');

//get  a list of notes from the db

router.get('/notes',function(req,res,next){
  Note.find({}).then(function(notes){
    res.send(notes);
  })
});


//get  a list of  archived notes from the db

router.get('/archivednotes',function(req,res,next){
    Note.find({archived:true}).then(function(notes){
      res.send(notes);
    })
  });

//get  a list of  notarchived notes from the db

router.get('/notarchivednotes',function(req,res,next){
    Note.find({archived:false}).then(function(notes){
      res.send(notes);
    })
  });

//add a new note to the db
router.post('/note',function(req,res,next){
 Note.create(req.body).then(function(note){
  res.send(note);
}).catch(next);

});

//update a note in the database
router.put('/note/:id',function(req,res,next){
  Note.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
      Note.findOne({_id:req.params.id}).then(function(note){
        res.send(note);
      });
  });
});

//delete a note from db
router.delete('/note/:id',function(req,res,next){
  Note.findByIdAndRemove({_id:req.params.id}).then(function(note){
    res.send(note);
  });

});

module.exports=router;
