import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import "./SignUp.css";
axios.defaults.withCredentials = true;

export const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [agreementss, setAgreementss] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const data = JSON.stringify({
        name,
        surname,
        email,
        password,
        passwordAgain,
        phone_number,
        country_id: country,
        gender,
        agreementss,
      });
  
      try {
        // Request the CSRF cookie first
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  
        // Get the CSRF token from the cookie
        const csrfToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("XSRF-TOKEN"))
          .split("=")[1];
  
        // Include the CSRF token in the headers
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-XSRF-TOKEN": csrfToken, // Add this line
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          localStorage.setItem("userLoggedIn", true);
          navigate("/AddNewCompany");
          window.alert("Welcome to the system");
        }
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      setErrors(errors);
    }
  };

  const getCountry = async () => {
    const ApiCountry = await axios.get("http://127.0.0.1:8000/api/country");
    setCountryList(ApiCountry.data.data);
   
  };
  useEffect(() => {
    getCountry();
  }, []);

  const handleAgreementCheck = (e) => {
    setAgreementss(e.target.checked);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
   
  };

  const validate = () => {
    let errors = {};
  
    switch (!name) {
      case true:
        errors.name = "Name is required";
        break;
    }
  
    switch (!surname) {
      case true:
        errors.surname = "Surname is required";
        break;
    }
  
    switch (!email) {
      case true:
        errors.email = "Email is required";
        break;
      case !/\S+@\S+\.\S+/.test(email):
        errors.email = "Email is invalid";
        break;
    }
  
    switch (!password) {
      case true:
        errors.password = "Password is required";
        break;
      case password.length < 8:
        errors.password = "Password must be at least 8 characters long";
        break;
    }
  
    switch (password !== passwordAgain) {
      case true:
        errors.passwordAgain = "Passwords do not match";
        break;
    }
  
    switch (!phone_number) {
      case true:
        errors.phone_number = "Number is required";
        break;
    }
  
    switch (!country) {
      case true:
        errors.country = "Country is required";
        break;
    }
  
    switch (!gender) {
      case true:
        errors.gender = "Gender is required";
        break;
    }
  
    switch (!agreementss) {
      case true:
        errors.agreementss = "You must accept the terms and conditions";
        break;
    }
  
    switch (!captcha) {
      case true:
        errors.captcha = "Please complete the reCAPTCHA verification";
        break;
    }
  
    return errors;
  };
  
  return (
    <div className="container ">
      <Form
        onSubmit={handleRegister}
        className="justify-content-center mt-5  mb-5"
      >
        <Form.Group
          id="form"
          className=" col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-5  border border-dark  "
          controlId="exampleForm.ControlInput1"
        >
          <h5 className="p-2">Sign Up For Free</h5>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Name "
              className="mb-2"
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="surname"
              placeholder=" Surname*"
              value={surname}
              className="mb-2"
              onChange={(e) => setSurname(e.target.value)}
            />
            {errors.surname && (
              <Form.Text className="text-danger">{errors.surname}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="E-mail*"
              value={email}
              className="mb-2"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              className="mb-2"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password (again)"
              name="passwordAgain"
              className="mb-2"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            {errors.passwordAgain && (
              <Form.Text className="text-danger">
                {errors.passwordAgain}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              className="mb-2"
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phone_number && (
              <Form.Text className="text-danger">
                {errors.phone_number}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Select
              className="mb-2"
              name="country"
              value={country}
              onChange={handleCountryChange}
            >
              <option>Select country</option>
              {countryList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country}
                </option>
              ))}
              {errors.country && (
                <Form.Text className="text-danger">{errors.country}</Form.Text>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="gender">Gender </Form.Label>
            <Form.Check
              type="radio"
              name="gender"
              id="male"
              label="Male"
              inline
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />

            <Form.Check
              type="radio"
              name="gender"
              id="female"
              label="Female"
              inline
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            {errors.gender && (
              <Form.Text className="text-danger">{errors.gender}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I have read and understood Membership Classification Text"
              checked={agreementss}
              onChange={handleAgreementCheck}
              className="mb-2"
            />
            {errors.agreementss && (
              <Form.Text className="text-danger">
                {errors.agreementss}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <ReCAPTCHA
              className="justify-content-center d-flex "
              sitekey="6LfQG6IlAAAAAI3gpbAOJm40Ql1BwD7G9DhtAQh1"
              onChange={handleCaptchaChange}
              value={captcha}
            />
            {errors.captcha && (
              <Form.Text className="text-danger">{errors.captcha}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Button variant="info" className="sign-up-button" type="submit">
              Sign Up
            </Button>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <p className="mt-3 ">
              If you have an account
              <Link className=" p-2" to={"/SignIn"}>
                Sign In
              </Link>
            </p>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};
