import React, { useEffect, useState } from "react";
import "./Navigation.css";
import CompanyProfile from "./CompanyProfile";
import MissionVission from "./MissionVission";
import OurSocialResp from "./OurSocialResp";
import HumanResources from "./HumanResources";
import History from "./History";
import BankAcc from "./BankAcc";
import Brands from "./Brands";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const [selectedComponent, setSelectedComponent] = useState(<CompanyProfile/>);
  const { t } = useTranslation();
  const handleItemClick = (component) => {
    setSelectedComponent(component);
  };
  useEffect(() => {
    const buttonElements = document.querySelectorAll(".MenuBox>ul>li");
    const svgElements = document.querySelectorAll(".MenuBox>ul>li>svg");
    const hoverBoxElement = document.getElementsByClassName("HoverBox")[0];

    function clearTag(id) {
      for (let item of svgElements) {
        if (item === svgElements[id]) {
          continue;
        }
        item.style.color = "#6e6c6c";
      }
    }

    function handleMouseOver(index, top) {
      hoverBoxElement.style.top = top;
      hoverBoxElement.style.animation = `Effect_${index} 250ms 1`;
      svgElements[index].style.color = "white";
      clearTag(index);
    }

    buttonElements.forEach((button, index) => {
      button.addEventListener("mouseover", () => {
        handleMouseOver(index, `${20 + index * 67}px`);
      });
    });

    return () => {
      buttonElements.forEach((button, index) => {
        button.removeEventListener("mouseover", () => {
          handleMouseOver(index, `${20 + index * 67}px`);
        });
      });
    };
  }, []);

  return (
    <div className="height-controller-container">
    <div className="navigation-corp-page">
      <div className="Contact">
        <div className="MenuBox">
          <div className="TopBox"></div>
          <div className="HoverBox"></div>
          <ul>
            <li
              className="Active"
              onClick={() => handleItemClick(<CompanyProfile />)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>{t("corporatePage.Profile")}</span>
            </li>
            <li onClick={() => handleItemClick(<History />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-help-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>{" "}
              <span>{t("corporatePage.History")}</span>
            </li>
            <li onClick={() => handleItemClick(<MissionVission />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-help-circle"
              >
                <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
                <path d="M15 7h6v6" />
              </svg>

              <span>{t("corporatePage.Mission")}</span>
            </li>
            <li onClick={() => handleItemClick(<OurSocialResp />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file-text"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>{t("corporatePage.Responsibility")} </span>
            </li>
            <li onClick={() => handleItemClick(<HumanResources />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-users"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>

              <span>{t("corporatePage.HR")}</span>
            </li>
            <li onClick={() => handleItemClick(<BankAcc />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-users"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span>{t("corporatePage.Bank")}</span>
            </li>
            <li onClick={() => handleItemClick(<Brands />)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-help-circle"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <span>{t("corporatePage.Brands")}</span>
            </li>
          </ul>
        </div>
        <div>{selectedComponent}</div>
      </div>
    </div>
    </div>
  );
};

export default Navigation;
