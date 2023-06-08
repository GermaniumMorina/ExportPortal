import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"; // Import Dropdown components here
import logo from "./logo.png";
import avatar from "./avatar.jpg";
import albania from "./al.png";
import english from "./en.png";
import spanish from "./es.png";
import "./NavBar.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { BsCurrencyExchange } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";
function NavBar() {
  const isLoggedIn = checkIfLoggedIn();
  const user = localStorage.getItem("userName");
  const [tokens, setTokens] = useState(localStorage.getItem("tokens"));
  const userId = localStorage.getItem("userId");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Notify/${userId}`
        );
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          // Filter notifications by notifiable_id
          const userNotifications = response.data.filter((notification) => {
            const notificationData = JSON.parse(notification.data);
            return notificationData.notifiable_id === userId;
          });

          console.log(userNotifications);
          setNotifications(userNotifications);

          // Count unread notifications
          let unread = 0;
          userNotifications.forEach((notification) => {
            if (!notification.read_at) {
              unread++;
            } // assuming read_at is null for unread notifications
          });
          setUnreadCount(unread);

          setMessage(""); // Clear the message if notifications are present
        } else {
          console.log("No notifications found.");
          setNotifications([]);
          setUnreadCount(0);

          setMessage("No new notifications."); // Set the message when no notifications are found
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
      setTokens(response.data[0].amount);
      localStorage.setItem("tokens", response.data[0].original.amount);
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
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem("language", languageCode); // Save language code to local storage
    i18n.changeLanguage(languageCode); // Change language using react-i18next
    window.location.reload(); // Reload the page to apply the new language
  };
  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
  return isLoggedIn ? (
    <div>
      <Navbar bg="light" variant="light" className="custom-navbar">
        <Navbar.Brand href="/" className="logo">
          <img
            src={logo}
            alt="logo"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

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
          <Nav.Link href="/corporate">{t("navbar.Corporate")}</Nav.Link>
        </Nav>

        <Nav>
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
                    {user} · <BsCurrencyExchange /> {tokens}
                  </span>
                </>
              }
              className="flex-grow-0"
            >
              <NavDropdown.Item href="/profile">
                {t("navbar.Profile")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/account">
                {t("navbar.Account")}
              </NavDropdown.Item>
              <NavDropdown title={t("navbar.Language")}>
                <NavDropdown.Item onClick={() => handleLanguageChange("al")}>
                  <img
                    src={albania}
                    alt="albania"
                    width="30"
                    height="20"
                    className="m-1"
                  />
                  {t("navbar.Albanian")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
                  <img
                    src={english}
                    alt="english"
                    width="30"
                    height="20"
                    className="m-1"
                  />
                  {t("navbar.English")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange("es")}>
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

        <Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              caret
              tag="span"
              style={{ position: "relative" }} // Inline styling added here
            >
              <span role="img" aria-label="bell" className="bell-icon">
                🔔
              </span>
              {unreadCount > 0 && <span>{unreadCount}</span>}
            </DropdownToggle>
            <DropdownMenu>
              <p>{message}</p>
              {notifications.map((notification, index) => {
                const notificationData = JSON.parse(notification.data);
                return (
                  <DropdownItem key={index}>
                    <p>{`${notificationData["Full Name"]} is interested in your product: ${notificationData["Product"]}`}</p>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    </div>
  ) : (
    <div>
      <Navbar bg="light" variant="light" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="logo">
            <img
              src={logo}
              alt="logo"
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Nav className="me-auto">
            <NavDropdown
              title={<span className="ms-2">{t("navbar.Company")}</span>}
            >
              <NavDropdown.Item href="/Companies">
                {t("navbar.Companies")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/companyListing">
                {t("navbar.Company List")}
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
              <NavDropdown.Item href="/Import">
                {t("navbar.Import")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Export">
                {t("navbar.Export")}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/buy">{t("navbar.Buy TEST")}</Nav.Link>
            <Nav.Link href="/SignUp">{t("navbar.Sign Up")}</Nav.Link>
            <Nav.Link href="/SignIn">{t("navbar.Sign In")}</Nav.Link>
          </Nav>
          <NavDropdown title={<BsGlobe />} className="text-primary">
            <NavDropdown.Item onClick={() => handleLanguageChange("al")}>
              <img
                src={albania}
                alt="albania"
                width="30"
                height="20"
                className="m-1"
              />
              {t("navbar.Albanian")}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
              <img
                src={english}
                alt="english"
                width="30"
                height="20"
                className="m-1"
              />
              {t("navbar.English")}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLanguageChange("es")}>
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
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
