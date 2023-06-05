import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import axios from "axios";

import { useTranslation } from "react-i18next";
export const Marketplace = () => {
  const [productList, setProductList] = useState([]);
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/interstedProduct/${userId}`
    );
    setProductList(response.data);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmBuy = async () => {
    await axios.post(`http://localhost:8000/api/buyConfirmed`, {
      userId: userId,
      productId: productId,
      confirmation: true,
    });
  };

  const denyBuy = async () => {
    await axios.post(`http://localhost:8000/api/buyConfirmed`, {
      userId: userId,
      productId: productId,
      confirmation: false,
    });
  };
  const { t } = useTranslation();

  return (
    <div>
      <section className="container" id="main-container">
        <div className="left-half">
          <article className="product-box">
            <h3>{t("marketplace.Did you buy this")}</h3>
            {productList.map((product, index) => (
              <div className="product" key={index}>
                <p>
                  {t("marketplace.Product name")}

                  {product.name}
                </p>
                <p>
                  {t("marketplace.Product price")}
                  {product.price}
                </p>
                <p>
                  {t("marketplace.Product description")}
                  {product.description}
                </p>
                <button className="yes-button" onClick={confirmBuy}>
                  {t("marketplace.Yes")}
                </button>
                <button className="no-button" onClick={denyBuy}>
                  {t("marketplace.No")}
                </button>
              </div>
            ))}
          </article>
        </div>
        <div className="right-half">
          <article className="product-box">
            <h3> {t("marketplace.Did you sell this product")}</h3>
            {productList.map((product, index) => (
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
                <button className="no-button"> {t("marketplace.No")}</button>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};
