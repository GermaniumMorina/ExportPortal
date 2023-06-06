import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./AddNewCompany.css";
import { useState } from "react";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import NotAllowed from "../Authentication/NotAllowed";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { TagsInput } from "react-tag-input-component";

export const AddNewCompany = () => {
  const userID = localStorage.getItem("userId");
  const navigate = useNavigate();
  const isLoggedIn = checkIfLoggedIn();
  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    TIN: "",
    web_address: "",
    taxpayer_office: "",
    keywords: "",
    category_id: 0,
    more_info: "",
    subcategory_id: 0,
    selectedValues: [],
    country: "",
    budged: "",
    profile_picture: "null.jpg",
  });

  const [countryList, setCountryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);

  const getSubcategory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/subcategory");
      setSubcategoryList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category");
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
    getSubcategory();
  }, []);

  const getCountry = async () => {
    const ApiCountry = await axios.get("http://127.0.0.1:8000/api/country");
    setCountryList(ApiCountry.data.data);
  };

  useEffect(() => {
    getCountry();
  }, []);

  const handleCountryChange = (e) => {
    setFormValues({ ...formValues, country: e.target.value });
  };

  const handleChange = (event) => {
    const newValue = event.target.name;
    const selectedValues = formValues.selectedValues.includes(newValue)
      ? formValues.selectedValues.filter((value) => value !== newValue)
      : [...formValues.selectedValues, newValue];

    setFormValues({ ...formValues, selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/company/${userID}`,
        formValues
      );
      // changed from 201 to 200 because it was returning 201 from backend api
      if (response.status === 200) {
        alertify.success("Company created successfully");
        navigate("/dashboard"); // Redirect to the dashboard route
      }
    } catch (error) {
      // Handle any error that occurred during the API request
      console.error(error);
    }

    const activity = JSON.stringify({
      selectedValues: formValues.selectedValues,
    });
    // send `data` to API endpoint using fetch or Axios
    console.log(activity);
  };
  const { t } = useTranslation();

  return isLoggedIn ? (
    <div className="d-flex justify-content-center">
      <div id="add-new-company-base">
        <div className="add-new-company-form-div">
          <h2>{t("addCompany.Add Company")}</h2>
          <Form onSubmit={handleSubmit} className="main-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={t("addCompany.Company Name")}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                value={formValues.name}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Select
                as="select"
                required
                onChange={(e) =>
                  setFormValues({ ...formValues, type: e.target.value })
                }
                value={formValues.type}
                name="type"
              >
                <option value="export">{t("navbar.Export")}</option>
                <option value="import">{t("navbar.Import")}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder={t("addCompany.More information about the company")}
                onChange={(e) =>
                  setFormValues({ ...formValues, more_info: e.target.value })
                }
                value={formValues.more_info}
                name="more_info"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder={t("addCompany.Taxpayer ID number")}
                onChange={(e) =>
                  setFormValues({ ...formValues, TIN: e.target.value })
                }
                value={formValues.TIN}
                name="TIN"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder={t("addCompany.Company Budget")}
                onChange={(e) =>
                  setFormValues({ ...formValues, budged: e.target.value })
                }
                value={formValues.budged}
                name="budged"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Control
                type="text"
                placeholder={t("addCompany.Taxpayer Office")}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    taxpayer_office: e.target.value,
                  })
                }
                value={formValues.taxpayer_office}
                name="taxpayer_office"
              />
            </Form.Group>

            <div>
              <TagsInput
                value={formValues.keywords.split(",")}
                onChange={(tags) =>
                  setFormValues({ ...formValues, keywords: tags.join(",") })
                }
                name="keywords"
                placeHolder="Enter Keywords"
              />
              <em>Press enter to add a new KeyWord</em>
            </div>

            <Form.Select
              value={formValues.category_id}
              onChange={(e) =>
                setFormValues({ ...formValues, category_id: e.target.value })
              }
              name="category_id"
            >
              <option value={0}>{t("company.Category")}</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>

            <br />

            <Form.Select
              value={formValues.subcategory_id}
              onChange={(e) =>
                setFormValues({ ...formValues, subcategory_id: e.target.value })
              }
              name="subcategory_id"
            >
              <option value={0}>{t("company.Sub-Catgory")}</option>
              {subcategoryList.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </Form.Select>

            <br />

            <Form.Group>
              <Form.Select
                className="mb-2"
                name="country"
                value={formValues.country}
                onChange={handleCountryChange}
              >
                <option>{t("signUp.Select country")}</option>
                {countryList.map((country) => (
                  <option key={country.id} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <br />

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Control
                type="text"
                placeholder={t("companies.Web Address")}
                onChange={(e) =>
                  setFormValues({ ...formValues, web_address: e.target.value })
                }
                value={formValues.web_address}
                name="web_address"
              />
            </Form.Group>

            <h5>{t("addCompany.Activity Area")}</h5>

            <div className="d-flex justify-content-center">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Exporter")}
                  name="1"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Importer")}
                  name="2"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Servicer")}
                  name="3"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Retailer")}
                  name="4"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Wholesaler")}
                  name="5"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label={t("addCompany.Manufacturer")}
                  name="6"
                />
              </FormGroup>
            </div>
            <Button className="submit-button" variant="info" type="submit">
              {t("signIn.Submit")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  ) : (
    <NotAllowed />
  );
};
