import React, { useState } from "react";
import "./AddNewItem.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { checkIfLoggedIn } from "../../Authentication/checkIfLoggedIn";
import NotAllowed from "../../Authentication/NotAllowed";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export const AddNewItem = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    type: "",
    subcategory_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  
    const data = JSON.stringify({
      ...formValues,
      company_id: 1,
    });
    console.log(data);
  
    try {
      const response = await axios.post(`http://localhost:8000/api/add`, {
        ...formValues,
        company_id: 1,
      });
  
      console.log("response", response);
  
      if (response.status === 200 && formValues.type === "export") {
        alertify.success("Item added successfully");
        navigate("/ImageComponent");
      } else if (response.status === 200 && formValues.type === "import") {
        alertify.success("Item added successfully");
        navigate("/ImageComponent");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("error response", error.response.data);
  
        const errors = error.response.data;
        Object.values(errors).forEach((errorMessage) => {
          alertify.error(errorMessage);
        });
      } else {
        console.error("Error submitting data:", error);
      }
    }
  };
  

  const { t } = useTranslation();
const isLoggedIn=checkIfLoggedIn();


  return isLoggedIn ? (
    <div className="d-flex justify-content-center">
      <div id="add-new-company-base">
        <div className="add-new-company-form-div">
          <h2>{t("products.Add new Item")}</h2>
          <Form onSubmit={handleSubmit} className="main-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={t("products.Item Name")}
                onChange={handleChange}
                value={formValues.name}
                name="name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder={t("products.Item Description")}
                onChange={handleChange}
                value={formValues.description}
                name="description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder={t("products.Item Price")}
                onChange={handleChange}
                value={formValues.price}
                name="price"
              />
            </Form.Group>
            <Form.Select
              value={formValues.category_id}
              onChange={handleChange}
              name="category_id"
            >
              <option value={""}> {t("company.Category")} </option>
              <option value={1}>{t("products.Fashion")}</option>
              <option value={2}>{t("products.Accessories")}</option>
              <option value={3}>{t("products.Home")}</option>
              <option value={4}>{t("products.Sporting")}</option>
              <option value={5}>{t("products.Health")}</option>
              <option value={6}>{t("products.Medical")}</option>
              <option value={7}>{t("products.Pets")}</option>
            </Form.Select>
            <br />
            <Form.Select
              value={formValues.subcategory_id}
              onChange={handleChange}
              name="subcategory_id"
            >
              <option value={""}>{t("company.Sub-Catgory")}</option>
              <option value={1}>{t("products.Fashion")}</option>
              <option value={2}>{t("products.Accessories")}</option>
              <option value={3}>{t("products.Home")}</option>
              <option value={4}>{t("products.Sporting")}</option>
              <option value={5}>{t("products.Health")}</option>
              <option value={6}>{t("products.Medical")}</option>
              <option value={7}>{t("products.Pets")}</option>
            </Form.Select>
            <br />
            <Form.Select
              value={formValues.type}
              onChange={handleChange}
              name="type"
            >
              <option value="">{t("products.Type")}</option>
              <option value="import">{t("products.Import Item")}</option>
              <option value="export">{t("products.Export Item")}</option>
            </Form.Select>
            <br />

            <br />
            <Button type="submit" variant="primary">
              {t("signIn.Submit")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  ):(
    <NotAllowed/>
  )
};
