import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import "./SignUp.css";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [country, setCountry] = useState([]);
  const [countryList, setCountryList] = useState("");
  const [gender, setGender] = useState("");
  const [agreementss, setAgreementss] = useState(false);
 
  const [captcha, setCaptcha] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      name,
      surname,
      email,
      password,
      passwordAgain,
      phone_number,
      countryList,
     
      gender,
      agreementss,
      
    });
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getCountry = async () => {
    const ApiCountry = await axios.get("http://127.0.0.1:8000/api/country");
    setCountry(ApiCountry.data.data);
    console.log(ApiCountry);
  };
  useEffect(() => {
    getCountry();
  }, []);

  const [errors, setErrors] = useState({});

  const handleAgreementCheck = (e) => {
    setAgreementss(e.target.checked);
  };
  function handleCountryChange(event) {
    setCountryList(event.target.value);
   
  }
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
              // onChange={handleChange}
              onChange={(e) => setName(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="surname"
              placeholder=" Surname*"
              value={surname}
              className="mb-2"
              onChange={(e) => setSurname(e.target.value)}
              // onChange={handleChange}
            />
            
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="E-mail*"
              value={email}
              className="mb-2"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange}
            />
           
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              className="mb-2"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              // onChange={handleChange}
            />
           
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password (again)"
              name="passwordAgain"
              className="mb-2"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              // onChange={handleChange}
            />
           
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              className="mb-2"
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              // onChange={handleChange}
            />
            
          </Form.Group>
          <Form.Group>
            <Form.Select
              className="mb-2"
              name="country"
              value={countryList}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>

              {country.map((c) => (
                <option value={c.country}>{c.country}</option>
              ))}
            </Form.Select>
            

            
          </Form.Group>
          <Form.Group>
            <Form.Label className="gender">Gender </Form.Label>
            <Form.Check
              name="Male"
              inline
              type="radio"
              label="Male"
              onChange={(e) => setGender(e.target.value)}
              // onChange={handleChange}
            />
            <Form.Check
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              // onChange={handleChange}
              inline
              type="radio"
              label="Female"
            />
           
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I have read and understood Membership Classification Text"
              checked={agreementss}
              onChange={handleAgreementCheck}
              className="mb-2"
            />

           
          </Form.Group>
          <Form.Group>
            <ReCAPTCHA
              className="justify-content-center d-flex "
              sitekey="6LfQG6IlAAAAAI3gpbAOJm40Ql1BwD7G9DhtAQh1"
              // onChange={handleCaptchaChange}
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
