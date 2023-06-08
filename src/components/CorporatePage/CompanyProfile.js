
import { useTranslation } from "react-i18next";
import companylogo from "./Corp.png"
import "./CompanyProfile.css"
const CompanyProfile = () => {

  const { t } = useTranslation();


  return (
    <div className="height-controller-container">
      <div className="company-data-text">
      <h1>{t("company.Company Profile")}</h1>
<br/>
        <img src={companylogo} alt="Protecht" className="companylogo"/>

       
          <div>
            <p>
              {t("companies.Name")} Protecht
            </p>
            <p>
              {t("companies.Country")} Kosovo
            </p>
            <p>
              {t("companies.Keywords")} #Cybersecurity,  #Web Services,  #Web Developer Services
            </p>
            <p>
              {t("companies.Web Address")} <a href="https://www.protecht.ch/"> Protecht.ch</a>
            </p>
           
          </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
