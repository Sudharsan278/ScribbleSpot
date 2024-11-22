import "./App.css";
import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup"
import AlertState from "./context/AlertState";
import AlertContext from "./context/AlertContext";
import UserDetails from "./components/UserDetails"
import ModeChecker from "./components/modeChecker";
import ViewFullNote from "./components/ViewFullNote";
import LoadingBar from "./components/LoadingBar";


function App() {



  return (
    <div className="App">
      <AlertState>  
        <NoteState>
          <Router>
            <Navbar />
            <LoadingBar/>
            <AlertInvoker/>
              <Routes>
                <Route path="/about" element={<About  />} />
                  <Route path="/" element={<Home  />} />
                  <Route path="/login" element={<Login />}  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/getuser" element={<UserDetails /> }/>
                  <Route path="/getentirenote/:id" element={<ViewFullNote />}/>
              </Routes>
          </Router>
        </NoteState>
      </AlertState>
    </div>
  );
}

  
function AlertInvoker () {
  const {alert} = useContext(AlertContext);
  return (
    <>
      <Alert type = {alert.type} message = {alert.message}></Alert>
    </>
  )
}

export default App;
