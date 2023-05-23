import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "./Navigation/NavBar";
import { Navigate } from "react-router-dom";
import { checkIfLoggedIn } from "./Authentication/checkIfLoggedIn";


const Main = () => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };
  
 


  const isLoggedIn = checkIfLoggedIn();
  const user = (localStorage.getItem('userName'));
  return (

    <div>
      {isLoggedIn ? (
        <>
        <NavBar />
          <div>You are Logged in {user}</div>
          <Form onSubmit={handleSubmit}>
            <Button className="sign-in-button" variant="info" type="submit" style={{ width: "10%" }}>
              Logout
            </Button>
          </Form>
        </>
      ) : (
        <Navigate to = "/SignIn"></Navigate>
)}
    </div>

  )
}
export default Main;


