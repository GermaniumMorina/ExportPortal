import React from "react";
import axios from "axios";
import NavBar from "../Navigation/NavBar";
export const ProductSellTest = () => {
  const price = 100;

  const handleBuy = async () => {
    console.log("Buy button clicked");
    const tokens = localStorage.getItem("tokens");
    await axios.put("http://localhost:8000/api/updateToken/11", {
      amount: tokens - price,
    });
  };

  return (
    <div>
      <NavBar />
      <h1>This is a test site</h1>
      <br />
      <h2>Product Name: Test</h2>
      <br />
      <br />
      <br />

      <h3>Product Description: Test product</h3>
      <br />

      <p>Product Price: {price}</p>
      <br />

      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};
