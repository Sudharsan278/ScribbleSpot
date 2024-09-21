import React from "react";

const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        This is a alret message {props.message}
      </div>
    </div>
  );
};

export default Alert;
