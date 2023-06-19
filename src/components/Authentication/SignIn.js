import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./SignIn.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = document.cookie;
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          //set response in local storage
          //  localStorage.setItem('user', JSON.stringify(response.data))
          if (response.status === 200) {
            localStorage.setItem("userName", response.data.user.name);
            localStorage.setItem("userEmail", response.data.user.email);
            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userRole", response.data.user.role);
            localStorage.setItem("token", token);
            localStorage.setItem("userGender", response.data.user.gender);
            localStorage.setItem("userSurname", response.data.user.surname);
            localStorage.setItem("userPhone", response.data.user.phone_number);
            const language_Id = response.data.language_id;

            let language;

            switch (language_Id) {
              case 1:
                language = "en";
                break;
              case 2:
                language = "es";
                break;
              case 3:
                language = "al";
                break;
              default:
                language = "en";
                break;
            }

            localStorage.setItem("language_Id", language_Id);
            localStorage.setItem("language", language);
            i18n.changeLanguage(language);
            alertify.success("Welcome Back!");
            navigate("/dashboard");
          }
        })
        .catch(function (error) {
          console.error(error);
          alertify.warning("Authentication Failed");
        });
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="form-div" id="base">
        <h2 className="welcome">{t("signIn.Welcome")}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              type="email"
              placeholder={t("signIn.Enter email or username")}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              type="password"
              placeholder={t("signIn.Password")}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forgot-password">
              <Link to="/ForgotPassword">{t("signIn.Forgot Password?")}</Link>
            </p>
          </Form.Group>

          <Button className="sign-in-button" variant="info" type="submit">
            {t("signIn.Submit")}
          </Button>

          <p className="sign-up-prompt">
            {t("signIn.If you dont have a membership yet")}
            <Link to="/SignUp">{t("navbar.Sign Up")}</Link>
          </p>

          <Button className="activate-button" variant="success" type="submit">
            {t("signIn.Activate")}
          </Button>
        </Form>
      </div>
    </div>
  );
};
