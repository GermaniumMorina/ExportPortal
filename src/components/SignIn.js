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



  const handleSubmit = (ev) => {
      ev.preventDefault();

   
          axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
              axios
                  .post("http://localhost:8000/api/login", {
                    email,
                    password
                  })
                  .then((response) => {
                       //set response in local storage
                       localStorage.setItem('user', JSON.stringify(response.data))
                  })
                  .catch(function (error) {
                      console.error(error);
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
