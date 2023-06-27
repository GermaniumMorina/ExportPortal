import React, { useState, useEffect } from "react";
import "./Summary.css";
import avatar from "../Navigation/avatar.jpg";
import { useTranslation } from "react-i18next";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MdOutlineDoneOutline } from "react-icons/md";
import { SiQuicklook } from "react-icons/si";
import { ImNotification } from "react-icons/im";
import { BsFillFileEarmarkBreakFill } from "react-icons/bs";
import axios from "axios";

const Summary = () => {
  const UserName = localStorage.getItem("userName");
  const UserId = localStorage.getItem("userId");

  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apiCompanies, apiNotifications] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/companyData/${UserId}`),
          axios.get(`http://127.0.0.1:8000/api/showAllNotify/${UserId}/1`),
        ]);
        setCompanies(apiCompanies.data);
        console.log(apiCompanies.data);

        setNotifications(apiNotifications.data.original);
        console.log(apiNotifications.data.original);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [UserId]);

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

            {notifications.map((notification, index) => (
              <div className="notification" key={index}>
                <p>{`${notification["Full Name"]} is interested in your product: ${notification["Product"]}`}</p>
              </div>
            ))}

          </div>
        </div>
        <div className="company-info-right">
  {companies.length > 0 && (
    <>
      <div className="company-information">
        {companies.map((company) => (
          <div key={company.id}>
            <div
              className={`company-status is-${company.status.toLowerCase()}`}
            >
              {company.status === "Approved" && <MdOutlineDoneOutline />}
              {company.status === "Under Reviewal" && (
                <BsFillFileEarmarkBreakFill />
              )}
              {company.status === "Disapproved" && <ImNotification />}
              {company.status === "Preparing" && <SiQuicklook />}
              <span>{company.status}</span>
            </div>

            <div className="company-details">
              <h2>Name: {company.name}</h2>
              <br/>
              <br/>
              <br/>


              <p>Keywords: {company.keywords}</p>
              <p>Country: {company.country}</p>
              <p>Web Address: {company.web_address}</p>
              <p>More Info: {company.more_info}</p>
              <p>Budget: {company.budget}</p>
              <p>Type: {company.type}</p>
              <p>Category ID: {company.category_id}</p>
              <p>Subcategory ID: {company.subcategory_id}</p>
              <p>Membership: {company.membership}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>

      </div>
    </div>
  );
};

export default Summary;
