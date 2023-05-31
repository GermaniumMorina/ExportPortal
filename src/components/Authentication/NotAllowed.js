import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotAllowed = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("notAllowed.You are not allowed to view this page")}</h1>
      <Link to="/SignIn">{t("navbar.Sign In")}</Link>
    </div>
  );
};

export default NotAllowed;
