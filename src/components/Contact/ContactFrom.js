import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ContactFrom.css";

export const ContactFrom = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/form/${id}`
        );
        setProductData(response.data.original[0]);
        setFormValues({
          name: response.data.original[0].Product,
          email: response.data.original[0].email,
          message: `I am interested in your product: ${response.data.original[0].Product}`,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/buyerList');

    if (!productData) return; 

    const { Owner_id: Oid, Product_ID: Pid } = productData;

    await axios
      .get(`http://localhost:8000/api/Notify/${Oid}/${id}/${Pid}`, formValues) // use Oid and Pid here
      .then((res) => {
        console.log("Data sent to database successfully.");
        window.location.href = `mailto:${formValues.email}?subject=Interest in ${formValues.name}&body=${formValues.message}`;
      })
      .catch((err) => {
        console.log("Error in sending data to database.", err);
      });
  };

  return (
    <div id="add-new-company-base-contact-from">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center">{t("contact.Contact seller")}</h1>
        <h5>{t("contact.Subject")}</h5>
        <InputGroup className="mb-3">
          <Form.Control
            value={formValues.name}
            name="name"
            placeholder={t("contact.Subject")}
            aria-label="Name"
          />
        </InputGroup>
        <h5>{t("newsletter.Email")}</h5>
        <InputGroup className="mb-3">
          <Form.Control
            readOnly
            value={formValues.email}
            name="email"
            placeholder={t("newsletter.Email")}
            aria-label="Email"
          />
        </InputGroup>
        <h5>{t("support.Message")}</h5>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={formValues.message}
            name="message"
            placeholder={t("support.Message")}
            aria-label="Message"
            onChange={handleChange}
          />
        </InputGroup>
        <div className="d-flex justify-content-center">
          <Button variant="outline-secondary" id="button-addon2" type="submit">
            {t("support.Send")}
          </Button>
        </div>
      </Form>
    </div>
  );
};
