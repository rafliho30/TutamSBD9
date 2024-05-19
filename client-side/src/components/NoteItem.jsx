import React from 'react';

const NoteItem = ({ note, onSelect, onDelete }) => {
  return (
    <div
      onClick={() => onSelect(note)}
      className="note-item bg-gray-700 p-2 rounded-md flex flex-col gap-1 cursor-pointer"
    >
      <h2 className="text-white text-lg font-semibold">{note.title}</h2>
      <p className="text-white text-sm">{note.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-white text-xs">{new Date(note.created_at).toLocaleString()}</span>
        <div className="flex gap-2">
          <button
            onClick={(e) => {e.stopPropagation(); onDelete(note.note_id);}}
            className="p-1 bg-red-700 text-white rounded-md hover:bg-red-500 transition-colors duration-200 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
