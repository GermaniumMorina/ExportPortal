
import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";
  
export default function LoadingCircle() {
  return (
    <div className="loader">
 
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      />
    </div>
  );
}