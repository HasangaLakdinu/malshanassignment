const mongoose = require("mongoose");
const Note = require("../models/note");


exports.notes_get_all=(req,res,next)=>{
    Note.find({}).then(notes=>{

        const response = {
            count: notes.length,
            notes: notes.map(note => {
              return {
                Title: note.Title,
                Description: note.Description,
                archived: note.archived,
                _id: note._id,
                request: {
                  type: "GET",
                  url: "http://localhost:4000/api/note/" + note._id
                }
              };
            })
          }; 
      res.status(200).send(response);
    }).catch(err=>res.status(500).json({
        error: err
    }))
  };


  exports.get_note=(req,res,next)=>{
    Note.findOne({_id:req.params.id}).then(note=>{
        const response = {
                Title: note.Title,
                Description: note.Description,
                archived: note.archived,
                _id: note._id,
                request: {
                  type: "GET",
                  url: "http://localhost:4000/api/note/" + note._id
                }
          }; 
      res.status(200).send(response);
    }).catch(err=>res.status(500).json({
        error: err
    }))
  };

exports.get_archived_notes=(req,res,next)=>{
    Note.find({archived:true}).then(notes=>{
        const response = {
            count: notes.length,
            notes: notes.map(note => {
              return {
                Title: note.Title,
                Description: note.Description,
                archived: note.archived,
                _id: note._id,
                request: {
                  type: "GET",
                  url: "http://localhost:4000/api/note/" + note._id
                }
              };
            })
          }; 
      res.status(200).send(response);
    }).catch(err=>res.status(500).json({
        error: err
    }))
  };

exports.get_notarchived_notes=(req,res,next)=>{
    Note.find({archived:false}).then(notes=>{
        const response = {
            count: notes.length,
            notes: notes.map(note => {
              return {
                Title: note.Title,
                Description: note.Description,
                archived: note.archived,
                _id: note._id,
                request: {
                  type: "GET",
                  url: "http://localhost:4000/api/note/" + note._id
                }
              };
            })
          }; 


      res.status(200).send(response);
    }).catch(err=>res.status(500).json({
        error: err
    }))
  };

exports.create_note=(req,res,next)=>{
    Note.create(req.body).then(note=>{
     res.status(201).json({
         message:"Note Created",
         note:note,
        request:{
            type: "GET",
            url: "http://localhost:4000/api/note/" + note._id
        }     
     });
   }).catch(err=>res.status(500).send(err));
   };




exports.update_note=(req,res,next)=>{
    Note.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Note.findOne({_id:req.params.id}).then(note=>{
          res.status(200).json({
              message: "Note Updated",
              note:note
          });
        });
    });
  };

exports.delete_note=(req,res,next)=>{
    Note.findByIdAndRemove({_id:req.params.id}).then(note=>{
      res.status(200).json({
          message:"Note Deleted",
          request: {
              type: "POST",
              url: "http://localhost:4000/api/note",
              body: { Title: "Title of Note", Description: "Contents of Note" }
          }
      });
    }).catch(err=>res.status(500).send(err));
  };
