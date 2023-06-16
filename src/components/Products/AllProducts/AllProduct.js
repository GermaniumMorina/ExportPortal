import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import LoadingBar from "../../LoadingScreens/LoadingBar";
import "alertifyjs/build/css/alertify.css";
import "./AllProduct.css";
import ImportTruck from "./import.png";
import ExportTruck from "./export.png";
import { useMediaQuery } from "react-responsive";

const AllProduct = () => {
  const [exportProducts, setExportProducts] = useState([]);
  const [importProducts, setImportProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("export");
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({query:"(max-width :450px"});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apiExportProducts, apiImportProducts] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/elist"),
          axios.get("http://127.0.0.1:8000/api/ilist")
        ]);

        setExportProducts(apiExportProducts.data);
        setImportProducts(apiImportProducts.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSwipeRight = () => {
    setActiveTab("export");
  };
  
  const handleSwipeLeft = () => {
    setActiveTab("import");
  };
  
  const handlers = useSwipeable({
    onSwipedRight: handleSwipeRight,
    onSwipedLeft: handleSwipeLeft
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  return (isPortrait || isMobile || isTabletOrMobile) ?(
    <div>
    <section {...handlers}>
      <div className="swipe-indicator">
        <span>Xport</span>
      <div className={`swipe-indicator-circle ${activeTab === "import" ? "active" : ""}`} onClick={handleSwipeRight}></div>
      <span>Import</span>

        <div className={`swipe-indicator-circle ${activeTab === "export" ? "active" : ""}`} onClick={handleSwipeLeft}></div>
      </div>
      <div className="left-half">
          {activeTab === "export" && (
            <article className="product-box">
              <div className="d-flex justify-content-center mt-4 mb-4">
                <img src={ExportTruck} alt="Export truck" className="import-truck-image" />
                <h3>Export Products</h3>
              </div>
              {exportProducts.map((product, index) => (
                <div className="products" key={index}>
                  <p>{t("marketplace.Product name")} {product.name}</p>
                  <p>Country: {product.country}</p>
                  <p>{t("marketplace.Product price")}: {product.price}</p>
                  <p>{t("marketplace.Product description")}: {product.description}</p>
                  <p>Created: {formatDate(product.created_at)}</p>
                </div>
              ))}
            </article>
          )}
        </div>
        <div className="right-half">
          {activeTab === "import" && (
            <article className="product-box">
              <div className="d-flex justify-content-center mt-4 mb-4">
                <img src={ImportTruck} alt="Import truck" className="import-truck-image" />
                <h3>Import Products</h3>
              </div>
              {importProducts.map((product, index) => (
                <div className="products" key={index}>
                  <p>{t("marketplace.Product name")} {product.name}</p>
                  <p>Country: {product.country}</p>
                  <p>{t("marketplace.Product price")} {product.price}</p>
                  <p>{t("marketplace.Product description")}: {product.description}</p>
                  <p>Created: {formatDate(product.created_at)}</p>
                </div>
              ))}
            </article>
          )}
        </div>
      </section>
    </div>
  ):(
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
  )
};

export default AllProduct;
