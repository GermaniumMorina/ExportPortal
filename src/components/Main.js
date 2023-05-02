import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";


import { checkIfLoggedIn } from "./checkIfLoggedIn";

import { SignIn } from "./SignIn";
const Main = () => {
  const isLoggedIn = checkIfLoggedIn();
  return (

    <div>
      {isLoggedIn ? (
        <>
          <div>You are Logged in</div>
          <Form onSubmit={handleSubmit}>
            <Button className="sign-in-button" variant="info" type="submit">
              Logout
            </Button>
          </Form>
        </>
      ) : (
        <SignIn />
      )}
    </div>

  )
}
export default Main;


const handleSubmit = (ev) => {
  ev.preventDefault();

  axios
    .post("http://localhost:8000/api/logout")
    .then((response) => {
      console.log(response);
      //set response in local storage
      //  localStorage.setItem('user', JSON.stringify(response.data))
      if (response.status === 200) {
        localStorage.clear();
        window.location.href = '/';
      }

    })
    .catch(function (error) {
      console.error(error);
    });
};