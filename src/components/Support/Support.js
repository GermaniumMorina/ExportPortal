import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import contactImg from "./contact.jpg";
import "./support.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export const Support = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Submitted " + formValues.name + formValues.email + formValues.message
    );
  const response= await axios.post(`http://127.0.0.1:8000/api/email`,formValues);
  console.log(response);

  alertify.success(response.data.message);

  };
  const { t } = useTranslation();
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div id="add-new-company-base">
          <div className="add-new-company-form-div">
            <Form>
              <h1 className="text-center">
                {t("footer.Contact Support")}
                <img src={contactImg} alt="contact" className="contactImg" />
              </h1>

              <br></br>
              <h5>{t("companyListing.Name")}</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={formValues.name}
                  name="name"
                  placeholder={t("companyListing.Name")}
                  aria-label="Name"
                />
              </InputGroup>
              <br></br>
              <h5>{t("newsletter.Email")}</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={formValues.email}
                  name="email"
                  placeholder={t("newsletter.Email")}
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <br></br>
              <h5> {t("support.Message")}</h5>

              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  value={formValues.message}
                  name="message"
                  placeholder={t("support.Message")}
                  aria-label="Message"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <br></br>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                {t("signIn.Submit")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
