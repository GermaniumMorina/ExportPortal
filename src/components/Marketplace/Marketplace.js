import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LoadingBar from "../LoadingScreens/LoadingBar";
import "alertifyjs/build/css/alertify.css";
import { useMediaQuery } from "react-responsive";
import "./Marketplace.css";

export const Marketplace = () => {
  const userId = localStorage.getItem("userId");
  const [buyProductList, setBuyProductList] = useState([]);
  const [sellProductList, setSellProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("buy");
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem('userId');

        const [buyProductsResponse, sellProductsResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/buyerList/${userId}`),
          axios.get(`http://localhost:8000/api/sellerList/${userId}`),
        ]);

        setBuyProductList(buyProductsResponse.data);
        setSellProductList(sellProductsResponse.data);
        console.log(buyProductList);
        setIsLoading(false); // Set isLoading to false after fetching data
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set isLoading to false in case of an error
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, []);

  const confirmBuy = async (productId) => {
    console.log({ userId: userId, productId: productId, confirmation: true });
    try {
      await axios.post(`http://localhost:8000/api/buyConfirmed`, {
        user_id: userId,
        product_id: productId,
        confirmation: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const denyBuy = async (productId) => {
    try {
      await axios.post(`http://localhost:8000/api/buyConfirmed`, {
        user_id: userId,
        product_id: productId,
        confirmation: false,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const confirmSell = async (productId) => {
    console.log({ userId: userId, productId: productId, confirmation: true });
    try {
      await axios.post(`http://localhost:8000/api/sellConfirm`, {
        user_id: userId,
        product_id: productId,
        confirmation: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const denySell = async (productId) => {
    try {
      await axios.post(`http://localhost:8000/api/sellConfirm`, {
        user_id: userId,
        product_id: productId,
        confirmation: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { t } = useTranslation();

  const handleSwipeRight = () => {
    setActiveTab("buy");
  };

  const handleSwipeLeft = () => {
    setActiveTab("sell");
  };

  const handlers = useSwipeable({
    onSwipedRight: handleSwipeRight,
    onSwipedLeft: handleSwipeLeft,
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  return isPortrait || isMobile || isTabletOrMobile ? (
    <div>
      <section {...handlers}>
        <div className="swipe-indicator">
          <span>Buy</span>
          <div
            className={`swipe-indicator-circle ${
              activeTab === "sell" ? "active" : ""
            }`}
            onClick={handleSwipeRight}
          ></div>
          <span>Sell</span>
          <div
            className={`swipe-indicator-circle ${
              activeTab === "buy" ? "active" : ""
            }`}
            onClick={handleSwipeLeft}
          ></div>
        </div>
        <div className="left-half">
          {activeTab === "buy" && (
            <article className="product-box">
              <div className="d-flex justify-content-center mt-4 mb-4">
                <h3>{t("marketplace.Did you buy this")}</h3>
              </div>
              {buyProductList.map((product, index) => (
                <div className="product" key={index}>
                  <p>
                    {t("marketplace.Product name")} {product.name}
                  </p>
                  <p>
                    {t("marketplace.Product price")} {product.price}
                  </p>
                  <p>
                    {t("marketplace.Product description")} {product.description}
                  </p>
                  <button
                    className="yes-button"
                    onClick={() => confirmBuy(product.id)} // Pass productId
                  >
                    {t("marketplace.Yes")}
                  </button>
                  <button
                    className="no-button"
                    onClick={() => denyBuy(product.id)} // Pass productId
                  >
                    {t("marketplace.No")}
                  </button>
                </div>
              ))}
            </article>
          )}
        </div>
        <div className="right-half">
          {activeTab === "sell" && (
            <article className="product-box">
              <div className="d-flex justify-content-center mt-4 mb-4">
                <h3>{t("marketplace.Did you sell this product")}</h3>
              </div>
              {sellProductList.map((product, index) => (
                <div className="product" key={index}>
                  <p>
                    {t("marketplace.Product name")} {product.name}
                  </p>
                  <p>
                    {t("marketplace.Product price")} {product.price}
                  </p>
                  <p>
                    {t("marketplace.Product description")} {product.description}
                  </p>
                  <button
                    className="yes-button"
                    onClick={() => confirmSell(product.id)} // Pass productId
                  >
                    {t("marketplace.Yes")}
                  </button>
                  <button
                    className="no-button"
                    onClick={() => denySell(product.id)} // Pass productId
                  >
                    {t("marketplace.No")}
                  </button>
                </div>
              ))}
            </article>
          )}
        </div>
      </section>
    </div>
  ) : (
    <div>
      <section className="container" id="main-container">
        <div className="left-half">
          <article className="product-box">
            <div className="d-flex justify-content-center mt-4 mb-4">
              <h3>{t("marketplace.Did you buy this")}</h3>
            </div>
            {buyProductList.map((product, index) => (
              <div className="product" key={index}>
                <p>
                  {t("marketplace.Product name")} {product.name}
                </p>
                <p>
                  {t("marketplace.Product price")} {product.price}
                </p>
                <p>
                  {t("marketplace.Product description")} {product.description}
                </p>
                <button
                  className="yes-button"
                  onClick={() => confirmSell(product.id)} // Pass productId
                >
                  {t("marketplace.Yes")}
                </button>
                <button
                  className="no-button"
                  onClick={() => denySell(product.id)} // Pass productId
                >
                  {t("marketplace.No")}
                </button>
              </div>
            ))}
          </article>
        </div>
        <div className="right-half">
          <article className="product-box">
            <div className="d-flex justify-content-center mt-4 mb-4">
              <h3>{t("marketplace.Did you sell this product")}</h3>
            </div>
            {sellProductList.map((product, index) => (
              <div className="product" key={index}>
                <p>
                  {t("marketplace.Product name")} {product.name}
                </p>
                <p>
                  {t("marketplace.Product price")} {product.price}
                </p>
                <p>
                  {t("marketplace.Product description")} {product.description}
                </p>
                <button className="yes-button">{t("marketplace.Yes")}</button>
                <button className="no-button">{t("marketplace.No")}</button>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};
