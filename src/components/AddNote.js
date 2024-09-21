import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title : "", description : "", tag : ""});
  
  const handleUpdateClick = (event) => {
    event.preventDefault(); 
    addNote(note.title, note.description, note.tag);
    setNote({title : "", description : "", tag : ""});
  };

  const handleChange = (event) => {
    setNote({...note, [event.target.name] : event.target.value})
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              minLength={5}
              required
              value={note.title}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              minLength={5}
              required
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
         
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleUpdateClick}
            disabled={note.title.length<5 || note.description.length<10}
          >
            Add a Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
