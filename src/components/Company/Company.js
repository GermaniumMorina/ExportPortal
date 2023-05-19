import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navigation/NavBar";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div>
      <NavBar />
       {company.length === 0 ? (
        <p>Loading...</p>
      ) : (
        company.map((company) => (

          <div key={company.id} className="d-flex justify-content-center  mt-4">
            
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto   mb-4 p-5 border rounded  border-dark ">
            <h1>{company.name}</h1>

            <img src={company.profile_picture} alt={company.name} className="company-image"/>
            <p>Keywords: {company.keywords}</p>
            <p>Country: {company.country}</p>
            <p>Web Address: {company.web_address || "N/A"}</p>
            <p>More Info: {company.more_info}</p>
            <p>Category: {company.category}</p>
            <p>Sub-Catgory: {company.subcategory}</p>
            <p>Membership: {company.membership}</p>

          </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Company;
