import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import NavBar from "../../Navigation/NavBar";
import { useTranslation } from "react-i18next";

const ExportItem = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Use destructuring to get the id from useParams
  const [exportProduct, setExportProduct] = useState(null); // Initialize with null

  const getExportProduct = async () => {
    try {
      const data = {
        headers: {
          Accept: "application/json",
        },
      };

      const response = await axios.get(
        `http://127.0.0.1:8000/api/elist/${id}`,
        data
      );

      const apiExportProduct = response.data.data; // Update variable name to be singular
      setExportProduct(apiExportProduct);
    } catch (error) {
      console.error("Error fetching export product:", error);
    }
  };

  useEffect(() => {
    getExportProduct(); // Call the function to fetch the export product
    //eslint-disable-next-line 
  }, []); // Pass an empty dependency array to run the effect only once

  const handleBack = () => {
    navigate("/Export");
  };

  const formatDate = (date) => {
    const now = moment();
    const created = moment(date);
    const diffInHours = now.diff(created, "hours");
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    }
  };

  const { t } = useTranslation();
  
  if (!exportProduct) {
    // Render loading or placeholder content if exportProduct is not yet fetched
    return (
      <div>
        <NavBar />
        {/* Add loading or placeholder content here */}
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center mt-4 text-primary">
        <h1>{t("import.Export Details")}</h1>
      </div>
      <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mb-4 p-5 border rounded border-dark">
        <div>
          <p>
            {t("companies.Name")}: {exportProduct.name}
          </p>
          <p>
            {t("companies.Country")}: {exportProduct.country}
          </p>
          <p>
            {t("import.Price")}: {exportProduct.price}
          </p>
          <p>
            {t("import.Description")}: {exportProduct.description}
          </p>
          <p>
            {t("import.Created at")}: {formatDate(exportProduct.created_at)}
          </p>
          <p>
            {t("import.Views")}: {exportProduct.views}
          </p>
          <p>
            {t("company.Category")}: {exportProduct.category_name}
          </p>
          <a href="https://www.facebook.com/" className="m-2">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/" className="m-2">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com/" className="m-2">
            <FaTwitter />
          </a>
        </div>
        <div className="d-flex justify-content-center btn-lg">
          <Button onClick={handleBack}>{t("import.Back")}</Button>
        </div>
      </div>
    </div>
  );
};

export default ExportItem;
