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
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        setList(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get CSRF token
    await axios.get("http://localhost:8000/user/");

    // Send login request
    const response = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });
    console.log("response", response);
    // Set cookie
    // document.cookie = `token=${response.data.token}; path=/`;
    localStorage.setItem("token", response.data.token);
    console.log("token:", response.data.token);
    // Redirect to homepage
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
