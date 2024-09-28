import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';
import { useSelector } from 'react-redux';

const Login = () => {
  
  const [credentials, setCredentials] = useState({email : "" , password : ""})
  const alertContext = useContext(AlertContext);
  const showAlert = alertContext.showAlert;
  const mode = useSelector(state => state.mode);
  let fontColorModifier = mode==='dark' ? 'white' : 'black';

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method : 'POST',
      headers  : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({email : credentials.email, password : credentials.password})
    })
    const json = await response.json();
    if(json.success){
      navigate("/");
      showAlert("Logged in Successfully!", "success");
      localStorage.setItem('authenticationToken', json.authenticationToken);

    }else{
      showAlert(json.error, "danger");
    }
    console.log(json);
  }

  const handleChange = (event) => {
    setCredentials({...credentials,[event.target.name] : event.target.value });
  };


  return (
    <div className='container my-3'>
      <h1 className='my-4' style={{color : fontColorModifier}}>Login to Continue with myNoteBook!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{color : fontColorModifier}}>Email address</label>
          <input type="email" className="form-control input-text-box" value={credentials.email} onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text" style={{color : fontColorModifier}}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 my-5">
          <label htmlFor="password" className="form-label" style={{color : fontColorModifier}}>Password</label>
          <input type="password" className="form-control input-text-box" value={credentials.password} onChange={handleChange} id="password" name="password" required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary my-3" >Submit</button>
      </form>
    </div>
  )
}

export default Login;