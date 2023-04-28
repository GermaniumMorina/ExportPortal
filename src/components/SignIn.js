import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./SignIn.css";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "./checkIfLoggedIn";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setList] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/users")
  //     .then((response) => {
  //       setList(response.data);
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

//     // Get CSRF token
//     const token = await axios.get("http://localhost:8000/sanctum/csrf-cookie");
// const csrfToken = token.data;


    // Extract token from response

    // Send login request
    const data = ({
      email,
      password,
    });
    
    // localStorage.setItem("token", csrfToken);

    await axios.post("http://127.0.0.1:8000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
          
          "Accept": "*/*",
       
        },
      }).then(function(response) {
        console.log(response)
        alert('Form Submitted')
          });
    
    // Check if user is logged in and redirect to home page
    if (checkIfLoggedIn()) {
      navigate("/");
    }
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
              value={password}
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
