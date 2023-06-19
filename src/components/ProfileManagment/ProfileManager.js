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

const ProfileManager = () => {
  const userId = localStorage.getItem("userId");
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");
  const userCountry = localStorage.getItem("userCountry");

  const [formValues, setFormValues] = useState({
    name: UserName,
    surname: UserSurname,
    email: UserEmail,
    phone_number: UserPhone,
    gender: UserGender,
    country_id: userCountry,
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(formValues);
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .put(`http://localhost:8000/api/updateUser/${userId}`, {
          name: formValues.name,
          surname: formValues.surname,
          email: formValues.email,
          phone_number: formValues.phone_number,
          gender: formValues.gender,
          country_id: 1,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("userName", formValues.name);
            localStorage.setItem("userEmail", formValues.email);
            localStorage.setItem("userSurname", formValues.surname);
            localStorage.setItem("userPhone", formValues.phone_number);

            alertify.success("Profile updated successfully");
            console.log("ALL OK");
          }
        })
        .catch(function (error) {
          console.error(error);
          alertify.error("Error updating profile");
        });
    });
  };


  const { t } = useTranslation();

  const isLoggedIn = checkIfLoggedIn();
  return isLoggedIn ? (
    <div>
      <div className="d-flex justify-content-center">
        <div className="edit-div">
          <h2 className="welcome">{t("profileManager.Edit Profile")}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t("companyListing.Name")}</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                defaultValue={UserName}
                onChange={(e) => {
                  setFormValues({ ...formValues, name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("signUp.Surname")}</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                name="surname"
                defaultValue={UserSurname}
                onChange={(e) => {
                  setFormValues({ ...formValues, surname: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("newsletter.Email")}</Form.Label>
              <Form.Control
                type="text"
                id="email"
                name="email"
                defaultValue={UserEmail}
                onChange={(e) => {
                  setFormValues({ ...formValues, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Label>{t("signUp.Gender")}</Form.Label>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                name="gender"
                id="male"
                label={t("signUp.Male")}
                inline
                value="male"
                checked={formValues.gender === "male"} 
                onChange={(e) => {
                  setFormValues({ ...formValues, gender: e.target.value });
                }}
              />

              <Form.Check
                type="radio"
                name="gender"
                id="female"
                label={t("signUp.Female")}
                inline
                value="female"
                checked={formValues.gender === "female"} 
                onChange={(e) => {
                  setFormValues({ ...formValues, gender: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("signUp.Phone Number")}</Form.Label>
              <Form.Control
                type="text"
                id="phone_number"
                name="phone_number"
                defaultValue={UserPhone}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    phone_number: e.target.value,
                  });
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

export default ProfileManager;
