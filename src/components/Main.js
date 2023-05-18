import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import NavBar from "./Navigation/NavBar";
import NotAllowed from "./Authentication/NotAllowed";
import { checkIfLoggedIn } from "./Authentication/checkIfLoggedIn";

const Main = () => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
  
    axios
      .post("http://localhost:8000/api/logout", null, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'x-csrf-token': csrfToken,
        }
      })
      .then((response) => {
        console.log(response);
        // Set response in local storage
        // localStorage.setItem('user', JSON.stringify(response.data))
        if (response.status === 200) {
          localStorage.clear();
          window.location.href = '/';
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  const csrfToken = document.cookie;


  const isLoggedIn = checkIfLoggedIn();
  const user = (localStorage.getItem('userName'));
  return (

    <div>
      {isLoggedIn ? (
        <>
        <NavBar />
          <div>You are Logged in {user}</div>
          <Form onSubmit={handleSubmit}>
            <Button className="sign-in-button" variant="info" type="submit" >
              Logout
            </Button>
          </Form>
        </>
      ) : (
        <NotAllowed />
)}
    </div>

  )
}
export default Main;


