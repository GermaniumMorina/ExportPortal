import React, { useState, useEffect } from "react";
import NavBar from "../Navigation/NavBar";
import "./Marketplace.css";
import axios from "axios";

export const Marketplace = () => {
  const [productList, setProductList] = useState([]);
  const userId = localStorage.getItem("userId");

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:8000/api/interstedProduct/${userId}`);
    setProductList(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <section className="container">
        <div className="left-half">
          <article className="product-box">
            <h3>Did you buy this?</h3>
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
        <div className="right-half">
          <article className="product-box">
          <h3>Confirm sold products</h3>
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
