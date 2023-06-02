import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import LoadingBar from "../LoadingScreens/LoadingBar";
import { useTranslation } from "react-i18next";

const Company = () => {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company_details/${id}`
      );
      setCompany(response.data[0]);
      setIsLoading(false);
      console.log(response.data[0])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <NavBar />
      {company.length === 0 ? (
        <p> {t("contact.Loading...")}</p>
      ) : (
        
          <div key={company.id} className="d-flex justify-content-center  mt-4">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto   mb-4 p-5 border rounded  border-dark ">
              <h1>{company.name}</h1>

              <img
                src={company.profile_picture}
                alt={company.name}
                className="company-image"
              />
              <p>
                {t("companies.Keywords")}
                {company.keywords}
              </p>
              <p>
                {t("companies.Country")} {company.country}
              </p>
              <p>
                {t("companies.Web Address")} {company.web_address || "N/A"}
              </p>
              <p>
                {t("company.More Info")} {company.more_info}
              </p>
              <p>
                {t("company.Category")} {company.category}
              </p>
              <p>
                {t("company.Sub-Catgory")}
                {company.subcategory}
              </p>
              <p>
                {t("company.Membership")} {company.membership}
              </p>
            </div>
          </div>
        
      )}
    </div>
  );
};

export default Company;
