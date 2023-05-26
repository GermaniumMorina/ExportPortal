import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.png";
import avatar from "./avatar.jpg";
import albania from "./al.png";
import english from "./en.png";
import spanish from "./es.png";
import "./NavBar.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { BsCurrencyExchange } from "react-icons/bs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function NavBar() {
  const isLoggedIn = checkIfLoggedIn();
  const user = localStorage.getItem("userName");
  const tokens = localStorage.getItem("tokens");
  const userId = localStorage.getItem("userId");

  const handleTokens = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/token/${userId}`
    );
    console.log(response.data.amount);
    localStorage.setItem("tokens", response.data.amount);
  };

  useEffect(() => {
    handleTokens();
  }, []);

  const { i18n, t } = useTranslation();
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return isLoggedIn ? (
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

            <Nav.Link href="/buy">{t("navbar.Buy TEST")}</Nav.Link>
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
                  <NavDropdown.Item onClick={() => changeLanguage("al")}>
                    <img
                      src={albania}
                      alt="albania"
                      width="30"
                      height="20"
                      className="m-1"
                    />
                    {t("navbar.Albanian")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("en")}>
                    <img
                      src={english}
                      alt="english"
                      width="30"
                      height="20"
                      className="m-1"
                    />
                    {t("navbar.English")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("es")}>
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
                <NavDropdown.Item href="/logout">
                  {t("navbar.Logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
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
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
