import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import moment from "moment";
import NavBar from "../../Navigation/NavBar";
import { useTranslation } from "react-i18next";
import LoadingBar from "../../LoadingScreens/LoadingBar.js";




const ImportItem = () => {
  const navigate = useNavigate();
  const [importProduct, setImportProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  const { t } = useTranslation();

  const getImportProduct = async () => {
    try {
      const data = {
        headers: {
          Accept: "application/json",
        },
      };

      const response = await axios.get(
        `http://127.0.0.1:8000/api/ilist/${id}`,
        data
      );
      const apiImportProducts = response.data[0][0];
      setImportProduct(apiImportProducts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching import product:", error);
    }
  };

  useEffect(() => {
    getImportProduct(id);
    //eslint-disable-next-line 
      }, [id]);

  const handleBack = () => {
    navigate("/Import");
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

  if (isLoading) {
    return <LoadingBar/>
  }

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>{t("import.Import Details")}</h1>
      </div>
      <div>
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto   mb-4 p-5 border rounded  border-dark ">
          <div key={importProduct.id}>
            <div>
              <p>
                {t("companies.Name")} {importProduct.name}
              </p>
              <p>
                {t("companies.Country")} {importProduct.country}
              </p>
              <p>
                {t("import.Price")}
                {importProduct.price}
              </p>

              <p>
                {t("import.Description")} {importProduct.description}
              </p>
              <p>
                {t("import.Created at")}
                {formatDate(importProduct.created_at)}
              </p>
              <p>
                {t("import.Views")} {importProduct.views}
              </p>
              <p>
                {t("company.Category")} {importProduct.category_name}
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
      </div>
    </div>
  );
};

export default ImportItem;
