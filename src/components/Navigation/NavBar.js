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
import { useEffect } from "react";


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
            <NavDropdown title={<span className="ms-2">Company</span>}>
              <NavDropdown.Item href="/Companies">Companies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/AddNewCompany">Add new company</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span className="ms-2">Product</span>}>
            <NavDropdown.Item href="/AddNewItem">Add New Product</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Import">Import</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Export">Export</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/Marketplace">Marketplace</Nav.Link>
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
            <NavDropdown title={<span className="ms-2">Company</span>}>
              <NavDropdown.Item href="/Companies">Companies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/companyListing">Company List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/AddNewCompany">Add new company</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span className="ms-2">Product</span>}>
            <NavDropdown.Item href="/AddNewItem">Add New Product</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Import">Import</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Export">Export</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/buy">Buy TEST</Nav.Link>
        
            <Nav.Link href="/SignUp">Sign Up</Nav.Link>
            <Nav.Link href="/SignIn">Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
