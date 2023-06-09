import React from "react";
import "./NotAllowedAdmin.css";
import admin from "./admin.png"

const NotAllowedAdmin = () => {

  const handleSignIn= () => {
window.location.href="/SignIn";
  }

  return  (
    <div className="main-not-allowed-div">
      <img src={admin} alt={admin} className="stop-image" />
      <h1>Administration page you are not allowed!</h1>
        
      <div className="first-not-allowed-button">
      <button className="learn-more"  onClick={handleSignIn}>
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Sign In </span>
      </button>
      </ div>   
    </div>
  );
};

export default NotAllowedAdmin;
