import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "./SignUp.css";

export const SignUp = () => {
  // function onChange(value) {
  //   console.log("Capthca value:", value);
  // }

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordAgain: "",
    phone_number: "",
    country: "",
    gender: "",
    agreementss: "",
    captcha: "",
  });
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordAgain, setPasswordAgain] = useState("");
  // const [phone_number, setPhoneNumber] = useState("");
  // const [country, setCountry] = useState("");
  // const [gender, setGender] = useState("");
  // const [agreementss, setAgreementss] = useState("");
  // const [captcha, setCaptcha] = useState("");

  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await axios.post("http://127.0.0.1:8000/api/register", {
  //       name,
  //       surname,
  //       email,
  //       password,
  //       passwordAgain,
  //       phone_number,
  //       country,
  //       gender,
  //       agreementss,
  //       captcha,
  //     });

  //     setName("");
  //     setSurname("");
  //     setEmail("");
  //     setPassword("");
  //     setPasswordAgain("");
  //     setPhoneNumber("");
  //     setCountry("");
  //     setGender("");
  //     setAgreementss("");
  //     setCaptcha("");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = (formValues) => {
    let errors = {};

    // Check if name is empty
    if (!formValues.name) {
      errors.name = "Name is required";
    }
    // Check if name is empty
    if (!formValues.surname) {
      errors.surname = "Surname is required";
    }

    // Check if email is empty or invalid format
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }

    // Check if password is empty or has less than 6 characters
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Check if password and passwordAgain match
    if (formValues.password !== formValues.passwordAgain) {
      errors.passwordAgain = "Passwords do not match";
    }

    // Check if number is empty or has less than 10 digits
    if (!formValues.phone_number) {
      errors.phone_number = "Number is required";
    } else if (!/^\d{10}$/.test(formValues.phone_number)) {
      errors.phone_number = "Number must have 10 digits";
    }

    // Check if country is empty
    if (!formValues.country) {
      errors.country = "Country is required";
    }

    // Check if gender is empty
    if (!formValues.gender) {
      errors.gender = "Gender is required";
    }

    // Check if terms is unchecked
    if (!formValues.agreementss) {
      errors.agreementss = "You must accept the terms and conditions";
    }
    if (!formValues.captcha) {
      errors.captcha = "Please complete the reCAPTCHA verification";
    }
    return errors;
  };  
  function handleCaptchaChange(value) {
    setFormValues({ ...formValues, captcha: value });
    if (value) {
      setErrors({ ...errors, captcha: "" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    const errors = validate(formValues);

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // Submit form
      console.log("Form submitted successfully!");
      navigate("/components/modifyItem");
    } else {
      // Update errors state
      setErrors(errors);
    }
  };

  return (
    <div className="container ">
      <Form
        onSubmit={handleSubmit}
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
              placeholder="Name "
              className="mb-2"
              onChange={handleChange}
              // onChange={(e) => setName(e.target.value)}
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
              className="mb-2"
              // onChange={(e) => setSurname(e.target.value)}
              onChange={handleChange}
            />
            {errors.surname && (
              <Form.Text className="text-danger">{errors.surname}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="E-mail*"
              className="mb-2"
              name="email"
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
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
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
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
              // onChange={(e) => setPasswordAgain(e.target.value)}
              onChange={handleChange}
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
              value={formValues.phone_number}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              onChange={handleChange}
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
              value={formValues.country}
              onChange={handleChange}
              // onChange={(e) => setCountry(e.target.value)}
            >
              <option value={""}>Select Country</option>
              <option value={"Albania"}>Albania</option>
              <option value={"Kosovo"}>Kosovo</option>
            </Form.Select>{" "}
            {errors.country && (
              <Form.Text className="text-danger">{errors.country}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="gender">Gender </Form.Label>
            <Form.Check
              name="gender"
              inline
              type="radio"
              value={"Male"}
              label="Male"
              // onChange={(e) => setGender(e.target.value)}
              onChange={handleChange}
            />
            <Form.Check
              name="gender"
              // onChange={(e) => setGender(e.target.value)}
              onChange={handleChange}
              inline
              value={"Female"}
              type="radio"
              label="Female"
            />
            {errors.gender && (
              <Form.Text className="text-danger">{errors.gender}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check
              name="agreementss"
              // onChange={(e) => setAgreementss(e.target.value)}
              onChange={handleChange}
              className="mb-2"
              inline
              label="I have read and understood Membership Classification Text"
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
            />
            {errors.captcha && (
              <Form.Text className="text-danger">{errors.captcha}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Button
              variant="info"
              className="sign-up-button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <p className="mt-3 ">
              If you have an account
              <Link className=" p-2" to={"/components/modifyItem"}>
                Sign In
              </Link>
            </p>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};
