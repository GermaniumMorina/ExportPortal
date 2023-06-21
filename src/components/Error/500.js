import React from "react";
import error500 from "./500.png";
import { useTranslation } from "react-i18next";
export const Error500 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={error500} className="imageError" alt="error" />
      <h1 className="errorType">500</h1>
      <p className="errorText">{t("error.Internal Server Error")}</p>
    </div>
  );
};
