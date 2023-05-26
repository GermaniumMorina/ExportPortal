import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navigation/NavBar";
import LoadingBar from "../LoadingScreens/LoadingBar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
//es-lint-disable-next-line
import { useNavigate, Navigate } from "react-router";

export const ProductSellTest = () => {
  const price = 43;
  
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") );
  const chatprice = tokens - 10;
  let userId = localStorage.getItem("userId");
  
  const fetchTokenValue = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/token/${userId}`
      );
      setTokens(response.data.amount);
    } catch (error) {
      // Handle error
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokenValue();
    }, 5000);
    
    return () => {
      clearInterval(interval);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleChat = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/token/${userId}`);
      const tokens = response.data.amount;
      
      if (tokens < 10) {
        alertify.alert("You should have at least 10 tokens to chat with the owner!");
      } else {
        alertify.confirm(
          "Chat with the owner? This will take 10 tokens from your account.",
          async () => {
            try {
              setLoading(true);
              await axios.put(`http://localhost:8000/api/updateToken/${userId}`, {
                amount: chatprice,
              });
              // Handle success or redirect to a success page
            } catch (error) {
              // Handle error
            }
            setLoading(false);
            
            // Navigate to the contact form page
            // Replace "Navigate" with the appropriate code for navigating in your application
            Navigate("/ContactFrom");
          },
          () => {
            // Cancel callback
          }
        );
      }
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="loading-screen">
          <LoadingBar />
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
