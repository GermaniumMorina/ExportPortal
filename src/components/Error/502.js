import React from "react";
import error500 from "./500.png";
import { useTranslation } from "react-i18next";
export const Error502 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={error500} className="imageError" alt="error" />
      <h1 className="errorType">502</h1>
      <p className="errorText">{t("error.Service Temporarily Overloaded")}</p>
    </div>
  );
};
