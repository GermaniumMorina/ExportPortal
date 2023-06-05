import React from "react";

import { Navigate } from "react-router-dom";
import { checkIfLoggedIn } from "./Authentication/checkIfLoggedIn";
import truck from "./Images/Trucks.jpg";
import depo from "./Images/depo.jpg";
import "./Main.css";
import { useTranslation } from "react-i18next";
const Main = () => {
  let gender = "";

  const isLoggedIn = checkIfLoggedIn();
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userGender = localStorage.getItem("userGender");

  if (userGender === "male") {
    gender = "Mr.";
  } else if (userGender === "female") {
    gender = "Mrs.";
  }
  const { t } = useTranslation();
  return isLoggedIn ? (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              {t("signIn.Welcome")} {gender}
              {userName} {userSurname}!
            </h1>
            <h6 className="text-center">
              {t("testPages.This is our ExportPortal")}
            </h6>
            <img src={truck} alt="truck" className="img-fluid main-truck" />
            <h6 className="text-center">{t("testPages.You are logged in!")}</h6>
            <h6 className="text-center">
              {t("testPages.You can now browse our products and services")}
            </h6>
            <img src={depo} alt="depo" className="img-fluid main-depo" />
            <h6 className="text-center">
              {t("testPages.You can also add your own products and services")}
            </h6>
            <h6 className="text-center">
              {t("testPages.You can also edit your profile")}
            </h6>
            <h6 className="text-center">
              {t("testPages.You can also view your profile")}
            </h6>
            <h6 className="text-center">
              {t("testPages.You can also edit your orders")}
            </h6>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Main;
