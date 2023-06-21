import React from "react";

import truck from "./Images/img.png";
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
      <div className="main-page-div">
        <div className="row">
          <h1 className="text-center">
            {t("signIn.Welcome")} {gender}
            {userName} {userSurname}!
          </h1>
          <h6 className="text-center">
            {t("testPages.This is our ExportPortal")}
          </h6>
          <div className="col-md-6">
            <div className="LoremIpsum">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                malesuada quam. Nam id commodo neque. Vestibulum rutrum cursus
                lacinia. Aliquam eu risus ut nunc iaculis consequat ut ut
                lectus. Sed fringilla placerat dui, eget scelerisque libero
                cursus in.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <img src={truck} alt="truck" className="img-fluid main-truck" />
          </div>
        </div>
      </div>

      <div className="lightBlueSection">
        <div className="row">
          <div className="col-md-4">
            <div className="LoremIpsum">
              <h2>Our Services</h2>
              <br />
              <br />

              <br />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="LoremIpsum">
              <h2>Our Products</h2>
              <br />
              <br />

              <br />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="LoremIpsum">
              <h2>Our Clients</h2>
              <br />
              <br />

              <br />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="greenSection">
        <div className="row">
          <div className="col-md-6">
            <div className="LoremIpsum">
              <h2>Our Services</h2>
              <br />
              <br />

              <br />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="LoremIpsum">
              <h2>Our Products</h2>
              <br />
              <br />

              <br />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse a ipsum dolor. In iaculis bibendum erat, id interdum
                risus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
