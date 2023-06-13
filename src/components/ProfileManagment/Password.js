import React from "react";
import "./ProfileManager.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import NotAllowed from "../Authentication/NotAllowed";

const Password = () => {

  const UserEmail = localStorage.getItem("userEmail");

  const [formValues, setFormValues] = useState({
    email : UserEmail,
    password : "",
    r_password: "",


    
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(formValues);
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .put(`http://localhost:8000/api/password`, {
       
          email: formValues.email,
          newPassword: formValues.password,
          confirmPassword: formValues.r_password
       
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {

            alertify.success("Password updated successfully");
          }
        })
        .catch(function (error) {
          console.error(error);
          alertify.error("New password cannot be same as existing");
        });
    });
  };

  
  const { t } = useTranslation();

  const isLoggedIn = checkIfLoggedIn();
  return isLoggedIn ? (
    <div>
      <div className="d-flex justify-content-center">
        <div className="edit-div">
          <h2 className="welcome">Change Password</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>{t("newsletter.Email")}</Form.Label>
              <Form.Control
                disabled
                type="text"
                id="email"
                name="email"
                defaultValue={UserEmail}
                onChange={(e) => {
                  setFormValues({ ...formValues, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                  setFormValues({ ...formValues, password: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                id="r_password"
                name="r_password"
                onChange={(e) => {
                  setFormValues({ ...formValues, r_password: e.target.value });
                }}
              />
            </Form.Group>
          

            <button className="edit-button" type="submit">
              {t("signIn.Submit")}
            </button>
    
          </Form>
        </div>
      </div>
    </div>
  ) : (
    <NotAllowed />
  );
};

export default Password;
