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
import LoadingBar from "../LoadingScreens/LoadingBar";

const Summary = () => {
  const UserName = localStorage.getItem("userName");
  const UserId = localStorage.getItem("userId");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [notifications, setNotifications] = useState([] || null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          apiCompanies,
          apiNotifications,
          apiCategories,
          apiSubCategories,
        ] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/companyData/${UserId}`),
          axios.get(`http://127.0.0.1:8000/api/showUnReadNotify/${UserId}/1`),
          axios.get("http://127.0.0.1:8000/api/category"),
          axios.get("http://127.0.0.1:8000/api/subcategory"),
        ]);
        setCompanies(apiCompanies.data);

        setNotifications(apiNotifications.data.original);

        setCategories(apiCategories.data);
        setSubcategories(apiSubCategories.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [UserId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have the COMPANY_ID available
      const COMPANY_ID = companies[0].id; // Replace with the actual company ID
      console.log(COMPANY_ID);
      console.log({
        category: selectedCategory,
        subcategory: selectedSubcategory,
      });
      // Perform the PUT request to update the category and subcategory
      await axios.put(
        `http://127.0.0.1:8000/api/updateCategory/${COMPANY_ID}`,
        {
          category_id: selectedCategory,
          subcategory_id: selectedSubcategory,
        }
      );

      setEditMode(false);
    } catch (error) {
      console.error("Error updating category and subcategory:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  return (
    <div>
      {loading ? (
        <div>
          <LoadingBar />
        </div>
      ) : (
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
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div className="notification" key={index}>
                    <p>{`${notification["Full Name"]} is interested in your product: ${notification["Product"]}`}|| {notification.message}</p>
                  </div>
                ))
              ) : (
                <p>No notifications</p>
              )}
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
                        {company.status === "Approved" && (
                          <MdOutlineDoneOutline />
                        )}
                        {company.status === "Under Reviewal" && (
                          <BsFillFileEarmarkBreakFill />
                        )}
                        {company.status === "Disapproved" && <ImNotification />}
                        {company.status === "Preparing" && <SiQuicklook />}
                        <span>{company.status}</span>
                      </div>

                      <div className="company-details">
                        {editMode ? (
                          <>
                            <label htmlFor="category">Category:</label>
                            <select
                              id="category"
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                            <br />
                            <br />
                            <label htmlFor="subcategory">Subcategory:</label>
                            <select
                              id="subcategory"
                              value={selectedSubcategory}
                              onChange={handleSubcategoryChange}
                            >
                              <option value="">Select Subcategory</option>
                              {subcategories.map((subcategory) => (
                                <option
                                  key={subcategory.id}
                                  value={subcategory.id}
                                >
                                  {subcategory.name}
                                </option>
                              ))}
                            </select>
                            <br />
                            <br />
                            <button onClick={handleSubmit}>Submit</button>
                          </>
                        ) : (
                          <>
                            <h2>Name: {company.company_name}</h2>
                            <br />
                            <br />
                            <br />

                            <p>Keywords: {company.keywords}</p>
                            <p>Country: {company.country}</p>
                            <p>Web Address: {company.web_address}</p>
                            <p>More Info: {company.more_info}</p>
                            <p>Type: {company.type}</p>
                            <p>Category ID: {company.category_name}</p>
                            <p>Subcategory ID: {company.subcategory_name}</p>
                            <button onClick={handleEditClick}>Edit</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
