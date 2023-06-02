import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import moment from "moment";
import NavBar from "../../Navigation/NavBar";
import { useTranslation } from "react-i18next";
import LoadingBar from "../../LoadingScreens/LoadingBar.js";

const ImportItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [importProduct, setImportProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || 0);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const chatPrice = tokens - 10;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getImportProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ilist/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
  
        const apiImportProducts = response.data[0];
        console.log(response);
        setImportProduct(apiImportProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching import product:", error);
      }
    };

    getImportProduct();
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

  const handleChat = async () => {
    if (tokens < 10) {
      alert("You should have at least 10 tokens to chat with the owner!");
    } else {
      const confirmChat = window.confirm(
        "Chat with the owner? This will take 10 tokens from your account."
      );

      if (confirmChat) {
        setLoading(true);
        try {
          await axios.put(`http://localhost:8000/api/updateToken/${userId}`, {
            amount: chatPrice,
          });
          setLoading(false);
          navigate("/ContactFrom/" + id);
        } catch (error) {
          setLoading(false);
          console.error("Error updating token:", error);
        }
        try {
          const response = await axios.get(
            `http://localhost:8000/api/token/${userId}`
          );
          setTokens(response.data.amount);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    }
  };

  if (isLoading) {
    return <LoadingBar />;
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
              <Button className="mx-3" onClick={handleBack}>
                {t("import.Back")}
              </Button>
              <Button onClick={handleChat}>
                {t("import.Chat with owner")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportItem;
