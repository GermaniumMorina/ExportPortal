import React from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./footer.css";
import axios from "axios";


import { useTranslation } from "react-i18next";
export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/newsletter/1",
        {
          email: email,
        }

        );

        console.log(response)

      if (response.status === 200) {
        alertify.success("You have been subscribed to our newsletter");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alertify.error("You are already subscribed to our newsletter");
      } else {
        alertify.error("Cannot subscribe to newsletter");
      }
    }
  };

  const { t } = useTranslation();
  return (
    <div>
      <div className="newsletter">
        <Form>
          <div className="subscribe-txt">
            <h5>{t("newsletter.Subscribe to our newsletter!")}</h5>
          </div>
          <br></br>
          <h5>{t("newsletter.Email")}</h5>
          <InputGroup className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              aria-label="email@example.com"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-success" onClick={handleSubmit} className="subscribe-button">
              {t("newsletter.Subscribe")}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};
