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
export const AddNewCompany = () => {
 const [name, setName] = useState("");
  const [type, setCompanyType] = useState("");
  const [TIN , setTIN] = useState("");
  const [web_address , setWebsite] = useState("");
  const [taxpayer_office , setTaxPayerOffice] = useState("");
  const [keywords , setKeywords] = useState("");
  const [category_id , setCategory] = useState("");
  const [more_info , setInfo] = useState("");
  const [subcategory_id , setSubCategory]= useState("");
const [selectedValues, setSelectedValues] = useState([]);
const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");

  const getCountry = async () => {
    const ApiCountry = await axios.get("http://127.0.0.1:8000/api/country");
    setCountryList(ApiCountry.data.data);
  };
  useEffect(() => {
    getCountry();
  }, []);
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };



  const handleChange = (event) => {
    const newValue = event.target.name;
    if (selectedValues.includes(newValue)) {
      setSelectedValues(selectedValues.replace(newValue, ""));
    } else {
      setSelectedValues(selectedValues + newValue);
    }
  };
  
  const handleSubmit = async (e)  => {
    e.preventDefault();
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    const response = await axios.post(`http://localhost:8000/api/company`, {
      name,
      type,
      TIN,
      web_address,
      taxpayer_office,
      keywords,
      category_id,  
      more_info,
      subcategory_id,
      country,
    });
    console.log("response", response);
    const activity = JSON.stringify({ selectedValues });
    // send `data` to API endpoint using fetch or Axios
    console.log(activity);  
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
                onChange={(e) => setName(e.target.value)}          
                value={name}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Control
              required
                type="text"
                placeholder="Company Type"
                onChange={(e) => setCompanyType(e.target.value)}                
                value={type}
                name="type"
             
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
                onChange={(e) => setInfo(e.target.value)}     
                value={more_info}
                name="more_info"
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder="Taxpayer ID number"
                onChange={(e) => setTIN(e.target.value)}    
                value={TIN}
                name="TIN"
              
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Control
                type="text"
                placeholder="Taxpayer Office"
                onChange={(e) => setTaxPayerOffice(e.target.value)}
                value={taxpayer_office}
                name="taxpayer_office"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Control
                type="text"
                placeholder="KeyWords"
                onChange={(e) => setKeywords(e.target.value)}               
                 value={keywords}
                name="keywords"
              />
            </Form.Group>

            <Form.Select
              value={category_id}
              onChange={(e) => setCategory(e.target.value)}
              name="category_id"
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
              value={subcategory_id}
              onChange={(e) => setSubCategory(e.target.value)}
              name="subcategory_id"
            >
              <option value={""}>Sub-Category</option>
              <option value={"Transport"}>Transport</option>
              <option value={"Export"}>Export</option>
              <option value={"Sales"}>Sales</option>
              <option value={"Import"}>Import</option>
              <option value={"Trade"}>Trade</option>
            </Form.Select>
            <br />
            <Form.Group>
            <Form.Select
              className="mb-2"
              name="country"
              value={country}
              onChange={handleCountryChange}
            >
              <option>Select country</option>
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
                placeholder="Web Adress"
                onChange={(e) => setWebsite(e.target.value)}
                name="web_address"
                value={web_address}
              />
            </Form.Group>
            <h5>Activity Area</h5>

            <div className="d-flex justify-content-center">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Exporter"
          name="1"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Importer"
          name="2"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Servicer"
          name="3"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Retailer"
          name="4"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Wholesaler"
          name="5"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleChange}
          label="Manufacturer"
          name="6"
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
