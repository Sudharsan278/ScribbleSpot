import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes,getNotes} = context;
    useEffect(()=>{
      getNotes(); 
    },[])
  return (
    <>
      <AddNote/>
      <div className='container'>
        <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}/>;
        })}
      </div>
      </div>
    </>
  )
}

export default Notes
