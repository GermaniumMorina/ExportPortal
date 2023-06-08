import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import LoadingBar from "../../LoadingScreens/LoadingBar";
// import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./AllProduct.css"
import ImportTruck from "./import.png";
import ExportTruck from "./export.png";

const AllProduct = () => {
//   const navigate = useNavigate();
  const [exportProducts, setExportProducts] = useState([]);
  const [importProducts, setImportProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const getExportProducts = async () => {
    try {
      const apiExportProducts = await axios.get(
        "http://127.0.0.1:8000/api/elist"
      );
      setExportProducts(apiExportProducts.data);
      console.log(apiExportProducts.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching export products:", error);
      setIsLoading(false);
    }
  };

  const getImportProducts = async () => {
    try {
      const apiImportProducts = await axios.get(
        "http://127.0.0.1:8000/api/ilist"
      );
      setImportProducts(apiImportProducts.data);
    } catch (error) {
      console.error("Error fetching import products:", error);
    }
  };

  useEffect(() => {
    getExportProducts();
    getImportProducts();
  }, []);

//   const handleNavigateItem = (id) => {
//     navigate("/ExportItem/" + id);
//   };

//   const handleView = async (id) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/view/${id}`);
//       console.log("View request successful:", response);
//     } catch (error) {
//       console.error("Error viewing product:", error);
//     }
//   };

//   const handlePageChange = (page) => {
//     console.log("Page changed to:", page);
//     alertify.success("Page changed to:", page);
//     alertify.error("Pagination doesn't work yet");

//     // const apiEndpoint = ``;
//     // axios
//     //   .get(apiEndpoint)
//     //   .then((response) => {
//     //     console.log("API response for page", page, ":", response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error fetching data for page", page, ":", error);
//     //   });
//   };

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
    return <LoadingBar />;
  }

  return (
    <div>
      <section className="container" id="main-container">
        <div className="left-half">
          <article className="product-box">
            <div className="d-flex justify-content-center mt-4 mb-4">
            <img src={ExportTruck} alt="Import truck" className="import-truck-image"/>

              <h3>Export Products</h3>
            </div>{" "}
            {exportProducts.map((product, index) => (
              <div className="products" key={index}>
                <p>
                  {t("marketplace.Product name")} {product.name}
                </p>
                <p>
                  {t("marketplace.Product name")} {product.country}
                </p>
                <p>
                  {t("marketplace.Product price")} {product.price}
                </p>
                
                <p>
                  {t("marketplace.Product description")} {product.description}
                </p>
                <p>
                Created: {formatDate(product.created_at)}
                </p>
              </div>
            ))}
          </article>
        </div>
        <div className="right-half">
          <article className="product-box">
            <div className="d-flex justify-content-center mt-4 mb-4">
            <img src={ImportTruck} alt="Import truck" className="import-truck-image"/>
              <h3>Import Products</h3>
            </div>

            {importProducts.map((product, index) => (
             <div className="products" key={index}>
             <p>
               {t("marketplace.Product name")} {product.name}
             </p>
             <p>
               Country: {product.country}
             </p>
             <p>
               {t("marketplace.Product price")} {product.price}
             </p>
             
             <p>
               {t("marketplace.Product description")}: {product.description}
             </p>
             <p>
             Created: {formatDate(product.created_at)}
             </p>
           </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};

export default AllProduct;
