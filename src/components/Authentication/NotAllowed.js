import React from "react";
import { useTranslation } from "react-i18next";
import "./NotAllowed.css";
import stop from "./stop.png"

const NotAllowed = () => {

  const handleSignIn= () => {
window.location.href="/SignIn";
  }

  const handleSignUp= () => {
    window.location.href="/SignUp";

  }
  const { t } = useTranslation();
  return (
    <div className="main-not-allowed-div">
      <img src={stop} alt={stop} className="stop-image" />
      <h1>{t("notAllowed.You are not allowed to view this page")}</h1>

      <div className="first-not-allowed-button">
      <button className="learn-more"  onClick={handleSignIn}>
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Sign In</span>
      </button>
      


      <button className="learn-more" id="second-button" onClick={handleSignUp}>
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Sign Up</span>
      </button>
      </ div>   
    </div>
  );
};

export default NotAllowed;
