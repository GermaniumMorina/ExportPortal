import React, { useEffect, useState } from "react";
import LoadingText from "../LoadingScreens/LoadingText";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const getCompanyData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/corporate/26`
      );
      console.log(response);
      setCompanyData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="height-controller-container">
      <div className="company-data-text">
        <p>{t("company.Company Profile")}</p>
        {isLoading ? (
          <LoadingText />
        ) : (
          <div>
            <p>
              {t("companies.Name")} {companyData.name}
            </p>
            <p>
              {t("companies.Country")} {companyData.country}
            </p>
            <p>
              {t("companies.Keywords")} {companyData.keywords}
            </p>
            <p>
              {t("companies.Web Address")} {companyData.web_address}
            </p>
            <p>
              {t("company.More Info")} {companyData.more_info}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
