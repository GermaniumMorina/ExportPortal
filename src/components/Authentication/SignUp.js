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
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone_number: "",
    country_id: "",
    gender: "",
    agreementss: false,
    captcha: null,
  });
  const [countryList, setCountryList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleCaptchaChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      captcha: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const data = JSON.stringify(formValues);

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
    setFormValues((prevValues) => ({
      ...prevValues,
      agreementss: e.target.checked,
    }));
  };

  const handleCountryChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      country_id: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validate = () => {
    let errors = {};

    if (!formValues.name) {
      errors.name = "Name is required";
    }
    if (!formValues.surname) {
      errors.surname = "Surname is required";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (formValues.password !== formValues.passwordAgain) {
      errors.passwordAgain = "Passwords do not match";
    }
    if (!formValues.phone_number) {
      errors.phone_number = "Number is required";
    }
    if (!formValues.country_id) {
      errors._id = "Country is required";
    }
    if (!formValues.gender) {
      errors.gender = "Gender is required";
    }
    if (!formValues.agreementss) {
      errors.agreementss = "You must accept the terms and conditions";
    }
    if (!formValues.captcha) {
      errors.captcha = "Please complete the reCAPTCHA verification";
    }
    return errors;
  };
  return (
    <div className="container">
      <Form
        onSubmit={handleRegister}
        className="justify-content-center mt-5 mb-5"
      >
        <div
          id="form"
          className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-5 border border-dark"
        >
          <h5 className="p-2">Sign Up For Free</h5>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              value={formValues.name}
              placeholder="Name"
              className="mb-2"
              onChange={handleInputChange}
            />
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Surname"
              value={formValues.surname}
              className="mb-2"
              onChange={handleInputChange}
            />
            {errors.surname && (
              <Form.Text className="text-danger">{errors.surname}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="E-mail"
              value={formValues.email}
              className="mb-2"
              name="email"
              onChange={handleInputChange}
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
              value={formValues.password}
              name="password"
              onChange={handleInputChange}
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
              value={formValues.passwordAgain}
              onChange={handleInputChange}
            />
            {errors.passwordAgain && (
              <Form.Text className="text-danger">
                {errors.passwordAgain}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="tel"
              placeholder="Phone Number"
              className="mb-2"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleInputChange}
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
              name="country_id"
              value={formValues.country_id}
              onChange={handleInputChange}
            >
              <option>Select country</option>
              {countryList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country}
                </option>
              ))}
            </Form.Select>
            {errors.country && (
              <Form.Text className="text-danger">{errors.country}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="gender">Gender</Form.Label>
            <Form.Check
              type="radio"
              name="gender"
              id="male"
              label="Male"
              inline
              value="male"
              checked={formValues.gender === "male"}
              onChange={handleInputChange}
            />

            <Form.Check
              type="radio"
              name="gender"
              id="female"
              label="Female"
              inline
              value="female"
              checked={formValues.gender === "female"}
              onChange={handleInputChange}
            />
            {errors.gender && (
              <Form.Text className="text-danger">{errors.gender}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I have read and understood Membership Classification Text"
              checked={formValues.agreementss}
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
              className="justify-content-center d-flex"
              sitekey="6LfQG6IlAAAAAI3gpbAOJm40Ql1BwD7G9DhtAQh1"
              onChange={handleCaptchaChange}
              value={formValues.captcha}
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
            <p className="mt-3">
              If you have an account
              <Link className="p-2" to={"/SignIn"}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};
