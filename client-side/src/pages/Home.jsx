import React, { useState, useEffect } from 'react';
import { fetchNotes, addNote, updateNote, deleteNote } from '../services/api';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and content cannot be empty!");
      return;
    }

    const newNote = { title, content };
    try {
      const response = await addNote(newNote);
      setNotes([response.data, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
      alert("An error occurred while adding the note. Please try again.");
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!selectedNote) return;

    const updatedNote = { title, content };
    try {
      const response = await updateNote(selectedNote.note_id, updatedNote);
      const updatedNotesList = notes.map((note) =>
        note.note_id === selectedNote.note_id ? response.data : note
      );
      setNotes(updatedNotesList);
      setSelectedNote(null);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error updating note:", error);
      alert("An error occurred while updating the note. Please try again.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      const updatedNotesList = notes.filter((note) => note.note_id !== noteId);
      setNotes(updatedNotesList);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting the note. Please try again.");
    }
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="home-container flex flex-wrap">
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onSubmit={selectedNote ? handleUpdateNote : handleAddNote}
        onCancel={handleCancel}
        isEditing={!!selectedNote}
      />
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-3 p-4 bg-gray-800 rounded-md">
        {Array.isArray(notes) && notes.map((note) => (
          <NoteItem
            key={note.note_id}
            note={note}
            onSelect={handleNoteSelect}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
