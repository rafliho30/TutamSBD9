const {pool} = require("../config/db.config.js");

const getCurrentTimestamp = () => new Date().toISOString();

const addNote = async (req, res) => {
    const { title, content } = req.body;
    const createdAt = getCurrentTimestamp();
    console.log(title, content);
    try {
        const result = await pool.query(
            "INSERT INTO notes (title, content, created_at) VALUES ($1, $2, $3) RETURNING *",
            [title, content, createdAt]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding note:", error);
        return res.status(500).send("Error adding note");
    }
}

const getAllNotes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes");
        return res.json(result.rows);
    } catch (error) {
        console.error("Error getting notes:", error);
        return res.status(500).send("Error getting notes");
    }
}
const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM notes WHERE note_id = $1", [id]);
        if (result.rows.length > 0) {
            return res.json(result.rows[0]);
        } else {
            return res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error("Error getting note by id:", error);
        return res.status(500).send("Error getting note by id");
    }
}
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE note_id = $3 RETURNING *",
            [title, content, id]
        );
        if (result.rows.length > 0) {
            return res.json(result.rows[0]);
        } else {
            return res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).send("Error updating note");
    }
}
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM notes WHERE note_id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            return res.json(result.rows[0]);
        } else {
            return res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).send("Error deleting note");
    }
}
module.exports = { addNote, getAllNotes, getNoteById, updateNote, deleteNote };