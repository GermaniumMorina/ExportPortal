import React, { useEffect, useState } from "react";
import LoadingText from "../LoadingScreens/LoadingText";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BankAcc = () => {
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const getCompanyData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/corporate/26`
      );
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
        <p>{t("corporatePage.Bank Account")}</p>
        {isLoading ? (
          <LoadingText />
        ) : (
          <div>
            <p>IBAN: {companyData.bank}</p>
            <p>
              {t("corporatePage.Account")} {companyData.account}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAcc;
