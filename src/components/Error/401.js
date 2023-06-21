import React from "react";
import lock from "./lock.png";
import "./error.css";
import { useTranslation } from "react-i18next";
export const Error401 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={lock} className="imageError" alt="lock" />
      <h1 className="errorType">401</h1>
      <p className="errorText">{t("error.Unathorized")}</p>
    </div>
  );
};
