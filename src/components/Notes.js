import React, {useContext, useEffect, useRef, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AlertContext from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes,getNotes, editNote} = context;

  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('authenticationToken')){
      getNotes(); 
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);
  
  const ref = useRef('');
  const [note, setNote] = useState({etitle : "", edescription : "", etag : ""});
  const closeRef = useRef('');

  const {showAlert} = useContext(AlertContext);

  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag });
  }
  
  const handleUpdateClick = (event) => {
    event.preventDefault(); 
    closeRef.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note Updated Successfully", "success")
  };

  const handleChange = (event) => {
    setNote({...note,[event.target.name] : event.target.value })
  };

    // const dispatch = useDispatch();

    // const {mode} = bindActionCreator(actionCreators,dispatch);
  
  const mode = useSelector(state => state.mode);
  let fontColor = mode==='light' ? 'black': 'white';   

  return (
    <>
      <h1 className='container my-3' style={{textAlign : 'center', color : fontColor}}>myNoteBook!</h1>
      <AddNote/>

      <button type="button "  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{backgroundColor : mode==='light'? '#FAF0E6' : '#042743'}}>
        <div className="modal-dialog" >
          <div className="modal-content"style={{backgroundColor : mode==='light'? '#FAF0E6' : '#042743'}}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color :fontColor }}>Edit Your Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
       
       
        <form className="my-3">
          <div className="mb-3">
            
            <label htmlFor="etitle" className="form-label" style ={{color : fontColor}}>
              Title
            </label>
            <input
              type="text"
              className="form-control input-text-box"
              id="etitle"
              name="etitle"
              value = {note.etitle}
              minLength={5}
              required
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label" style={{color : fontColor}}>
              Description
            </label>
            <input
              type="text"
              className="form-control input-text-box"
              id="edescription"
              name="edescription"
              value = {note.edescription}
              minLength={10}
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label" style={{color : fontColor}}>
              Tag
            </label>
            <input
              type="text"
              className="form-control input-text-box"
              id="etag"
              name="etag"
              value = {note.etag}
              onChange={handleChange}
            />
          </div>    
        </form>
      
      
      </div>
      </div>
            <div className="modal-footer">
              <button type="button" ref = {closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<10} type="button" className="btn btn-primary" onClick={handleUpdateClick}>Update changes</button>
            </div>
          </div>
        </div>
      </div>


      <div className='container'>
        <div className="row my-3">
        <h2 style={{color : mode==='light' ? 'black' : 'white'}}>Your Notes</h2>
        <div>
          {notes.length === 0 && "No Notes to Display!"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
        })}
      </div>
      </div>
    </>
  )
}

export default Notes
