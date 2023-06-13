import React from "react";
import image from "./Images/img.png";

import "./Main.css";
import { useTranslation } from "react-i18next";
const Main = () => {
  let gender = "";

  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userGender = localStorage.getItem("userGender");

  if (userGender === "male") {
    gender = "Mr.";
  } else if (userGender === "female") {
    gender = "Mrs.";
  }
  const { t } = useTranslation();
  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="text-center mt-5 heading">
            {t("signIn.Welcome")} {gender}
            {userName} {userSurname}!
          </h1>
          <div className="col-md-12 d-flex mb-4 mt-4">
            <div>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <img src={image} alt="truck" className="img-fluid main-truck" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
