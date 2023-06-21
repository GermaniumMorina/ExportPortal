import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Companies.css";
import LoadingBar from "../LoadingScreens/LoadingBar";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
import { useRef } from "react";
import Form from "react-bootstrap/Form";

const Companies = () => {
  // State variables
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  const inputRef = useRef();

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when starting API call

      const [companiesResponse, categoriesResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/CompanyList`),
        axios.get("http://127.0.0.1:8000/api/category"),
      ]);

      setCompanyList(companiesResponse.data);
      console.log(companiesResponse);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after API call is completed
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  },[]);

  const navigateToCompany = (id) => {
    navigate(`/companies/${id}`);
  };

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };
  const handlePageClick = async (data) => {
    setIsLoading(true);
    const selectedPage = data.selected;
    let page = 0;
  
    if (selectedPage === 0) {
      page = 1; // Go to the first page
    } else {
      page = selectedPage + 1;
    }
  
    try {
      const companiesResponse = await axios.get(
        `http://127.0.0.1:8000/api/CompanyList?page=${page}`
      );
      setIsLoading(false);
      setCompanyList(companiesResponse.data);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleCheckboxChange = async (event) => {
    const { checked, id } = event.target;
    if (checked) {
      const response =await axios.get(`http://127.0.0.1:8000/api/filterCompany/${id}`);
      console.log(response);
      setCompanyList(response.data);
    }
    else{
      fetchData(); // Fetch all companies again
      return;
    }
  };
  const handleDebounceSearch = () => {
    const searchValue = inputRef.current.value.trim();

    // If there is no search term, fetch all companies
    if (!searchValue) {
      fetchData(); // Fetch all companies again
      return;
    }

    debouncedSearch(searchValue); // Pass the search term directly
  };

  const debouncedSearch = useRef(
    debounce((searchValue) => {
      axios
        .post("http://127.0.0.1:8000/api/searchCompany", {
          search: searchValue,
        })
        .then((response) => {
          console.log(response);
          const data = response.data.exportProducts.data;
          console.log(data);
          setCompanyList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 600)
  ).current;

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
            ref={inputRef}
            onChange={handleDebounceSearch}
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
        </div>
        </div>
        <div className="companies-container">
        {isLoading && <LoadingBar />}

          {companyList.map((company) => (
            <div key={company.id} className="companies-main-div">
              <div className="companies-info-div">
                <table>
                  <tbody>
                    <tr>
                      <td className="companies-info">{t("companies.Name")}</td>
                      <td className="companies-info">{company.name}</td>
                    </tr>
                    <tr>
                      <td className="companies-info">
                        {t("companies.Keywords")}
                      </td>
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
                      <td className="companies-info">
                        {t("companies.Country")}
                      </td>
                      <td className="companies-info">{company.country}</td>
                    </tr>
                    <tr>
                      <td className="companies-info">
                        {t("companies.Web Address")}
                      </td>
                      <td className="companies-info">
                        {company.web_address || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-center">
                  <button
                    className="view-more-button"
                    onClick={() => navigateToCompany(company.id)}
                  >
                    {t("companies.View More")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
