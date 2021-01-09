const express=require('express');
const router=express.Router();
const Note=require('../models/note');

const NoteController = require('../controller/notecontroller')


/**
 * @swagger 
 * /notes:
 *  get:
 *    description: Use to request all notes
 *    Request URL:
 *    responses:
 *      '200':
 *        description: A Successful response
 */
router.get("/notes",NoteController.notes_get_all)

router.get("/note/:id",NoteController.get_note)

router.get("/archivednotes",NoteController.get_archived_notes)

router.get("/notarchivednotes",NoteController.get_notarchived_notes)

router.post("/note",NoteController.create_note)

router.put("/note/:id",NoteController.update_note)

router.delete("/note/:id",NoteController.delete_note)

module.exports=router;
