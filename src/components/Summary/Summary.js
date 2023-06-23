import React from "react";
import "./Summary.css";
import avatar from "../Navigation/avatar.jpg";
import { useTranslation } from "react-i18next";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MdOutlineDoneOutline } from "react-icons/md";
import { SiQuicklook } from "react-icons/si";
import { ImNotification } from "react-icons/im";
import { BsFillFileEarmarkBreakFill } from "react-icons/bs";

const Summary = () => {
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");
  const { t } = useTranslation();

  return (
    <div>
      <div className="summary-main-div">
        <div className="personal-info-left">
          <div className="personal-information">
            <img src={avatar} alt="avatar" className="user-avatar" />
            <div className="user-details">
              <h2>
                {t("companies.Name")} {UserName} {UserSurname}
              </h2>
              <p>
                {t("profileViewer.Email")} {UserEmail}
              </p>
              <p>
                {t("profileViewer.Phone")} {UserPhone}
              </p>
              <p>
                {t("profileViewer.Gender")} {UserGender}
              </p>
            </div>
          </div>

          <div className="personal-notifications">
            <div className="notification-icon">
              <NotificationsIcon />
            </div>

            <div className="notification">
              <p className="notification-title">News</p>
              <p className="notification-subject">The submarine was found</p>
              <p className="notification-text">
                PQuis amet duis est dolore anim nulla consequat dolore et eu
                enim dolore deserunt anim. Anim ullamco id nisi nostrud enim eu
                ipsum consequat et incididunt esse. Qui velit ea cupidatat
                tempor excepteur minim pariatur reprehenderit excepteur sint
                duis. Esse minim voluptate in pariatur pariatur sit sit. In
                Lorem est anim ex minim elit fugiat magna magna veniam cupidatat
                reprehenderit. Minim ipsum laborum aliqua irure sint. Labore
                proident voluptate duis duis.
              </p>
            </div>
          </div>
        </div>
        <div className="company-info-right">
            
          <div className="company-status is-approved">
            <MdOutlineDoneOutline />
            <span>Approved</span>
          </div>

          <div className="company-status is-under-review">
            <BsFillFileEarmarkBreakFill />
            <span>Under Reviewal</span>
          </div>

          <div className="company-status is-disapproved">
             <ImNotification />
            <span>Disapproved</span>
          </div>

          <div className="company-status is-preparing">
            <SiQuicklook />
            <span>Preparing </span>
          </div>
        
          <div className="company-information">
          <div className="company-status is-approved">
            <MdOutlineDoneOutline />
            <span>Approved</span>
          </div>
          <div className="personal-information">
            <div className="user-details">
              <h2>
            {UserName} {UserSurname}
              </h2>
              <p>
                {t("profileViewer.Email")} {UserEmail}
              </p>
              <p>
                {t("profileViewer.Phone")} {UserPhone}
              </p>
              <p>
                {t("profileViewer.Gender")} {UserGender}
              </p>
            </div>
          </div>
          </div>
          
          <div className="company-information">
          <div className="company-status is-approved">
            <MdOutlineDoneOutline />
            <span>Approved</span>
          </div>
          <div className="personal-information">
            <div className="user-details">
              <h2>
            {UserName} {UserSurname}
              </h2>
              <p>
                {t("profileViewer.Email")} {UserEmail}
              </p>
              <p>
                {t("profileViewer.Phone")} {UserPhone}
              </p>
              <p>
                {t("profileViewer.Gender")} {UserGender}
              </p>
            </div>
          </div>
          </div>
          <div className="company-information">
          <div className="company-status is-approved">
            <MdOutlineDoneOutline />
            <span>Approved</span>
          </div>
          <div className="personal-information">
            <div className="user-details">
              <h2>
            {UserName} {UserSurname}
              </h2>
              <p>
                {t("profileViewer.Email")} {UserEmail}
              </p>
              <p>
                {t("profileViewer.Phone")} {UserPhone}
              </p>
              <p>
                {t("profileViewer.Gender")} {UserGender}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
