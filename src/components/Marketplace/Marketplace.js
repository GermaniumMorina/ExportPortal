import React, { useState, useEffect } from "react";
import NavBar from "../Navigation/NavBar";
import "./Marketplace.css";
import axios from "axios";

export const Marketplace = () => {
  const [productList, setProductList] = useState([]);
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");


  const getProducts = async () => {
    const response = await axios.get(`http://localhost:8000/api/interstedProduct/${userId}`);
    setProductList(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmBuy = async () => {
   await axios.post(`http://localhost:8000/api/buyConfirmed`,{
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

  return (
    <div>
      <NavBar />
      <section className="container" id="main-container">
        <div className="left-half">
          <article className="product-box">
            <h3>Did you buy this?</h3>
            {productList.map((product, index) => (
              <div className="product" key={index}>
                <p>Product name: {product.name}</p>
                <p>Product price: {product.price}</p>
                <p>Product description: {product.description}</p>
                <button className="yes-button" onClick={confirmBuy}>Yes</button>
                <button className="no-button" onClick={denyBuy}>No</button>
              </div>
            ))}
          </article>
        </div>
        <div className="right-half">
          <article className="product-box">
          <h3>Did you sell this product</h3>
            {productList.map((product, index) => (
              <div className="product" key={index}>
                <p>Product name: {product.name}</p>
                <p>Product price: {product.price}</p>
          
                <p>Product description: {product.description}</p>
                <button className="yes-button">Yes</button>
                <button className="no-button">No</button>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};
