import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.png";
import "./NavBar.css";
function NavBar() {
  return (
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

          <Nav className="me-auto" >
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
