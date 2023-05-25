import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';  // Import Dropdown components here
import logo from "./logo.png";
import avatar from "./avatar.jpg";
import "./NavBar.css";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import React, { useState, useEffect } from "react"; // Import useState here
import axios from "axios";
import { BsCurrencyExchange } from "react-icons/bs";


function NavBar() {
  const isLoggedIn = checkIfLoggedIn();
  const user = localStorage.getItem("userName");
  const tokens = localStorage.getItem("tokens");
  const userId = localStorage.getItem("userId");
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const toggle = () => setDropdownOpen(prevState => !prevState);  


  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [message, setMessage] = useState('');
    
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Notify/${userId}`);
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          // Filter notifications by notifiable_id
          const userNotifications = response.data.filter(notification => {
            const notificationData = JSON.parse(notification.data);
            return notificationData.notifiable_id == userId;
          });
  
          console.log(userNotifications);
          setNotifications(userNotifications);
  
          // Count unread notifications
          let unread = 0;
          userNotifications.forEach(notification => {
            if (!notification.read_at) { unread++; } // assuming read_at is null for unread notifications
          });
          setUnreadCount(unread);
  
          setMessage(''); // Clear the message if notifications are present
        } else {
          console.log("No notifications found.");
          setNotifications([]);
          setUnreadCount(0);
  
          setMessage('No new notifications.'); // Set the message when no notifications are found
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchNotifications();
  }, [userId]);


  const handleTokens = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/token/${userId}`
    );
    console.log(response.data.amount);
    localStorage.setItem("tokens", response.data.amount);
  };

  useEffect(() => {
    handleTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <Nav className="me-auto">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle 
        caret 
        tag="span" 
        style={{ position: 'relative' }} // Inline styling added here
      >
        <span role="img" aria-label="bell">🔔</span>
        {unreadCount > 0 && 
          <span 
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'red',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            {unreadCount}
          </span>
        }
      </DropdownToggle>
        <DropdownMenu>
          <p>{message}</p>
          {notifications.map((notification, index) => {
            const notificationData = JSON.parse(notification.data);
            return (
              <DropdownItem key={index}>
                <p>{`${notificationData['Full Name']} is interested in your product: ${notificationData['Product']}`}</p>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
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
