import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
// import { useTranslation } from "react-i18next";
import "./SignUp.css";
//import { checkIfLoggedIn } from "./checkIfLoggedIn";
import container from "./containers.png";
import mobilecontainer from "./mobilecontainers.png";

import { useMediaQuery } from "react-responsive";

axios.defaults.withCredentials = true;

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_number:"",
    captcha: null,
    prefix: "",
    type: "",
  });
  const [captchaFilled, setCaptchaFilled] = useState(false);
  const { type } = useParams();
  const [prefixOptions, setPrefixOptions] = useState([]);
  const handleCaptchaChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      captcha: value,
    }));
    setCaptchaFilled(true);
  };
  const isMobile = useMediaQuery({ query: "(max-width :430px)" });

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      type: type,
    }));
  }, [type]);

  useEffect(() => {
    const fetchPrefixOptions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/prefix");
        setPrefixOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrefixOptions();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
console.log(formValues)
    if (!captchaFilled) {
      alertify.error("Please complete the captcha.");
      return;
    }

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
      console.log(response.data);
      console.log(response.status);

      if (response.status === 201) {
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("userName", formValues.name);
        localStorage.setItem("userSurname", formValues.surname);
        localStorage.setItem("userEmail", formValues.email);
        localStorage.setItem("userPhone", formValues.phone_number);
        localStorage.setItem("userGender", formValues.gender);

        localStorage.setItem("userId", response.data.id);

        localStorage.setItem("userCompany", response.data.company_id);
        localStorage.setItem("userCountry", response.data.country_id);

        navigate("/AddNewCompany");
        alertify.success("Welcome!");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        alertify.error("Email already exists");
      }
      if (error.response.status === 500) {
        alertify.error("Something went wrong");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="grid-container">
      <div className="grid-item portal-info">
        {isMobile ? (
          <></>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="236"
            height="33"
            viewBox="0 0 236 33"
            fill="none"
          >
            <path
              d="M32.7632 16.4445V27.1043L26.0232 15.0126L23.0832 9.82189L20.4832 5.12838L10.3832 23.087L7.50317 17.9361L17.1032 0.554199H23.8632L32.7632 16.4445Z"
              fill="#FEFEFE"
            />
            <path
              d="M26.0232 15.0125L16.4032 32.3745H9.64318L0.763184 16.5439V5.92383L7.50318 17.936L10.3832 23.087L13.0232 27.8003L23.0832 9.82183L26.0232 15.0125Z"
              fill="#FEFEFE"
            />
            <path
              d="M63.4831 6.22243H52.3031V11.97H62.3031V15.1321H52.3031V20.9394H63.7831V24.1214H48.7031V3.02051H63.5031V6.20255L63.4831 6.22243Z"
              fill="#FEFEFE"
            />
            <path
              d="M68.7433 8.80713L73.0432 14.0376L77.3232 8.80713H81.3632L75.0432 16.4042L81.4632 24.1406H77.3832L72.9832 18.7709L68.6233 24.1406H64.5833L71.0032 16.444L64.6833 8.82702H68.7633L68.7433 8.80713Z"
              fill="#FEFEFE"
            />
            <path
              d="M91.8232 24.5187C89.5032 24.5187 87.6032 23.5641 86.5632 21.814V30.2663H83.0632V8.80742H86.5632V11.1144C87.6032 9.36428 89.5032 8.40967 91.8232 8.40967C96.1832 8.40967 99.3632 11.9497 99.3632 16.4642C99.3632 20.9787 96.1832 24.5386 91.8232 24.5386V24.5187ZM91.2832 11.4127C88.5432 11.4127 86.5632 13.3617 86.5632 16.4443C86.5632 19.5269 88.5832 21.4958 91.2832 21.4958C93.9832 21.4958 96.0232 19.2883 96.0232 16.4443C96.0232 13.6004 94.0832 11.4127 91.2832 11.4127Z"
              fill="#FEFEFE"
            />
            <path
              d="M109.323 8.40949C113.943 8.32994 117.583 11.9495 117.503 16.464C117.583 20.9785 113.943 24.618 109.323 24.5385C104.603 24.5385 101.143 21.0979 101.143 16.464C101.143 11.8302 104.603 8.40949 109.323 8.40949ZM109.323 11.4523C106.463 11.4523 104.463 13.64 104.463 16.4441C104.463 19.2483 106.463 21.4757 109.323 21.4757C112.183 21.4757 114.143 19.2881 114.143 16.4441C114.143 13.6002 112.183 11.4523 109.323 11.4523Z"
              fill="#FEFEFE"
            />
            <path
              d="M129.803 11.9298C129.403 11.7906 128.823 11.6912 128.043 11.6912C126.743 11.6912 125.643 12.1287 124.803 13.0038C123.963 13.8589 123.563 14.9528 123.563 16.3051V24.1011H120.063V8.78757H123.563V11.5122C124.343 9.68252 126.023 8.48926 128.103 8.48926C128.823 8.48926 129.403 8.56881 129.803 8.72791V11.9099V11.9298Z"
              fill="#FEFEFE"
            />
            <path
              d="M143.283 23.5843C142.443 24.161 140.963 24.5389 139.563 24.5389C135.783 24.5389 133.863 22.4109 133.863 18.1947V11.8505H130.483V8.82757H133.863V4.69092H137.363V8.82757H142.763V11.8505H137.363V18.135C137.363 20.3426 138.223 21.4762 139.963 21.4762C140.923 21.4762 141.763 21.2773 142.483 20.8398L143.283 23.6042V23.5843Z"
              fill="#FEFEFE"
            />
            <path
              d="M159.063 17.3795H155.303V24.1413H151.723V3.02051H159.063C164.703 3.02051 168.023 5.94401 168.023 10.1801C168.023 14.4162 164.703 17.3596 159.063 17.3596V17.3795ZM159.063 6.20255H155.303V14.1974H159.063C162.643 14.1974 164.463 12.7655 164.463 10.2C164.463 7.63446 162.643 6.20255 159.063 6.20255Z"
              fill="#FEFEFE"
            />
            <path
              d="M177.363 8.40949C181.983 8.32994 185.623 11.9495 185.543 16.464C185.623 20.9785 181.983 24.618 177.363 24.5385C172.643 24.5385 169.183 21.0979 169.183 16.464C169.183 11.8302 172.643 8.40949 177.363 8.40949ZM177.363 11.4523C174.503 11.4523 172.503 13.64 172.503 16.4441C172.503 19.2483 174.503 21.4757 177.363 21.4757C180.223 21.4757 182.183 19.2881 182.183 16.4441C182.183 13.6002 180.223 11.4523 177.363 11.4523Z"
              fill="#FEFEFE"
            />
            <path
              d="M197.843 11.9298C197.443 11.7906 196.863 11.6912 196.083 11.6912C194.783 11.6912 193.683 12.1287 192.843 13.0038C192.003 13.8589 191.603 14.9528 191.603 16.3051V24.1011H188.103V8.78757H191.603V11.5122C192.383 9.68252 194.063 8.48926 196.143 8.48926C196.863 8.48926 197.443 8.56881 197.843 8.72791V11.9099V11.9298Z"
              fill="#FEFEFE"
            />
            <path
              d="M211.323 23.5843C210.483 24.161 209.003 24.5389 207.603 24.5389C203.823 24.5389 201.903 22.4109 201.903 18.1947V11.8505H198.523V8.82757H201.903V4.69092H205.403V8.82757H210.803V11.8505H205.403V18.135C205.403 20.3426 206.263 21.4762 208.003 21.4762C208.963 21.4762 209.803 21.2773 210.523 20.8398L211.323 23.6042V23.5843Z"
              fill="#FEFEFE"
            />
            <path
              d="M228.743 8.80729V24.1209H225.283V21.794C224.243 23.5441 222.343 24.5186 220.023 24.5186C215.663 24.5186 212.483 21.0184 212.483 16.4442C212.483 11.87 215.663 8.38965 220.023 8.38965C222.343 8.38965 224.243 9.36415 225.283 11.1143V8.7874H228.743V8.80729ZM220.563 11.4325C217.723 11.4325 215.803 13.6201 215.803 16.4641C215.803 19.308 217.743 21.5156 220.563 21.5156C223.383 21.5156 225.243 19.5268 225.243 16.4641C225.243 13.4014 223.303 11.4325 220.563 11.4325Z"
              fill="#FEFEFE"
            />
            <path
              d="M235.703 24.121H232.203V2.66211H235.703V24.121Z"
              fill="#FEFEFE"
            />
          </svg>
        )}

        <div className="ad-text">
          <p className="header-text">
            Unlock a world of opportunities in international trade
          </p>
          <p className="subheader-text">
            Dedicated to connecting businesses and entrepreneurs from around the
            world
          </p>
        </div>
        {isMobile ? (
          <img
            src={mobilecontainer}
            alt="container"
            className="bottom-containers"
          />
        ) : (
          <img src={container} alt="container" className="bottom-containers" />
        )}
      </div>
      <div className="grid-item portal-signup">
        <div className="signup-text">
          <h1 className="signup-t">Sign Up</h1>
          <h1 className="signup-ad">Register, Empower your experience,</h1>
        </div>
        <div className="signup-form">
          <label className="labels">Name*</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={formValues.name}
            name="name"
            placeholder="Name"
            className="input-signup"
          />
          <label className="labels">Email*</label>
          <input
            type="text"
            placeholder="email@domain.com"
            className="input-signup"
            onChange={handleInputChange}
            value={formValues.email}
            name="email"
          />
          <div className="passwordContainer">
            <label className="labels">Password*</label>
            <input
              type={showPassword ? "text" : "password"}
              id="passwordInput"
              placeholder="Enter Password"
              className="input-signup"
              onChange={handleInputChange}
              value={formValues.password}
              name="password"
            />
            <span className="icon" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M20 18.6751C20.5787 18.6751 21.1336 18.9049 21.5428 19.3141C21.9519 19.7233 22.1818 20.2782 22.1818 20.8569C22.1818 21.4355 21.9519 21.9905 21.5428 22.3997C21.1336 22.8088 20.5787 23.0387 20 23.0387C19.4213 23.0387 18.8664 22.8088 18.4572 22.3997C18.0481 21.9905 17.8182 21.4355 17.8182 20.8569C17.8182 20.2782 18.0481 19.7233 18.4572 19.3141C18.8664 18.9049 19.4213 18.6751 20 18.6751ZM20 15.4023C23.6364 15.4023 26.7418 17.6642 28 20.8569C26.7418 24.0496 23.6364 26.3114 20 26.3114C16.3636 26.3114 13.2582 24.0496 12 20.8569C13.2582 17.6642 16.3636 15.4023 20 15.4023ZM13.5855 20.8569C14.1733 22.0571 15.086 23.0683 16.22 23.7756C17.3539 24.4829 18.6636 24.8578 20 24.8578C21.3364 24.8578 22.6461 24.4829 23.78 23.7756C24.914 23.0683 25.8267 22.0571 26.4145 20.8569C25.8267 19.6567 24.914 18.6454 23.78 17.9382C22.6461 17.2309 21.3364 16.8559 20 16.8559C18.6636 16.8559 17.3539 17.2309 16.22 17.9382C15.086 18.6454 14.1733 19.6567 13.5855 20.8569Z"
                    fill="#FF0000"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M20 18.6751C20.5787 18.6751 21.1336 18.9049 21.5428 19.3141C21.9519 19.7233 22.1818 20.2782 22.1818 20.8569C22.1818 21.4355 21.9519 21.9905 21.5428 22.3997C21.1336 22.8088 20.5787 23.0387 20 23.0387C19.4213 23.0387 18.8664 22.8088 18.4572 22.3997C18.0481 21.9905 17.8182 21.4355 17.8182 20.8569C17.8182 20.2782 18.0481 19.7233 18.4572 19.3141C18.8664 18.9049 19.4213 18.6751 20 18.6751ZM20 15.4023C23.6364 15.4023 26.7418 17.6642 28 20.8569C26.7418 24.0496 23.6364 26.3114 20 26.3114C16.3636 26.3114 13.2582 24.0496 12 20.8569C13.2582 17.6642 16.3636 15.4023 20 15.4023ZM13.5855 20.8569C14.1733 22.0571 15.086 23.0683 16.22 23.7756C17.3539 24.4829 18.6636 24.8578 20 24.8578C21.3364 24.8578 22.6461 24.4829 23.78 23.7756C24.914 23.0683 25.8267 22.0571 26.4145 20.8569C25.8267 19.6567 24.914 18.6454 23.78 17.9382C22.6461 17.2309 21.3364 16.8559 20 16.8559C18.6636 16.8559 17.3539 17.2309 16.22 17.9382C15.086 18.6454 14.1733 19.6567 13.5855 20.8569Z"
                    fill="#A8ADB4"
                  />
                </svg>
              )}
            </span>
          </div>

          <label className="labels">Phone Number*</label>
<div class="form-row">
  <select
    id="prefix"
    name="prefix"
    className="input-number-dropdown"
    value={formValues.prefix}
    onChange={handleInputChange}
  >
    {prefixOptions.map((option) => (
      <option key={option.prefix} value={option.prefix}>
       {option.prefix} {option.country} 
      </option>
    ))}
  </select>
  <input
    type="text"
    id="phone"
    className="input-number"
    placeholder="Enter phone number"
    onChange={handleInputChange}
    value={formValues.phone_number}
    name="phone_number"
  />
</div>


        </div>

        <ReCAPTCHA
          className="justify-content-center d-flex"
          sitekey="6LfQG6IlAAAAAI3gpbAOJm40Ql1BwD7G9DhtAQh1"
          onChange={handleCaptchaChange}
          value={formValues.captcha}
        />
        <div className="agreement-section">
          <span className="agreement">
            By selecting Create Account, you agree to{" "}
            <a href="/terms">Our Terms</a> and have read and acknowledged our{" "}
            <a href="/terms">Global Privacy Statement.</a>
          </span>
          <div className="signup-button" onClick={handleRegister}>
            Create Account
          </div>
          <p className="agreement">
            Already have an account?
            <a href="/signin"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
