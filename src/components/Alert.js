import React from "react";

export default function Alert(props){
  
    const capitalizeFirstWord = (str) => {
        if(str === "danger"){
          str = "error";
        } 
        const lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height : '50px'}}>
            {props.type && <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalizeFirstWord(props.type)}</strong> : {props.message}
        </div>}
        </div>
    );
}