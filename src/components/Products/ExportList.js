import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import moment from "moment";
const ExportList = () => {
  const navigate = useNavigate();
  const [exportProduct, setExportProduct] = useState([]);

  const getExportProduct = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/api/elist/" + id,
      data
    );
    const apiExportProducts = response.data.data;
    setExportProduct(apiExportProducts);
  };
  let { id } = useParams();
  useEffect(() => {
    getExportProduct(id);
  }, []);
  const handleBack = () => {
    navigate("/ProductList");
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
  return (
    <div>
      <div className="d-flex justify-content-center">Export Details</div>
      <div>
        <div className="d-flex justify-content-center">
          {exportProduct.map((exportProduct) => {
            return (
              <div key={exportProduct.id}>
                <div>
                  <p>country: {exportProduct.country}</p>
                  <p>price: {exportProduct.price}</p>
                  <p>name: {exportProduct.name}</p>
                  <p>description: {exportProduct.description}</p>
                  <p>created at: {formatDate(exportProduct.created_at)}</p>
                  <p>views: {exportProduct.views}</p>
                  <p>category: {exportProduct.category}</p>
                  <a href="https://www.facebook.com/">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/">
                    <FaInstagram />
                  </a>
                  <a href="https://www.twitter.com/">
                    <FaTwitter />
                  </a>
                </div>
                <div>
                  <Button onClick={handleBack}>Back</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExportList;