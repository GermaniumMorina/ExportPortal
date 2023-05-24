import React from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const AlertTest = () => {
  return (
    <div>
      <h1>Alert Test Page</h1>
      <h2>Here you can test pop ups</h2>
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
        Pop Up with OK
      </button>
      <br></br>
      <button onClick={() => alertify.error("Error message")}>Error</button>
      <br></br>
      <button onClick={() => alertify.warning("Warning message")}>
        Warning
      </button>
      <br></br>
      <button onClick={() => alertify.success("Success message")}>
        Succes
      </button>
      <br></br>
      <button onClick={() => alertify.message("Normal message")}>
        Any message
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
        Confirmation Pop Up
      </button>
    </div>
  );
};

export default AlertTest;
