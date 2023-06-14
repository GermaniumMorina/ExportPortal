import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Companies.css";
import Form from "react-bootstrap/Form";
import LoadingBar from "../LoadingScreens/LoadingBar";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const Companies = () => {
  // State variables
  const [companyList, setCompanyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPageLoading(true);
        const [companiesResponse, categoriesResponse, countriesResponse] =
          await Promise.all([
            axios.get(`http://127.0.0.1:8000/api/CompanyList?page=${currentPage + 1}`),
            axios.get("http://127.0.0.1:8000/api/category"),
            axios.get("http://127.0.0.1:8000/api/country"),
          ]);

        setCompanyList(companiesResponse.data);
        setCategories(categoriesResponse.data);
        setCountryList(countriesResponse.data.data);
        setIsLoading(false);
        setIsPageLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsPageLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Filter companies based on search term
  const filteredCompanies = companyList.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle checkbox change for category filters
  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, parseInt(id)]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== parseInt(id))
      );
    }
  };

  // Handle country select change for country filter
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Apply category filters to the filtered companies list
  const filteredCompaniesWithCategories =
    selectedCategories.length > 0
      ? filteredCompanies.filter((company) =>
          selectedCategories.includes(company.category_id)
        )
      : filteredCompanies;

  // Apply country filter to the filtered companies list
  const filteredCompaniesWithCountry =
    selectedCountry !== ""
      ? filteredCompaniesWithCategories.filter(
          (company) => company.country === selectedCountry
        )
      : filteredCompaniesWithCategories;

  const navigateToCompany = (id) => {
    navigate(`/companies/${id}`);
  };

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  if (isLoading) {
    return <LoadingBar />;
  }
  else{    window.scrollTo({ top: 0, behavior: 'smooth' });
}

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);

  };

  return (
    <div>
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
      {isPageLoading ? (
        <LoadingBar />
      ) : (
        filteredCompaniesWithCountry.map((company) => (
          <div key={company.id} className="companies-main-div">
            <div className="companies-info-div">
              <table>
                <tbody>
                  <tr>
                    <td className="companies-info">{t("companies.Name")}</td>
                    <td className="companies-info">{company.name}</td>
                  </tr>
                  <tr>
                    <td className="companies-info">{t("companies.Keywords")}</td>
                    <td className="companies-info">
                      {company.keywords.split(",").map((keyword, index) => {
                        const trimmedKeyword = keyword.trim();
                        if (trimmedKeyword !== "") {
                          return (
                            <React.Fragment key={index}>
                              {index > 0 && " "}
                              <span className="keyword-tag">
                                #{trimmedKeyword}
                              </span>{" "}
                            </React.Fragment>
                          );
                        }
                        return null;
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="companies-info">{t("companies.Country")}</td>
                    <td className="companies-info">{company.country}</td>
                  </tr>
                  <tr>
                    <td className="companies-info">{t("companies.Web Address")}</td>
                    <td className="companies-info">{company.web_address || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <button className="view-more-button" onClick={() => navigateToCompany(company.id)}>
                  {t("companies.View More")}
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Companies;
