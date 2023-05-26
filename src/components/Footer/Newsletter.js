import React from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";
export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted " + email);
  };
  const { t } = useTranslation();
  return (
    <div>
      {" "}
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
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSubmit}
            >
              {t("support.Send")}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};
