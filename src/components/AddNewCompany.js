import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./AddNewCompany.css";
import { useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const AddNewCompany = () => {
  const [formValues, setFormValues] = useState({

    company_name: "",
    company_type: "",
    company_info: "",
    taxpayer_id: "",
    taxpayer_office: "",
    keywords: "",
    category: "",
    sub_category: "",
    country: "",
    webiste: "",

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="d-flex justify-content-center">
      <div id="add-new-company-base">
        <div className="add-new-company-form-div">
          <h2>Add Company</h2>
          <Form onSubmit={handleSubmit} className="main-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Company Name"
                onChange={handleChange}
                value={formValues["company_name"]}
                name="company_name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Control
              required
                type="text"
                placeholder="Company Type"
                onChange={handleChange}
                value={formValues["company_type"]}
                name="company_type"
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
                placeholder="More information about the company"
                onChange={handleChange}
                value={formValues["company_info"]}
                name="company_info"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder="Taxpayer ID number"
                onChange={handleChange}
                value={formValues["taxpayer_id"]}
                name="taxpayer_id"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Control
                type="text"
                placeholder="Taxpayer Office"
                onChange={handleChange}
                value={formValues["taxpayer_office"]}
                name="taxpayer_office"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Control
                type="text"
                placeholder="KeyWords"
                onChange={handleChange}
                value={formValues["keywords"]}
                name="keywords"
              />
            </Form.Group>

            <Form.Select
              value={formValues["category"]}
              onChange={handleChange}
              name="category"
            >
              <option value={""}>Category</option>
              <option value={"Transport"}>Transport</option>
              <option value={"Export"}>Export</option>
              <option value={"Sales"}>Sales</option>
              <option value={"Import"}>Import</option>
              <option value={"Trade"}>Trade</option>
            </Form.Select>
            <br />
            <Form.Select
              value={formValues["sub_category"]}
              onChange={handleChange}
              name="sub_category"
            >
              <option value={""}>Sub-Category</option>
              <option value={"Transport"}>Transport</option>
              <option value={"Export"}>Export</option>
              <option value={"Sales"}>Sales</option>
              <option value={"Import"}>Import</option>
              <option value={"Trade"}>Trade</option>
            </Form.Select>
            <br />
            <Form.Select
              value={formValues["country"]}
              onChange={handleChange}
              name="country"
            >
              <option value={""}>Country</option>
              <option value={"Kosovo"}>Republic of Kosovo</option>
              <option value={"Albania"}>Albania</option>
              <option value={"North Macedionia"}>North Macedonia</option>
              <option value={"Serbia"}>Serbia</option>
              <option value={"Montenegro"}>Montenegro</option>
            </Form.Select>
            <br />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Control
                type="text"
                placeholder="Web Adress"
                onChange={handleChange}
                value={formValues["webiste"]}
                name="webiste"
              />
            </Form.Group>
            <h5>Activity Area</h5>

            <div className="d-flex justify-content-center" >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Exporter"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Importer"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Servicer"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Retailer"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Wholesaler"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleChange}
                  label="Manifacturer"
                />
              </FormGroup>
            </div>
            <Button className="submit-button" variant="info" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
