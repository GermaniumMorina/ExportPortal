import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./SignIn.css";

import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "./checkIfLoggedIn";

export const SignIn = () => {
let token = null;
  const getCSRFToken = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  
    token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN'))
    .split('=')[1];
  
  localStorage.setItem('token', token);
  

    return token;
  };
  
  console.log(token);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
   const handleSubmit = async (e) => {
  e.preventDefault();

  const token = await getCSRFToken();

  const data = JSON.stringify({
    email,
    password,
  });

  await axios.post('http://localhost:8000/api/login', data, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token,
    },
  });

  localStorage.setItem('token', token);
if(checkIfLoggedIn()){
  navigate('/');
};
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
