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
        <p>Loading...</p>
      ) : (
        <div className="d-flex justify-content-center mt-4">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mb-4 p-5 border rounded border-dark">
            {company.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <img
                  src={item.profile_picture}
                  alt={item.name}
                  className="company-image"
                />
                <p>
                  {t("companies.Keywords")} {item.keywords}
                </p>
                <p>
                  {t("companies.Country")} {item.country}
                </p>
                <p>
                  {t("companies.Web Address")} {item.web_address || "N/A"}
                </p>
                <p>
                  {t("company.More Info")} {item.more_info}
                </p>
                <p>
                  {t("company.Category")} {item.category}
                </p>
                <p>
                  {t("company.Sub-Catgory")} {item.subcategory}
                </p>
                <p>
                  {t("company.Membership")} {item.membership}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
