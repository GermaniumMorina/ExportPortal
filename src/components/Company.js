import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Company = () => {
  const { id } = useParams();
  const [company, setCompany] = useState([]);

  const getCompany = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/company_details/${id}`);
    setCompany(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div>
       {company.length === 0 ? (
        <p>Loading...</p>
      ) : (
        company.map((company) => (
          <div key={company.id}>
            <h1>{company.name}</h1>
            <img src={company.profile_picture} alt={company.name} />
            <p>Keywords: {company.keywords}</p>
            <p>Country: {company.country}</p>
            <p>Web Address: {company.web_address || "N/A"}</p>
            <p>More Info: {company.more_info}</p>
            <p>Budget: {company.budged}</p>
            <p>Type: {company.type}</p>
            <p>Taxpayer Office: {company.taxpayer_office}</p>
            <p>TIN: {company.TIN}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Company;
