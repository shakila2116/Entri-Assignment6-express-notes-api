const noteModel = require("../models/notesModel");

//read @get
function getAllNotes(req, res) {
    res.status(200).json(noteModel);
}

function getNote(req, res) {
    try {
        const notes = noteModel.find(data => data.id === Number(req.params.id));
        if (!notes) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
}

//create @post

function createNotes(req, res) {
    try {
        const { title, content, category } = req.body;
        if (!title || !content || !category) {
            return res.status(400).json({ message: "Title, Content and category are required" });
        }
        const newNote = {
            id: Date.now(),
            title,
            content,
            category

        };

        noteModel.push(newNote);
        res.status(201).json({ message: "Note created", newNote });

    } catch (e) {
        res.status(500).json({ message: "something went wrong" })
    }
}

function editNote(req, res) {
    try {
        const notes = noteModel.find(data => data.id === Number(req.params.id));
        if (!notes) {
            return res.status(404).json({ message: "Note not found" })
        }
        const { title, content, category } = req.body;
        notes.title = title || notes.title;
        notes.content = content || notes.content;
        notes.category = category || notes.category;
        res.status(200).json({ message: "Notes updated" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

function deleteNote(req, res) {
    const id = Number(req.params.id)
    console.log(id);
    try {

        const index = noteModel.findIndex(data => data.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Note not found" })
        }
        noteModel.splice(index, 1);
        res.status(200).json({
            message: `Note deleted successfully ID: ${id}`
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    getAllNotes, getNote, createNotes, editNote, deleteNote
};