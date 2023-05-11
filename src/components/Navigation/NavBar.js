import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.png";
import avatar from "./avatar.jpg";
import "./NavBar.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { BsCurrencyExchange } from "react-icons/bs";
function NavBar() {
  const isLoggedIn = checkIfLoggedIn();
  const user = localStorage.getItem("userName");
  const tokens = localStorage.getItem("tokens");
  const handleTokens = async () => {
    const response = await axios.get("http://localhost:8000/api/token/11");
    console.log(response.data.amount);
    localStorage.setItem("tokens", response.data.amount);
  };
  handleTokens();
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
            <Nav.Link href="/Companies">Companies</Nav.Link>
            <Nav.Link href="/AddNewCompany">Add new company</Nav.Link>
            <Nav.Link href="/AddNewItem">Add New Product</Nav.Link>
            <Nav.Link href="/Import">Import</Nav.Link>
            <Nav.Link href="/Export">Export</Nav.Link>
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
                    <span className="ms-2">{user}  ·   <BsCurrencyExchange /> {tokens}</span>
                  </>
                }
                className="flex-grow-0"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
             
          </Nav>
        </Container>
      </Navbar>
    </div>
  ) : (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="logo"
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/Companies">Companies</Nav.Link>
            <Nav.Link href="/AddNewCompany">Add new company</Nav.Link>
            <Nav.Link href="/AddNewItem">Add New Product</Nav.Link>
            <Nav.Link href="/Import">Import</Nav.Link>
            <Nav.Link href="/Export">Export</Nav.Link>
            <Nav.Link href="/SignUp">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
