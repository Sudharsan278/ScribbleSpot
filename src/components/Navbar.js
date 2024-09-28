import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../state/reducers/modeReducer';
import image from '../icons/image.png'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('authenticationToken');
    navigate("/login");
  }

  const mode = useSelector(state => state.mode)

  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    console.log(mode);
    const newMode = mode==='light'? 'dark' : 'light';
    dispatch(changeMode(newMode));
  }

  useEffect( ()=>{
    document.body.style.backgroundColor = '#FAF0E6'
  },[])


  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode==='light'?'#FAF0E6' : 'dark'} bg-${mode==='light'?'#FAF0E6' : 'dark'}`} style={{borderBottomWidth : '1px', borderBottomColor : 'gray', borderBottomStyle : 'solid', backgroundColor : mode==='light' ? '#FAF0E6' : 'dark'}}>
  <div className="container-fluid">
    <Link className="navbar-brand " to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`}  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
        </li>
        
        
      </ul>
      {mode === 'dark'?
      // <i className="fa-regular fa-sun mx-3 my-1 fa-2x" onClick={handleClick} style={{ cursor: 'pointer', color: 'white' }}></i>
      // eslint-disable-next-line
      <img className = "sun" src ={`${image}`} onClick={handleClick} style ={{width : '50px', cursor : 'pointer'}}></img> : 
      
      <i className="fa-regular fa-moon fa-2x my-1 mx-2" onClick={handleClick}></i>}

      {!localStorage.getItem('authenticationToken')?

      <form className="d-flex" role="search">
      
      <Link className="btn btn-primary mx-3" to="/login" role="button ">LogIn</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button ">SignUp</Link></form> :
      
      <>
      <Link to="/getuser" ><i className="fa-solid fa-user-check mx-4 fa-lg"></i></Link>
      <button className='btn btn-primary' onClick={handleLogOut}>Logout</button></>}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
