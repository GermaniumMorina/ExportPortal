  import axios from 'axios';
  import React, { useState, useEffect } from 'react';
  import Form from "react-bootstrap/Form";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import NavBar from '../Navigation/NavBar';
  
  const CompanyListing = () => {
    const [companyList, setCompanyList] = useState([]);
    const [categories , setCategories] = useState([]);
    const [selectedCategories , setSelectedCategories] = useState([]);
    
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

    const getCategories = async () =>{
      const data = {
        headers: {
          Accept: "application/json",
        },
      };
      const apiCategories = await axios.get("http://127.0.0.1:8000/api/category",
      data
      );
      setCategories(apiCategories.data.data);
    };

    useEffect(() => {
      getCompanies();
      getCategories();
    }, []);

    const handleCheckboxChange = (event) => {
      const { checked, id } = event.target;
      if (checked) {
        setSelectedCategories([...selectedCategories, parseInt(id)]);
      } else {
        setSelectedCategories(selectedCategories.filter(category => category !== parseInt(id)));
      }
    };

    const filteredCompanies = selectedCategories.length > 0 
  ? companyList.filter(company => selectedCategories.includes(company.category_id)) 
  : companyList;

    return (
      <div className="container">
        <NavBar />
        <div className="d-flex justify-content-center mt-4">
        {categories.map(category => (
            <Form.Check 
            type="checkbox" 
            id={category.id.toString()} 
            label={category.name} 
            name={category.name} 
            onChange={handleCheckboxChange} 
            className="m-2"
            />
            ))}
        </div>

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
            {filteredCompanies.map(company => (
              <tr>
                <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                  />
                  </div>
                </td>
                <th scope="row">{company.name}</th>
                <td>{company.keywords}</td>
                <td>{company.country}</td>
                <td>{company.more_info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default CompanyListing;
