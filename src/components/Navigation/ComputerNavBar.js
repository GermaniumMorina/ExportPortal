
    import Container from 'react-bootstrap/Container';
    import Nav from 'react-bootstrap/Nav';
    import Navbar from 'react-bootstrap/Navbar';
    import NavDropdown from 'react-bootstrap/NavDropdown';

    import logo from "./logo.png";
    import albania from "./al.png";
    import english from "./en.png";
    import spanish from "./es.png";
    import "./NavBar.css";
    import React, { useEffect, useState } from "react";
    import { useTranslation } from "react-i18next";
    import { BsGlobe } from "react-icons/bs";
    import { useMediaQuery } from 'react-responsive'
    
    function ComputerNavBar() {

     
  
  
    const isIphone=useMediaQuery({ query: '(max-width: 1000px)' })
  

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

          {isIphone &&
          <NavDropdown title={<BsGlobe />} className="text-info">
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
      
          }
        </Container>
      </Navbar>
    );
  }

    

export default ComputerNavBar