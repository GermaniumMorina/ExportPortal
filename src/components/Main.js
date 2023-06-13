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
                Veniam nostrud quis et do. Ea commodo ad sit occaecat veniam
                consectetur consequat veniam qui amet irure duis ea. Voluptate
                excepteur nulla magna ullamco excepteur ullamco. Reprehenderit
                velit ex nisi sit sint laborum laboris magna cillum esse. Elit
                consequat veniam veniam exercitation officia consectetur ullamco
                laboris in laborum id dolor consectetur. Non pariatur qui esse
                tempor sint nulla cillum aliquip ut et non incididunt eu non. Do
                cupidatat amet amet consequat elit aliquip commodo exercitation.
                Excepteur consectetur et non elit qui ut ad magna occaecat
                nostrud velit velit irure qui. Nulla consectetur officia
                proident culpa anim sint elit ea anim et non ex incididunt.
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
