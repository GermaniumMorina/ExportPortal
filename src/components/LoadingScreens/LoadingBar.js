import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

export default function LoadingBar() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      </div>
    </div>
  );
}
