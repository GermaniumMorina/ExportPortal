import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import "./Companies.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

const Companies = () => {
  const [companyList, setCompanyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const filtersRef = useRef(null);

  const getCompanies = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/CompanyList");
    setCompanyList(response.data.data);
  };

  const getCategories = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/category");
    setCategories(response.data.data);
  };

  const getCountries = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/country");
    setCountryList(response.data.data);
  };

  useEffect(() => {
    getCompanies();
    getCategories();
    getCountries();
  }, []);

  const filteredCompanies = companyList.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, parseInt(id)]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== parseInt(id)));
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredCompaniesWithCategories =
    selectedCategories.length > 0
      ? filteredCompanies.filter((company) => selectedCategories.includes(company.category_id))
      : filteredCompanies;

  const filteredCompaniesWithCountry =
    selectedCountry !== ""
      ? filteredCompaniesWithCategories.filter((company) => company.country === selectedCountry)
      : filteredCompaniesWithCategories;



  const tdStyle = {
    padding: "10px",
  };


  const navigateToCompany = (id) => {
    navigate(`/companies/${id}`);
  };

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };
  
  const { t } = useTranslation();

  return (
    <div>
      <NavBar />
      <div className="search">
        <div className="search-box">
          <button className="filter-button" onClick={toggleFilters}>
            {t("companies.Filter")}
          </button>
          <input
            type="text"
            className="input-bar"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={t("companies.Search!")}
          />
          <span></span>
        </div>
      </div>
      <div className={`filters ${showFilters ? "showFilters" : ""}`}>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>{t("companies.Filter by Category")}</Form.Label>
              <div>
                {categories.map((category) => (
                  <Form.Check
                    key={category.id}
                    type="checkbox"
                    id={category.id.toString()}
                    label={t(`companies.${category.name}`)}
                    name={category.name}
                    onChange={handleCheckboxChange}
                    className="m-2"
                  />
                ))}
              </div>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>{t("companies.Filter by Country")}</Form.Label>
              <Form.Control
                as="select"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value=""> {t("companies.All")}</option>
                {countryList.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.country}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
      </div>
      {filteredCompaniesWithCountry.map((company) => (
        <div
          key={company.id}
          className="col-xl-6 col-lg-6 col-md-8 col-sm-10 mx-auto border m-3 p-4 border-dark rounded"
        >
          <table>
            <tbody>
              <tr>
                <td style={tdStyle}>{t("companies.Name")}</td>
                <td style={tdStyle}>{company.name}</td>
              </tr>
              <tr>
                <td style={tdStyle}> {t("companies.Keywords")}</td>
                <td style={tdStyle}>{company.keywords}</td>
              </tr>
              <tr>
                <td style={tdStyle}> {t("companies.Country")}</td>
                <td style={tdStyle}>{company.country}</td>
              </tr>
              <tr>
                <td style={tdStyle}> {t("companies.Web Address")}</td>
                <td style={tdStyle}>{company.web_address || "N/A"}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <Button onClick={() => navigateToCompany(company.id)}>
              {t("companies.View More")}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Companies;
