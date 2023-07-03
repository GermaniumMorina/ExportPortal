import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "./logo.png";
import avatar from "./avatar.jpg";
import albania from "./al.png";
import english from "./en.png";
import spanish from "./es.png";
import "./NavBar.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCurrencyExchange, BsBell } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Announcments from "../Announcments/Announcments";
function ComputerNavBar() {
  const isLoggedIn = checkIfLoggedIn();
  const user = localStorage.getItem("userName");
  const [tokens, setTokens] = useState(localStorage.getItem("tokens"));
  const userId = localStorage.getItem("userId");
  const userSurname = localStorage.getItem("userSurname");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [notificationsActive, setNotificationsActive] = useState(true);
  const { i18n, t } = useTranslation();
  const RemoveInfo = useMediaQuery({ query: "(max-width: 1000px)" });

  useEffect(() => {
    const fetchNotifications = async (language) => {
      try {
        let languageId;

        switch (language) {
          case "en":
            languageId = 1;
            break;
          case "es":
            languageId = 2;
            break;
          case "al":
            languageId = 3;
            break;
          default:
            languageId = 1;
            break;
        }
        const response = await axios.get(
          `http://localhost:8000/api/showAllNotify/${userId}/${languageId}`
        );
        console.log(response.data);
        if (response.data.original && response.data.original.length > 0) {
          const userNotifications = response.data.original.filter(
            (notification) => {
              const notificationData = JSON.parse(notification.data);
              return notificationData.notifiable_id === parseInt(userId, 10);
            }
          );

          setNotifications(userNotifications);

          let unread = 0;
          userNotifications.forEach((notification) => {
            if (!notification.read_at) {
              unread++;
            }
          });
          setUnreadCount(unread);

          setMessage("");
        } else {
          console.log("No notifications found.");
          setNotifications([]);
          setUnreadCount(0);

          setMessage("No new notifications.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchTokenValue = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/token/${userId}`
      );
      setTokens(response.data.original.amount);
      localStorage.setItem("tokens", response.data.original.amount);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokenValue();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = async (language) => {
    let languageId;

    switch (language) {
      case "en":
        languageId = 1;
        break;
      case "es":
        languageId = 2;
        break;
      case "al":
        languageId = 3;
        break;
      default:
        languageId = 1;
        break;
    }

    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    console.log("Selected language:", language);
    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.get(
        `http://localhost:8000/api/updateLanguage/${userId}/${languageId}`
      );
      console.log(
        "Language updated successfully on the server:",
        response.data
      );

      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : {};
      user.languageId = languageId;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to update language on the server:", error);
    }
  };
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
  const toggleNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/notificatiOnOff/${userId}`
      );

      setNotificationsActive(
        (prevNotificationsActive) => !prevNotificationsActive
      );

      if (response.data.success) {
        const newUnreadCount = notificationsActive
          ? unreadCount + 1
          : unreadCount - 1;
        setUnreadCount(newUnreadCount);
      }

      console.log(
        "Notifications toggled successfully for user:",
        response.data
      );
    } catch (error) {
      console.error("Failed to toggle notifications:", error);
      // Handle the error
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo">
          <img
            src={logo}
            alt="logo"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={<span className="ms-2"> {t("navbar.Company")}</span>}
            >
              <NavDropdown.Item href="/Companies">
                {t("navbar.Companies")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/AddNewCompany">
                {t("navbar.Add new company")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<span className="ms-2">{t("navbar.Product")}</span>}
            >
              <NavDropdown.Item href="/AddNewItem">
                {t("navbar.Add New Product")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/products">
                {t("navbar.Products")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Import">
                {t("navbar.Import")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Export">
                {t("navbar.Export")}
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/Marketplace">
              {t("marketplace.Marketplace")}
            </Nav.Link>
            <Nav.Link href="/stories">{t("navbar.Succes Stories")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Announcments/>

        {!RemoveInfo && isLoggedIn && (
          <div>
            <Nav className="ms-auto">
              <Dropdown
                className="bell-icon"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle caret tag="span">
                  <span role="img" aria-label="bell">
                    <BsBell />
                  </span>
                  {unreadCount > 0 && (
                    <span className="unread-count">{unreadCount}</span>
                  )}
                </DropdownToggle>
                <DropdownMenu className="message1">
                  <div className="notification-header">
                    <h5>Notifications</h5>
                    {user && (
                      <label className="switch">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={notificationsActive}
                          onChange={toggleNotifications}
                        />
                        <div className="slider"></div>
                      </label>
                    )}
                  </div>
                  <p>{message}</p>
                  {notifications.map((notification, index) => {
                    const notificationData = JSON.parse(notification.data);
                    return (
                      <DropdownItem className="new-message" key={index}>
                        <p>{`${notificationData["Full Name"]} is interested in your product: ${notificationData["Product"]}`}</p>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
              {user && (
                <NavDropdown
                  id="avatar-dropdown"
                  title={
                    <>
                      <img
                        src={avatar}
                        alt="avatar"
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />
                      <span className="ms-2">
                        {user} {userSurname} · <BsCurrencyExchange /> {tokens}
                      </span>
                    </>
                  }
                  className="flex-grow-0"
                >
                  <NavDropdown.Item href="/account">
                    {t("navbar.Account")}
                  </NavDropdown.Item>
                  <NavDropdown title={t("navbar.Language")}>
                    <NavDropdown.Item
                      onClick={() => handleLanguageChange("al")}
                    >
                      <img
                        src={albania}
                        alt="albania"
                        width="30"
                        height="20"
                        className="m-1"
                      />
                      {t("navbar.Albanian")}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleLanguageChange("en")}
                    >
                      <img
                        src={english}
                        alt="english"
                        width="30"
                        height="20"
                        className="m-1"
                      />
                      {t("navbar.English")}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleLanguageChange("es")}
                    >
                      <img
                        src={spanish}
                        alt="spanish"
                        width="30"
                        height="20"
                        className="m-1"
                      />
                      {t("navbar.Spanish")}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    {t("navbar.Logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default ComputerNavBar;
