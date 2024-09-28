import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';
import { useSelector } from 'react-redux';

const Signup = () => {

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  const [credentials, setCredentials] = useState({name:"", email : "", password: "", cpassword : "", gender: "", dob: ""});
  const navigate = useNavigate();
  const mode = useSelector(state => state.mode);
  const fontColor = mode == 'light'? 'black' : 'white';
  
  
  const handleChange = (event) =>{
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) =>{

    event.preventDefault();
    const {name, email, password,cpassword, gender, dob} = credentials;

    if(password !=cpassword){
      showAlert("Password Doesn't Match!", 'danger')
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/createuser',{

      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
       body : JSON.stringify({name, email, password, gender, dob})
    });


    const json = await response.json();
    
    if(json.success){

      console.log(json.authenticationToken);
      localStorage.setItem('authenticationToken', json.authenticationToken);
      navigate("/");
      showAlert("Successfully Signed in!", "success");

    }else{
      showAlert(json.error, "danger");
      console.log(json)
    }
    
  }

  return (
    <div className='container' style={{color : fontColor}}>
      <h1 className='my-4'>Signup to Continue with myNoteBook!</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control input-text-box" id="name" name="name" onChange={handleChange} required minLength={3}/>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select type ="text" onChange={handleChange} className="form-control" id="gender" name="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="dob" >Date of Birth</label>
          <input type="date" onChange={handleChange} className="form-control input-text-box" id="dob" name="dob" required/>
        </div>


        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control input-text-box" id="email" name="email" onChange={handleChange} required aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control input-text-box" id="password" name="password" onChange={handleChange} required minLength={5}/>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control input-text-box" id="cpassword" name="cpassword" onChange={handleChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
