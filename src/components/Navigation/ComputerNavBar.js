import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";

import logo from "./Logo.svg";
import albania from "./al.svg";
import english from "./en.svg";
import german from "./de.svg";

function ComputerNavBar() {
  const { i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem("language", languageCode); // Save language code to local storage
    i18n.changeLanguage(languageCode); // Change language using react-i18next
    window.location.reload(); // Reload the page to apply the new language
  };

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
  const renderLanguageFlag = () => {
    let flag;
    if (selectedLanguage === "en") {
      flag = english;
    } else if (selectedLanguage === "al") {
      flag = albania;
    } else if (selectedLanguage === "de") {
      flag = german;
    }
    return <img src={flag} alt="Language Flag" className="language-flag" />;
  };
  return (
    <nav className="navbar-not-logged-in">
      <div className="logo-navbar">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="nav-items">
        <li className="nav-item">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="language-dropdown">

            {renderLanguageFlag()}

              {selectedLanguage === "en"
                ? " EN"
                : selectedLanguage === "al"
                ? " AL"
                : selectedLanguage === "de"
                ? " DE"
                : ""}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                <img src={english} alt="English" className="language-icon" />
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange("al")}>
                <img src={albania} alt="Albanian" className="language-icon" />
                Albanian
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange("de")}>
                <img src={german} alt="German" className="language-icon" />
                German
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
}

export default ComputerNavBar;
