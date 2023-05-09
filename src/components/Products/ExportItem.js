import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
const ExportItem = () => {
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

  return (
    <div>
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>Export Details</h1>
      </div>
      <div>
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto   mb-4 p-5 border rounded  border-dark ">
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
                  <p>category: {exportProduct.category_name}</p>
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

export default ExportItem;