import React from "react";
import notfound from "./notfound.png";
import "./error.css";
import { useTranslation } from "react-i18next";
export const Error404 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={notfound} className="imageError" alt="error" />
      <h1 className="errorType">404</h1>
      <p className="errorText">{t("error.Page Not Found")}</p>
    </div>
  );
};
