import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/AlertContext";
import { useSelector } from "react-redux";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  const [note, setNote] = useState({title : "", description : "", tag : ""});
  
  const handleUpdateClick = (event) => {
    event.preventDefault(); 
    addNote(note.title, note.description, note.tag);
    setNote({title : "", description : "", tag : ""});
    showAlert("Note Added Successfully", "success")
  };

  const handleChange = (event) => {
    setNote({...note, [event.target.name] : event.target.value})
  };

  const mode = useSelector(state => state.mode);
  const fontColor = mode === 'light' ? 'black' : 'white';
  return (
    <div>
      <div className="container my-3">
        <h2 style={{color : fontColor}}>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" style={{color : fontColor}}>
              Title
            </label>
            <input
              type="text"
              className="form-control input-text-box"
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
            <label htmlFor="description" className="form-label" style={{color : fontColor}}>
              Description
            </label>
            <input
              type="text"
              className="form-control input-text-box "
              id="description"
              name="description"
              minLength={5}
              required
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" style={{color : fontColor}}>
              Tag
            </label>
            <input
              type="text"
              className="form-control input-text-box"
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
