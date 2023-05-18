import React, { useState } from "react";
import axios from "axios";
import NavBar from "../Navigation/NavBar";

export const ProductSellTest = () => {
  const price = 43;
  
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || 0);
  const chatprice =tokens - 10;
  let userId = localStorage.getItem("userId");
  
  
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
          await axios.put(`http://localhost:8000/api/updateToken/${userId}`,
          {
            amount: chatprice,
          }
          );
          setLoading(false);
          // Handle success or redirect to a success page
        } catch (error) {
          setLoading(false);
          // Handle error
        }
        const response = await axios.get(
          `http://localhost:8000/api/token/{userId}`
        );
        setTokens(response.data.amount);
      }
    }
  };
  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <p>{tokens}</p>
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

          <button onClick={handleChat}>Chat with owner</button>
        </div>
      )}
    </div>
  );
};
