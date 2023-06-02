import React from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useTranslation } from "react-i18next";
const AlertTest = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("alertTest.Alert Test Page")}</h1>
      <h2>{t("alertTest.Here you can test pop ups")}</h2>
      <br />
      <br />
      <br />

      <button
        onClick={() =>
          alertify.alert("Alert Title", "Alert Message!", function () {
            alertify.success("Success");
          })
        }
      >
        {t("alertTest.Pop Up with OK")}
      </button>
      <br></br>
      <button onClick={() => alertify.error("Error message")}>
        {t("alertTest.Error")}
      </button>
      <br></br>
      <button onClick={() => alertify.warning("Warning message")}>
        {t("alertTest.Warning")}
      </button>
      <br></br>
      <button onClick={() => alertify.success("Success message")}>
        {t("alertTest.Succes")}
      </button>
      <br></br>
      <button onClick={() => alertify.message("Normal message")}>
        {t("alertTest.Any message")}
      </button>
      <br></br>
      <button
        onClick={() =>
          alertify.confirm(
            "This is a confirm dialog.",
            function () {
              alertify.success("Ok");
            },
            function () {
              alertify.error("Cancel");
            }
          )
        }
      >
        {t("alertTest.Confirmation Pop Up")}
      </button>
    </div>
  );
};

export default AlertTest;
