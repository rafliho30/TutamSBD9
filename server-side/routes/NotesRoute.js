const express = require('express');
const router = express.Router();
const NotesController = require('../controller/NotesController');

router.get('/getAllNotes', NotesController.getAllNotes);
router.post('/addNote', NotesController.addNote);
router.get('/getNote/:id', NotesController.getNoteById);
router.put('/editNote/:id', NotesController.updateNote);
router.delete('/deleteNote/:id', NotesController.deleteNote);

module.exports = router;