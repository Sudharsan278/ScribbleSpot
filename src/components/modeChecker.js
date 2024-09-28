import React from 'react'
import { changeMode } from '../state/reducers/modeReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const ModeChecker = () => {

  
  const mode = useSelector(state => state.mode);
  const dispatch = useDispatch();  

//   document.body.style.backgroundColor = mode==='light'? 'white' : 'black';


  const handleClick = () => {
    const newMode = mode==='light'? 'dark' : 'light';
    dispatch(changeMode(newMode));
  }

  return (
    <div className='container'>
      <button onClick={handleClick}>{mode}</button>
    </div>
  )
}

export default ModeChecker
