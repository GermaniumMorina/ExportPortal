import React from "react";
import NavBar from "../Navigation/NavBar";
import "./ProfileManager.css";
import { useTranslation } from "react-i18next";
const ProfileViewer = () => {
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");

  const handleEdit = () => {
    window.location.href = "/profile/manager";
  };
  const { t } = useTranslation();
  return (
    <div>
      <NavBar />
      <div className="profile-view">
        <h1> {t("navbar.Profile")}</h1>
        <p>
          {t("companies.Name")} {UserName}
        </p>
        <p>
          {t("profileViewer.Surname")} {UserSurname}
        </p>
        <p>
          {t("profileViewer.Email")} {UserEmail}
        </p>
        <p>
          {t("profileViewer.Phone")} {UserPhone}
        </p>
        <p>
          {t("profileViewer.Gender")} {UserGender}
        </p>
        <button className="edit-button" onClick={handleEdit}>
          {t("profileManager.Edit Profile")}
        </button>
      </div>
    </div>
  );
};

export default ProfileViewer;
