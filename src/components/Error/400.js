import React from "react";
import robot from "./robot.png";
import "./error.css";
import { useTranslation } from "react-i18next";
export const Error400 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={robot} className="imageError" alt="robot" />
      <h1 className="errorType">400</h1>
      <p className="errorText">{t("error.Bad Request")}</p>
    </div>
  );
};
