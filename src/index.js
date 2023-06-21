import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
const selectedLanguage = localStorage.getItem("language") || "en";
i18n.changeLanguage(selectedLanguage);
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Router>
  </React.StrictMode>
);
