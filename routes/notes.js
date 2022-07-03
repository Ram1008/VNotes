const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Notes');
var fetchuser = require('../middleware/fetchUser');



//Route 1: Get all the notes .Using get request : GET "/api/notes/fetchallnote". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const note = await Note.find({ user: req.user.id })
    res.json(note)
})


//Route 2: Add new note . Using get request : GET "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [

    body('title').isLength({ min: 3 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Checking for errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})
//Route 3: update note . Using put request : PUT/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update 
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})

//Route 4: delete note . Using put request : DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorized access");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.send("Successfully Deleted");
    } catch {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
})
module.exports = router;