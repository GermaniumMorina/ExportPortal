import React from "react";
import "./SignIn.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import maskImg from "./Maskgroup.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    showPlaceholder: true,
  });

  const token = document.cookie;
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log(response);
          //set response in local storage
          //  localStorage.setItem('user', JSON.stringify(response.data))
          if (response.status === 200) {
            localStorage.setItem("userName", response.data.user.name);
            localStorage.setItem("userEmail", response.data.user.email);
            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userRole", response.data.user.role);
            localStorage.setItem("token", token);
            localStorage.setItem("Bearer", response.data.token);
            localStorage.setItem("userGender", response.data.user.gender);
            localStorage.setItem("userSurname", response.data.user.surname);
            localStorage.setItem("userPhone", response.data.user.phone_number);
            localStorage.setItem("otherUserId", response.data.user.id); // Update userId in localStorage
            localStorage.setItem("otherUserName", response.data.user.name); // Update userName in localStorage
            localStorage.setItem("otherUserEmail", response.data.user.email); // Update userEmail in localStorage

            const language_Id = response.data.language_id;

            let language;

            switch (language_Id) {
              case 1:
                language = "en";
                break;
              case 2:
                language = "es";
                break;
              case 3:
                language = "al";
                break;
              default:
                language = "en";
                break;
            }

            localStorage.setItem("language_Id", language_Id);
            localStorage.setItem("language", language);
            i18n.changeLanguage(language);
            alertify.success("Welcome Back!");
            navigate("/dashboard");
          }
        })
        .catch(function (error) {
          console.error(error);
          alertify.warning("Authentication Failed");
        });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleClickInput = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPlaceholder: false,
    }));
  };

  const handleOutsideClick = (event) => {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    if (emailInput && !emailInput.contains(event.target)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        showPlaceholder: true,
      }));
    }

    if (passwordInput && !passwordInput.contains(event.target)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        showPlaceholder: true,
        showPassword: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };
  return (
    <div className="loginContainer">
      <div className="innerContainer">
        <div className="brochure">
          <div className="innerBrochure">
            <div className="brochureLogo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="236"
                height="33"
                viewBox="0 0 236 33"
                fill="none"
              >
                <path
                  d="M32.117 16.8377V27.5631L25.3534 15.3969L22.4031 10.1743L19.794 5.45193L9.65867 23.521L6.76859 18.3384L16.4022 0.849609H23.1858L32.117 16.8377Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M25.3534 15.3966L15.6997 32.8654H8.91609L0.00500488 16.9373V6.25195L6.7686 18.338L9.65868 23.5207L12.3079 28.263L22.4031 10.1739L25.3534 15.3966Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M62.9445 6.55268H51.7254V12.3356H61.7604V15.5172H51.7254V21.3601H63.2456V24.5618H48.1128V3.33105H62.9646V6.53267L62.9445 6.55268Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M68.2229 9.15332L72.538 14.416L76.833 9.15332H80.8871L74.545 16.7972L80.9874 24.5811H76.8932L72.4778 19.1784L68.1025 24.5811H64.0484L70.4908 16.8372L64.1487 9.17333H68.243L68.2229 9.15332Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M91.3837 24.9621C89.0556 24.9621 87.1489 24.0016 86.1053 22.2407V30.745H82.593V9.15411H86.1053V11.4753C87.1489 9.71439 89.0556 8.75391 91.3837 8.75391C95.759 8.75391 98.9501 12.3157 98.9501 16.858C98.9501 21.4003 95.759 24.9821 91.3837 24.9821V24.9621ZM90.8418 11.7754C88.0922 11.7754 86.1053 13.7364 86.1053 16.838C86.1053 19.9395 88.1324 21.9205 90.8418 21.9205C93.5513 21.9205 95.5984 19.6994 95.5984 16.838C95.5984 13.9765 93.6516 11.7754 90.8418 11.7754Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M108.945 8.75325C113.581 8.67321 117.234 12.315 117.154 16.8573C117.234 21.3996 113.581 25.0615 108.945 24.9814C104.208 24.9814 100.736 21.5197 100.736 16.8573C100.736 12.195 104.208 8.75325 108.945 8.75325ZM108.945 11.8148C106.075 11.8148 104.068 14.0159 104.068 16.8373C104.068 19.6587 106.075 21.8999 108.945 21.8999C111.815 21.8999 113.782 19.6988 113.782 16.8373C113.782 13.9759 111.815 11.8148 108.945 11.8148Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M129.497 12.2957C129.095 12.1557 128.513 12.0556 127.73 12.0556C126.426 12.0556 125.322 12.4958 124.479 13.3763C123.636 14.2367 123.235 15.3373 123.235 16.6979V24.5419H119.723V9.13414H123.235V11.8755C124.018 10.0346 125.703 8.83398 127.791 8.83398C128.513 8.83398 129.095 8.91402 129.497 9.07411V12.2757V12.2957Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M143.024 24.0213C142.181 24.6016 140.696 24.9818 139.291 24.9818C135.498 24.9818 133.571 22.8407 133.571 18.5986V12.2153H130.179V9.17382H133.571V5.01172H137.083V9.17382H142.502V12.2153H137.083V18.5385C137.083 20.7597 137.946 21.9002 139.692 21.9002C140.656 21.9002 141.498 21.7001 142.221 21.2599L143.024 24.0413V24.0213Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M158.859 17.7783H155.086V24.5818H151.493V3.33105H158.859C164.519 3.33105 167.85 6.27254 167.85 10.5347C167.85 14.7968 164.519 17.7583 158.859 17.7583V17.7783ZM158.859 6.53267H155.086V14.5767H158.859C162.452 14.5767 164.278 13.136 164.278 10.5547C164.278 7.97339 162.452 6.53267 158.859 6.53267Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M177.223 8.75325C181.859 8.67321 185.512 12.315 185.432 16.8573C185.512 21.3996 181.859 25.0615 177.223 24.9814C172.487 24.9814 169.014 21.5197 169.014 16.8573C169.014 12.195 172.487 8.75325 177.223 8.75325ZM177.223 11.8148C174.353 11.8148 172.346 14.0159 172.346 16.8373C172.346 19.6587 174.353 21.8999 177.223 21.8999C180.093 21.8999 182.06 19.6988 182.06 16.8373C182.06 13.9759 180.093 11.8148 177.223 11.8148Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M197.775 12.2957C197.373 12.1557 196.791 12.0556 196.009 12.0556C194.704 12.0556 193.6 12.4958 192.757 13.3763C191.914 14.2367 191.513 15.3373 191.513 16.6979V24.5419H188.001V9.13414H191.513V11.8755C192.296 10.0346 193.982 8.83398 196.069 8.83398C196.791 8.83398 197.373 8.91402 197.775 9.07411V12.2757V12.2957Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M211.302 24.0213C210.459 24.6016 208.974 24.9818 207.569 24.9818C203.776 24.9818 201.849 22.8407 201.849 18.5986V12.2153H198.457V9.17382H201.849V5.01172H205.361V9.17382H210.78V12.2153H205.361V18.5385C205.361 20.7597 206.224 21.9002 207.97 21.9002C208.934 21.9002 209.777 21.7001 210.499 21.2599L211.302 24.0413V24.0213Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M228.783 9.15361V24.5614H225.311V22.2202C224.267 23.9811 222.361 24.9616 220.032 24.9616C215.657 24.9616 212.466 21.4398 212.466 16.8375C212.466 12.2352 215.657 8.7334 220.032 8.7334C222.361 8.7334 224.267 9.71389 225.311 11.4748V9.1336H228.783V9.15361ZM220.574 11.7949C217.724 11.7949 215.798 13.996 215.798 16.8575C215.798 19.7189 217.744 21.9401 220.574 21.9401C223.404 21.9401 225.271 19.939 225.271 16.8575C225.271 13.7759 223.324 11.7949 220.574 11.7949Z"
                  fill="#FEFEFE"
                />
                <path
                  d="M235.767 24.5616H232.255V2.9707H235.767V24.5616Z"
                  fill="#FEFEFE"
                />
              </svg>
            </div>
            <div className="brochureHeader">
              <h1>Unlock a world of opportunities in international trade</h1>
            </div>
            <div className="brochureParagraph">
              <p>
                Dedicated to connecting businesses and entrepreneurs from around
                the world
              </p>
            </div>
          </div>
          <div className="brochureMask">
            <img src={maskImg} alt="mask" />
          </div>
        </div>
        <div className="loginForm" id="base">
          <div className="Login-title">
            <h1>{t("signIn.Log In")} </h1>
            <p>Welcome Back, Empower your experience,</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="emailContainer">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="emailInput"
                placeholder={
                  formData.showPlaceholder ? t("signIn.Email@domain.com") : ""
                }
                value={formData.email}
                onChange={handleInputChange}
                onClick={handleClickInput}
              />
            </div>
            <div className="passwordContainer">
              <label htmlFor="password">Password*</label>
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                id="passwordInput"
                placeholder={
                  formData.showPlaceholder ? t("signIn.Enter Password") : ""
                }
                value={formData.password}
                onChange={handleInputChange}
                onClick={handleClickInput}
              />
              <span className="icon" onClick={togglePasswordVisibility}>
                {formData.showPassword ? (
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
            <div>
              <span className="forgot-password">
                <Link to="/ForgotPassword">{t("signIn.Forgot Password?")}</Link>
              </span>
            </div>
            <div>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.86689 11.2694L12.1731 5.96318L11.3106 5.11943L6.86689 9.56318L4.61689 7.31318L3.77314 8.15693L6.86689 11.2694ZM7.97314 15.3569C6.94814 15.3569 5.97939 15.1601 5.06689 14.7663C4.15439 14.3726 3.35752 13.8351 2.67627 13.1538C1.99502 12.4726 1.45752 11.6757 1.06377 10.7632C0.67002 9.85068 0.473145 8.88193 0.473145 7.85693C0.473145 6.81943 0.67002 5.84443 1.06377 4.93193C1.45752 4.01943 1.99502 3.22568 2.67627 2.55068C3.35752 1.87568 4.15439 1.34131 5.06689 0.947559C5.97939 0.553809 6.94814 0.356934 7.97314 0.356934C9.01064 0.356934 9.98564 0.553809 10.8981 0.947559C11.8106 1.34131 12.6044 1.87568 13.2794 2.55068C13.9544 3.22568 14.4888 4.01943 14.8825 4.93193C15.2763 5.84443 15.4731 6.81943 15.4731 7.85693C15.4731 8.88193 15.2763 9.85068 14.8825 10.7632C14.4888 11.6757 13.9544 12.4726 13.2794 13.1538C12.6044 13.8351 11.8106 14.3726 10.8981 14.7663C9.98564 15.1601 9.01064 15.3569 7.97314 15.3569Z"
                      fill="#A8ADB4"
                    />
                  </svg>
                  One lowercase character{" "}
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.86689 11.2694L12.1731 5.96318L11.3106 5.11943L6.86689 9.56318L4.61689 7.31318L3.77314 8.15693L6.86689 11.2694ZM7.97314 15.3569C6.94814 15.3569 5.97939 15.1601 5.06689 14.7663C4.15439 14.3726 3.35752 13.8351 2.67627 13.1538C1.99502 12.4726 1.45752 11.6757 1.06377 10.7632C0.67002 9.85068 0.473145 8.88193 0.473145 7.85693C0.473145 6.81943 0.67002 5.84443 1.06377 4.93193C1.45752 4.01943 1.99502 3.22568 2.67627 2.55068C3.35752 1.87568 4.15439 1.34131 5.06689 0.947559C5.97939 0.553809 6.94814 0.356934 7.97314 0.356934C9.01064 0.356934 9.98564 0.553809 10.8981 0.947559C11.8106 1.34131 12.6044 1.87568 13.2794 2.55068C13.9544 3.22568 14.4888 4.01943 14.8825 4.93193C15.2763 5.84443 15.4731 6.81943 15.4731 7.85693C15.4731 8.88193 15.2763 9.85068 14.8825 10.7632C14.4888 11.6757 13.9544 12.4726 13.2794 13.1538C12.6044 13.8351 11.8106 14.3726 10.8981 14.7663C9.98564 15.1601 9.01064 15.3569 7.97314 15.3569Z"
                      fill="#A8ADB4"
                    />
                  </svg>
                  One uppercase character
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.86689 11.2694L12.1731 5.96318L11.3106 5.11943L6.86689 9.56318L4.61689 7.31318L3.77314 8.15693L6.86689 11.2694ZM7.97314 15.3569C6.94814 15.3569 5.97939 15.1601 5.06689 14.7663C4.15439 14.3726 3.35752 13.8351 2.67627 13.1538C1.99502 12.4726 1.45752 11.6757 1.06377 10.7632C0.67002 9.85068 0.473145 8.88193 0.473145 7.85693C0.473145 6.81943 0.67002 5.84443 1.06377 4.93193C1.45752 4.01943 1.99502 3.22568 2.67627 2.55068C3.35752 1.87568 4.15439 1.34131 5.06689 0.947559C5.97939 0.553809 6.94814 0.356934 7.97314 0.356934C9.01064 0.356934 9.98564 0.553809 10.8981 0.947559C11.8106 1.34131 12.6044 1.87568 13.2794 2.55068C13.9544 3.22568 14.4888 4.01943 14.8825 4.93193C15.2763 5.84443 15.4731 6.81943 15.4731 7.85693C15.4731 8.88193 15.2763 9.85068 14.8825 10.7632C14.4888 11.6757 13.9544 12.4726 13.2794 13.1538C12.6044 13.8351 11.8106 14.3726 10.8981 14.7663C9.98564 15.1601 9.01064 15.3569 7.97314 15.3569Z"
                      fill="#A8ADB4"
                    />
                  </svg>
                  8 characters minimum
                </li>
              </ul>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.86689 11.2694L12.1731 5.96318L11.3106 5.11943L6.86689 9.56318L4.61689 7.31318L3.77314 8.15693L6.86689 11.2694ZM7.97314 15.3569C6.94814 15.3569 5.97939 15.1601 5.06689 14.7663C4.15439 14.3726 3.35752 13.8351 2.67627 13.1538C1.99502 12.4726 1.45752 11.6757 1.06377 10.7632C0.67002 9.85068 0.473145 8.88193 0.473145 7.85693C0.473145 6.81943 0.67002 5.84443 1.06377 4.93193C1.45752 4.01943 1.99502 3.22568 2.67627 2.55068C3.35752 1.87568 4.15439 1.34131 5.06689 0.947559C5.97939 0.553809 6.94814 0.356934 7.97314 0.356934C9.01064 0.356934 9.98564 0.553809 10.8981 0.947559C11.8106 1.34131 12.6044 1.87568 13.2794 2.55068C13.9544 3.22568 14.4888 4.01943 14.8825 4.93193C15.2763 5.84443 15.4731 6.81943 15.4731 7.85693C15.4731 8.88193 15.2763 9.85068 14.8825 10.7632C14.4888 11.6757 13.9544 12.4726 13.2794 13.1538C12.6044 13.8351 11.8106 14.3726 10.8981 14.7663C9.98564 15.1601 9.01064 15.3569 7.97314 15.3569Z"
                      fill="#A8ADB4"
                    />
                  </svg>
                  One number
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6.86689 11.2694L12.1731 5.96318L11.3106 5.11943L6.86689 9.56318L4.61689 7.31318L3.77314 8.15693L6.86689 11.2694ZM7.97314 15.3569C6.94814 15.3569 5.97939 15.1601 5.06689 14.7663C4.15439 14.3726 3.35752 13.8351 2.67627 13.1538C1.99502 12.4726 1.45752 11.6757 1.06377 10.7632C0.67002 9.85068 0.473145 8.88193 0.473145 7.85693C0.473145 6.81943 0.67002 5.84443 1.06377 4.93193C1.45752 4.01943 1.99502 3.22568 2.67627 2.55068C3.35752 1.87568 4.15439 1.34131 5.06689 0.947559C5.97939 0.553809 6.94814 0.356934 7.97314 0.356934C9.01064 0.356934 9.98564 0.553809 10.8981 0.947559C11.8106 1.34131 12.6044 1.87568 13.2794 2.55068C13.9544 3.22568 14.4888 4.01943 14.8825 4.93193C15.2763 5.84443 15.4731 6.81943 15.4731 7.85693C15.4731 8.88193 15.2763 9.85068 14.8825 10.7632C14.4888 11.6757 13.9544 12.4726 13.2794 13.1538C12.6044 13.8351 11.8106 14.3726 10.8981 14.7663C9.98564 15.1601 9.01064 15.3569 7.97314 15.3569Z"
                      fill="#A8ADB4"
                    />
                  </svg>
                  One special character
                </li>
              </ul>
            </div>
            <button className="sign-in-button" variant="info" type="submit">
              {t("signIn.Submit")}
            </button>

            <p className="sign-up-prompt">
              {t("signIn.Don’t have an account?")}
              <Link to="/SignUp">{t("navbar.Create an account")}</Link>
            </p>

            <button className="activate-button" variant="success" type="submit">
              {t("signIn.Activate")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
