
import { useTranslation } from "react-i18next";

const BankAcc = () => {
 
  const { t } = useTranslation();
  

  return (
    <div className="height-controller-container">
      <div className="company-data-text">
        <h1>{t("corporatePage.Bank Account")}</h1>
        <h4>Protecht SH.P.K</h4>        
          <div>
            <br/>
            <span>TEB  SH.A</span>
            <p>IBAN: XK401194189937419233</p>
            
            <p>
              {t("corporatePage.Account")} 16910337
            </p>
          </div>
          <div>
            <br/>
            <span>PCB</span>
            <p>IBAN: XK401194189937419233</p>
            
            <p>
              {t("corporatePage.Account")} 16910337
            </p>
          </div>
          <div>
            <br/>
            <span>BKT</span>
            <p>IBAN: XK401194189937419233</p>
            <p>{t("corporatePage.Account")} 16910337</p>
          </div>
      
      </div>
    </div>
  );
};

export default BankAcc;
