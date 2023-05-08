import axios from 'axios';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';



const CompanyListing = () => {
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());
  const [displayedCompanies, setDisplayedCompanies] = useState([]);

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

  const toggleCompany = (companyId) => {
    if (selectedCompanies.has(companyId)) {
      selectedCompanies.delete(companyId);
      setDisplayedCompanies(displayedCompanies.filter((company) => company.id !== companyId));
    } else {
      selectedCompanies.add(companyId);
      const selectedCompany = companyList.find((company) => company.id === companyId);
      setDisplayedCompanies([...displayedCompanies, selectedCompany]);
    }
    setSelectedCompanies(new Set(selectedCompanies));
  };

  return (
    <div className="container">
      <table className="table table-striped table-bordered table-hover">
        <thead className="bg-info text-black">
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Name</th>
            <th scope="col">Keywords</th>
            <th scope="col">Country</th>
            <th scope="col">More Info</th>
          </tr>
        </thead>
        <tbody>
          {companyList.map(company => (
            <tr key={company.id}>
              <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => toggleCompany(company.id)}
                  checked={selectedCompanies.has(company.id)}
                />
                </div>
              </td>
              <td scope="row">{company.name}</td>
              <td>{company.keywords}</td>
              <td>{company.country}</td>
              <td>{company.more_info}</td>
            </tr>
          ))}
        </tbody>
      </table>


        {/* display selected companys  */}
      {displayedCompanies.length > 0 && (
        <div className="mt-5">
          <h3>Selected Companies Information:</h3>
          {displayedCompanies.map((company) => (
            <div key={company.id}>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" value={company.name} readOnly />
                </div>
                <div className="form-group">
                  <label>Keywords:</label>
                  <input type="text" className="form-control" value={company.keywords} readOnly />
                </div>
                <div className="form-group">
                  <label>Country:</label>
                  <input type="text" className="form-control" value={company.country} readOnly />
                </div>
                <div className="form-group">
                  <label>More Info:</label>
                  <input type="text" className="form-control" value={company.more_info} readOnly />
                </div>
                <div className="form-group">
                  <label>Budged:</label>
                  <input type="text" className="form-control" value={company.budged} readOnly />
                </div>
                <div className="form-group">
                  <label>Type:</label>
                  <input type="text" className="form-control" value={company.type} readOnly />
                </div>
                <div className="form-group">
                  <label>Taxpayer Office:</label>
                  <input type="text" className="form-control" value={company.taxpayer_office} readOnly />
                </div>
                <div className="form-group">
                  <label>TIN:</label>
                  <input type="text" className="form-control" value={company.TIN} readOnly />
                </div>
              </form>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default CompanyListing;
