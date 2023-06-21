import React from "react";
import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./ContactUs.css"

const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="contact-us-base">
          <div className="contact-us-form-div">
            <Form>
              <h1 className="text-center">Contact Us</h1>

              <h5>{t("contact.Subject")}</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={formValues.name}
                  name="name"
                  required
                  placeholder={t("contact.Subject")}
                  aria-label="Subject"
                />
              </InputGroup>

              <h5>{t("support.Message")}</h5>

              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  required
                  rows={7}
                  onChange={handleChange}
                  value={formValues.message}
                  name="message"
                  placeholder={t("support.Message")}
                  aria-label="Message"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>

              <br />

              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                {t("support.Send")}
              </Button>
            </Form>

            <br />

            <div className="map-container">
              <h2>Or you can visit us here</h2>
              <br />
              <br />
              <br />
              <p>Rruga Uke Bytyci,</p>
              <p>ITP, U23, Kati 2</p>
              <p>Prizren, 20000, Kosove</p>

              <div className="responsive-map">
                <iframe
                  title="MAP"
                  src="https://api.jawg.io/maps/09b6e47a-046f-4e95-85b3-5748274cdbf9/0e7e0a86-121c-43ba-8f06-f31de5bf55dd.html?access-token=ANqIJBdfTowrRjH2cG9UUBRDgJUzYz8gNgZI2VRLrfdnRoJQ1OlHmGbxIO45lXdx"
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
