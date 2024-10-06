import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../AlertContext";

const NoteState = (props) => {
  
  const host = "http://localhost:5000/api";
  const notesInitial = [];
  
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;
  const [notes,setNotes] = useState(notesInitial);

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

        // eslint-disable-next-line
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

        // eslint-disable-next-line
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

      const getEntireNote = async(id) => {
        
        const response = await fetch(`${host}/notes/getentirenote/${id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'authentication-token' : localStorage.getItem('authenticationToken')
          }
        });
        const requestedNote = await response.json();
       
        return requestedNote;
      }



      const summarizeContent = async(description) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = 'https://api.apyhub.com/sharpapi/api/v1/content/summarize';
        
        const data = {
          content: description
        };
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apy-token': `${apiKey}`
          },
          body: JSON.stringify(data)
        });
      
        const finalData = await response.json();
        if (finalData.data === 'Please upgrade your workspace. Reach out to hello@apyhub.com to unblock your account') {
          return 'Upgrade API Token!';
        }
      
        const job_id = finalData.job_id;
      
        // Polling the job status until it's done
        const checkJobStatus = async () => {
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'apy-token': `${apiKey}`
            }
          };
      
          const response = await fetch(`https://api.apyhub.com/sharpapi/api/v1/content/summarize/job/status/${job_id}`, options);
          const statusData = await response.json();
      
          if (statusData.data.attributes.status === 'success') {
            return statusData.data.attributes.result.summary;
          } else if (statusData.data.attributes.status === 'error') {
            return 'An error occurred while summarizing.';
          } else {
            // Wait and check again in 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
            return await checkJobStatus(); // Recursively check again
          }
        };
      
        return await checkJobStatus();
      };
      


    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes, getEntireNote, summarizeContent}}>
            {props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;