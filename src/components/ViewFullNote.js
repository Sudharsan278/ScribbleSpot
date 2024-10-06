import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';
import EntireNote from './EntireNote';
import Spinner from './Spinner'

const ViewFullNote = () => {

  const {id} = useParams();
  const {getEntireNote} = useContext(NoteContext);

  const [note, setNote] = useState(null); // eslint-disable-next-line
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const reqData = await getEntireNote(id);
        setNote(reqData);
        setLoading(false);
        
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };
    fetchNote(); // eslint-disable-next-line
  }, [id, getEntireNote]);

  if (loading) {
    return <Spinner />;
  }

  // If no note is found, display an error message
  if (!note) {
    return <div>Note not found</div>;
  }


  // const MemoizedEntireNote = React.memo(EntireNote);

  
  return (
    <>
    <div className="container">
    <EntireNote id={note.note._id} title={note.note.title} description = {note.note.description} tag = {note.note.tag}/>
    </div>
    </>
  );
}

export default ViewFullNote;
