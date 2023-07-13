import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const [importClicked, setImportClicked] = useState(false);
    const [exportClicked, setExportClicked] = useState(false);
    
    let type;
    
    switch (importClicked) {
      case true:
        type = "import";
        break;
      case false:
        type = "export";
        break;
      default:
        type = "default";
        break;
    }
    
    
  const handleImportClick = () => {
    setImportClicked(true);
    setExportClicked(false);
  };

  const handleExportClick = () => {
    setImportClicked(false);
    setExportClicked(true);
  };
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log(type);
    navigate(`${type}`);
  };
  
  return (
    <div className="root-div">
      <div className="main-join-div">
        <p className="join-text">Join as Importer or Exporter</p>
        <div
          className={`join-import ${importClicked ? "join-clicked" : ""}`}
          onClick={handleImportClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M1 13C1 16.1826 2.26428 19.2348 4.51472 21.4853C6.76516 23.7357 9.8174 25 13 25C16.1826 25 19.2348 23.7357 21.4853 21.4853C23.7357 19.2348 25 16.1826 25 13" stroke="#0041F5" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 1V16M13 16L17.5 11.5M13 16L8.5 11.5" stroke="#0041F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="join-option-text">I want to Import</p>
        </div>
        <div
          className={`join-import ${exportClicked ? "join-clicked" : ""}`}
          onClick={handleExportClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M1 13C1 16.1826 2.26428 19.2348 4.51472 21.4853C6.76516 23.7357 9.8174 25 13 25C16.1826 25 19.2348 23.7357 21.4853 21.4853C23.7357 19.2348 25 16.1826 25 13" stroke="#0041F5" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 16V1M13 1L17.5 5.5M13 1L8.5 5.5" stroke="#0041F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="join-option-text">I want to Export</p>
        </div>
        <div className="create-account">
          <div className={`create-account-button ${importClicked || exportClicked ? "create-account-button-clicked" : ""}`} onClick={handleSignUp}>
            {importClicked || exportClicked ? (importClicked ? "Join as Importer" : "Join as Exporter") : "Create account"}
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
