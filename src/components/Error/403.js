import React from "react";
import lock from "./lock.png";
import "./error.css";
import { useTranslation } from "react-i18next";
export const Error403 = () => {
  const { t } = useTranslation();
  return (
    <div className="root">
      <img src={lock} alt="lock" className="imageError" />
      <h1 className="errorType">403</h1>
      <p className="errorText">{t("error.Unathorized")}</p>
    </div>
  );
};
