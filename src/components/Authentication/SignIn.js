import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./SignIn.css";

import { Link } from "react-router-dom";

import { useState, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = document.cookie;


  const navigate = useNavigate();



  const handleSubmit = (ev) => {
    ev.preventDefault();
     axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .post("http://localhost:8000/api/login", {
          email,
          password
        })
        .then((response) => {
          console.log(response);
          //set response in local storage
          //  localStorage.setItem('user', JSON.stringify(response.data))
          if (response.status === 200) {
            localStorage.setItem('userName', response.data.user.name)
            localStorage.setItem('userEmail', response.data.user.email)
            localStorage.setItem('userLoggedIn', true)
            localStorage.setItem('userId', response.data.user.id)
            localStorage.setItem('userRole', response.data.user.role)
            localStorage.setItem('token' , token)
            window.alert("Login Successful");
            navigate("/dashboard");

          }
          
          

        })
        .catch(function (error) {
          console.error(error);
            window.alert("Authentication Failed");

        });
    });

  };

  return (
    <div className="d-flex justify-content-center">
      <div className="form-div" id="base">
        <h2 className="welcome">Welcome</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              type="email"
              placeholder="Enter email or username"

              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              type="password"
              placeholder="Password"
           
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forgot-password">
              {" "}
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </p>
          </Form.Group>

          <Button className="sign-in-button" variant="info" type="submit">
            Submit
          </Button>

          <p className="sign-up-prompt">
            If you dont have a membership yet, <Link to="/SignUp">Sign Up</Link>
          </p>

          <Button className="activate-button" variant="success" type="submit">
            Activate
          </Button>
        </Form>
      </div>
    </div>
  );
};
