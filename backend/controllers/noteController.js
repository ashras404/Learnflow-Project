const Note = require('../models/Note');

// @desc    Get all notes for a user
// @route   GET /api/notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Save a new note
// @route   POST /api/notes
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Please add both title and content' });
        }

        const note = await Note.create({
            userId: req.user._id,
            title,
            content
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this note' });
        }

        await note.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, createNote, deleteNote };