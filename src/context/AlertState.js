import AlertContext from "./AlertContext";
import React, { useCallback, useState,useMemo,memo } from 'react'

const AlertState = memo((props) => {
 
    const [alert,setAlert] = useState({message : "", type : ""});
    
    const showAlert = useCallback((message, type) => {
        setAlert({
            message,type
        });
        setTimeout(() => {
            setAlert({
                message : "",
                type : ""
            })
        },2000);

    },[]);

   
    return (
        <AlertContext.Provider value = {{alert,showAlert}} >
            {props.children}
        </AlertContext.Provider>
    )
});

export default AlertState
