import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {

  const a = useContext(NoteContext);

  return (
    <div className='container'>
      This is about! from  Harry and he is a Youtuber and a Developer 
    </div>
  )
}
  
export default About
