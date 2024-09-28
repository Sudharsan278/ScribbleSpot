import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

const UserDetails = () => {

  const [user,setUser] = useState({
    name : '',
    email : '',
    gender : '',
    dob : ''
  })

  const userDetails = async () => {
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'authentication-token' : `${localStorage.getItem('authenticationToken')}`
      }
    });
    const user = await response.json();

    setUser(user);
  }

  useEffect(()=>{
    userDetails();
  }, [])

  const mode = useSelector(state => state.mode);
  let fontColor = mode === 'light' ? 'black' : 'white';

  return (
    <div className="container my-5">
      <h1 className='header my-4' style = {{color : fontColor}}>User Details!</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style = {{color : fontColor}}>Name</label>
          <input disabled={true} type="text" className="form-control input-text-box" id="name" aria-describedby="emailHelp" value={user.name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"style = {{color : fontColor}}>Email address</label>
          <input disabled={true} type="email" className="form-control input-text-box" id="exampleInputEmail1" aria-describedby="emailHelp"  value={user.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"style = {{color : fontColor}}>Gender</label>
          <input disabled={true} type="text" className="form-control input-text-box" id="gender" aria-describedby="emailHelp"  value={user.gender} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"style = {{color : fontColor}}>Date Of Birth</label>
          <input disabled={true} type="text" className="form-control input-text-box" id="dob" aria-describedby="emailHelp"  value={new Date(user.dob).toLocaleDateString('en-US', {day : 'numeric', month : 'long', year : 'numeric'})} />
        </div>
      </form>
    </div>
  )
}

export default UserDetails
