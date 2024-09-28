import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";


const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note, updateNote} = props;
  
  const limitDescription = (description) => {
    return description.length > 70 ? description.slice(0,70) + '...' : description;
  }
  
  const navigate = useNavigate();

  const handleClick  = (id) =>{
    navigate(`/getentirenote/${id}`)
  } 
  

  return (
    <>
    <div className=" col-md-3 ">
      <div className="card my-3" >
        <div className="card-body" style={{height : '100px'}}>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{limitDescription(note.description)}</p>
          </div>
        <div className="d-flex justify-content-between align-items-center" style={{ padding: '10px' }}>
          <div>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => { deleteNote(note._id); }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => { updateNote(note); }}
            ></i>
          </div>
          {/* Read More button */}
          <button className="btn btn-primary" onClick={() => {handleClick(note._id)}}>Read More</button>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default NoteItem;

