import AlertContext from "./AlertContext";
import React, { useState } from 'react'

const AlertState = (props) => {
 
    const [alert,setAlert] = useState({message : "", type : ""});
    
    const showAlert = (message, type) => {
        setAlert({
            message,type
        });
        setTimeout(() => {
            setAlert({
                message : "",
                type : ""
            })
        },2000);

    }

    return (
        <AlertContext.Provider value = {{alert ,showAlert}} >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
