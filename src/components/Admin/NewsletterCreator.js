import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { checkIfAdmin } from "./checkIfAdmin";
import NotAllowedAdmin from "./NotAllowedAdmin";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";
const NewsletterCreator = () => {
  const [formValues, setFormValues] = useState({
    subject: "",
    message: "",
  });
  const isAdmin = checkIfAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Submitted " + formValues.name + formValues.email + formValues.message
    );
  const response= await axios.post(`http://127.0.0.1:8000/api/sendnewsletter`,formValues);
  console.log(response);

  alertify.success(response.data.message);

  };
  const { t } = useTranslation();
  return isAdmin?(
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
                disabled
            
                  
                  placeholder={t("newsletterCreator.Subscribers")}
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>

              <h5>{t("contact.Subject")}</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={formValues.subject}
                  name="subject"
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
  ):(
    <NotAllowedAdmin/>
  )
};

export default NewsletterCreator;
