import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {

  const host = "http://localhost:5000/api";
    const notesInitial = [];

    const getNotes = async () => {
      const response = await fetch(`${host}/notes/getallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authentication-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYWVmNzZlOTQyMDUyZDI1NDRjMjA1In0sImlhdCI6MTcyNjkwMzQxM30.pF6SlCvcPtnG-c0ZzhiSSf4OuM3cmVl_oVZgzj6_SjY'
        }
      });
      const json = await response.json();
      setNotes(json)
    }
    
      const [notes,setNotes] = useState(notesInitial);
      
      const addNote = async (title,description,tag ) =>{
      
        const response = await fetch(`${host}/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authentication-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYzM0ZGI4MTVhNTA1NzkyYjVjN2NkIn0sImlhdCI6MTcyNjc1NjA1OX0.vSgRgHDNlZkaAOoK8-C7vAbOHygfWha8CsakLI-3MtM'
          },
          body: JSON.stringify({title,description, tag})
        });

        const note = {
          "_id": "66eb0f7903f8c32417c7ca522e7",
          "user": "66eaef23476e942052d2544c205",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-09-18T17:35:53.329Z",
          "__v": 0
        }
        
        setNotes(
          notes.concat(note)
        )
       
      }
      
      const deleteNote =(id) =>{
        const newNotes = notes.filter((note) => {
          return note._id !== id;
        })

        setNotes(newNotes);
      }

      const editNote = async (id,title,description,tag) =>{

        const response =  await fetch(`${host}/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authentication-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYzM0ZGI4MTVhNTA1NzkyYjVjN2NkIn0sImlhdCI6MTcyNjc1NjA1OX0.vSgRgHDNlZkaAOoK8-C7vAbOHygfWha8CsakLI-3MtM'
          },
          body: JSON.stringify({title,description,tag})
        });

        const json = await response.json();
        

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];

          if(element._id === id ){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }

      }


    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;