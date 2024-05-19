import React from 'react';

const NoteForm = ({ title, setTitle, content, setContent, onSubmit, onCancel, isEditing }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-3 p-4 bg-gray-800 rounded-md"
    >
        <h2 className="text-white text-lg font-semibold">
            {isEditing ? "Edit Note" : "Add Note"}
        </h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="p-2 bg-gray-700 text-white outline-none"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        placeholder="Notes Details..."
        className="p-2 bg-gray-700 text-white outline-none"
      ></textarea>
      {isEditing ? (
        <div className="flex gap-2">
          <button className="p-2 bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-white rounded-md">
            Update Note
          </button>
          <button
            onClick={onCancel}
            className="p-2 bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="p-2 bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-white rounded-md"
        >
          Add Note
        </button>
      )}
    </form>
  );
};

export default NoteForm;
