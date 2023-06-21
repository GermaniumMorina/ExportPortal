import React from "react";
import logo from "../Navigation/logo.png";
import "./footer.css";
import { Newsletter } from "./Newsletter";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return(
    <div id="container">
      <footer className="footer-distributed" id="footer">
        <div className="footer-left">
          <img src={logo} className="logoFooter" alt="logo"></img>

          <p className="footer-company-name">Protecht © 2023</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>{t("footer.St.Uke Bytyqi Nr.7")}</span>
              <span>{t("footer.Prizren, Kosovo")}</span>
              <span>ZIP : 20000</span>
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+383 49 123 123</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:info@protecht.ch" className="links-footer">{t("footer.Email support")}</a>
            </p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>

            <p>info@protecht.ch</p>
          </div>
        </div>

        <div className="footer-right">
          <ul className="list-unstyled">
            <p className="footer-links">
              <li>
                <a href="/Support" className="links-footer">{t("footer.Contact Support")}</a>
              </li>
              <br></br>
              <li>
                <a href="/"  className="links-footer">
                  {t("footer.Home")}
                </a>
              </li>
              <br></br>

              <li>
                <a href="/account" className="links-footer"> {t("navbar.Account")}</a>
              </li>
              <br></br>

              <li>
                <a href="/contact" className="links-footer">Contact Us</a>
              </li>
              <br></br>
              <li>
                <a href="/corporate" className="links-footer"> {t("navbar.Corporate")}</a>
              </li>
            </p>
          </ul>
        </div>
        <div className="footer-newsletter">
          <Newsletter />
        </div>
      </footer>
    </div>
  ) 
};

export default Footer;