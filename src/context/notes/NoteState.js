import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../AlertContext";

const NoteState = (props) => {
  
  const host = "http://localhost:5000/api";
  const notesInitial = [];
  
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

    const getNotes = async () => {
      const response = await fetch(`${host}/notes/getallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authentication-token' : localStorage.getItem('authenticationToken')
        }
      });
      const allNotes = await response.json();
      setNotes(allNotes);
    }
    
      const [notes,setNotes] = useState(notesInitial);
      
      const addNote = async (title,description,tag ) =>{
      
        const response = await fetch(`${host}/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authentication-token' : localStorage.getItem('authenticationToken')
          },
          body: JSON.stringify({title,description, tag})
          
        });

        const note = await response.json();
        setNotes(notes.concat(note));
      }
      
      const deleteNote = async (id) =>{

        const response = await fetch(`${host}/notes/deletenote/${id}`, {
          method : 'DELETE',
          headers : {
            'Content-Type' : 'application/json',
            'authentication-token' : localStorage.getItem('authenticationToken')
        }});

        const deletedNote = await response.json();

        const newNotes = notes.filter((note) => {
          return note._id !== id;
        })

        setNotes(newNotes);
        showAlert("Note Deleted Successfully", "success");
        
      }

      const editNote = async (id,title,description,tag) =>{

        const response =  await fetch(`${host}/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authentication-token' : localStorage.getItem('authenticationToken')
          },
          body: JSON.stringify({title,description,tag})
        });

        const editedNote = await response.json();
        
        
        let updatedNotes = JSON.parse(JSON.stringify(notes)); 

        //Reason for using the above syntax instead of let updateNotes = notes is that we want React to render
        //the page again after updating the notes. If we just use let updatednotes = notes React can't identify
        //the change.

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];

          if(element._id === id ){
            updatedNotes[index].title = title;
            updatedNotes[index].description = description;
            updatedNotes[index].tag = tag;
            break;
          } 
        }
        setNotes(updatedNotes);
        // getNotes(); We can simply call the getNotes() to render the UI with the updated notes 
        // But to avoid hitting the API frequently we have done in the above manner 
      }


    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;