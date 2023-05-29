import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NewsletterCreator = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
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
        <div id="add-new-company-base">
          <div className="add-new-company-form-div">
            <Form>
              <h1 className="text-center">
                {t("newsletterCreator.Write newsletter")}
              </h1>
              <h5> {t("newsletterCreator.To")}</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  required
                  value={formValues.email}
                  name="email"
                  placeholder={t("newsletterCreator.Subscribers")}
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>

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
              <br></br>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                {t("support.Send")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterCreator;
