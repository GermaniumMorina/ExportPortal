import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
   
const Companies = () => {
  const [companyList, setCompanyList] = useState([]);
  const navigate = useNavigate();
  const getCompanies = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8000/api/CompanyList",
      data
    );

    setCompanyList(response.data.data);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  console.log(companyList);

  const tableStyle = {
    border: "1px solid black",
    margin: "30px",
  };

  const tdStyle = {
    padding: "10px",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
  };
  
  const handleShowMore = (id) => {
    navigate(`/companies/${id}`);
  };
  
  return (
    <div>
      <NavBar />
      {companyList.map((company) => (
        <div style={tableStyle}>
          <table>
            <tbody>
              <tr>
                <td style={tdStyle}>Name:</td>
                <td style={tdStyle}>{company.name}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Keywords:</td>
                <td style={tdStyle}>{company.keywords}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Country:</td>
                <td style={tdStyle}>{company.country}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Web Address:</td>
                <td style={tdStyle}>{company.web_address || "N/A"}</td>
              </tr>
              <tr>
                <td style={tdStyle}>More Info:</td>
                <td style={tdStyle}>{company.more_info}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Budget:</td>
                <td style={tdStyle}>{company.budged}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Type:</td>
                <td style={tdStyle}>{company.type}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Taxpayer Office:</td>
                <td style={tdStyle}>{company.taxpayer_office}</td>
              </tr>
              <tr>
                <td style={tdStyle}>TIN:</td>
                <td style={tdStyle}>{company.TIN}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Profile Picture:</td>
                <td style={tdStyle}>
                  {company.profile_picture && (
                    <img
                      src={company.profile_picture}
                      alt={company.name}
                      style={imgStyle}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => handleShowMore(company.id)}>View Company</button>

        </div>
      ))}
    </div>
  );
};

export default Companies;
