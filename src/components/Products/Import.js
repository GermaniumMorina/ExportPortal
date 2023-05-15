import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Import = () => {
  const navigate = useNavigate();
  const [importProducts, setImportProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getImportProducts = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const apiImportProducts = await axios.get(
      "http://127.0.0.1:8000/api/ilist",
      data
    );
    setImportProducts(apiImportProducts.data.data);
  };

  const getCategories = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const apiCategories = await axios.get(
      "http://127.0.0.1:8000/api/productcategory",
      data
    );
    setCategories(apiCategories.data.data);
  };

  useEffect(() => {
    getImportProducts();
    getCategories();
  }, []);

  useEffect(() => {
    console.log("Selected Categories:", selectedCategories);
  }, [selectedCategories]);

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== name));
    }
  };
  
  const filteredProducts = selectedCategories.length > 0 
    ? importProducts.filter(product => selectedCategories.includes(product.category_name)) // I changed 'product.category' to 'product.category_name'
    : importProducts;

  const handleNavigateItem = (id) => {
    navigate("/ImportItem/" + id);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/view/${id}`);
      console.log("View request successful:", response);
    } catch (error) {
      console.error("Error viewing product:", error);
    }
  };

  const formatDate = (date) => {
    const now = moment();
    const created = moment(date);
    const diffInHours = now.diff(created, "hours");
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-4 text-primary">
        <h1> Import List</h1>
      </div>
      <div className="d-flex justify-content-center mt-4">
      {categories.map(category => (
          <Form.Check 
            type="checkbox" 
            id={`category-${category.name}`} 
            label={category.name} 
            name={category.name} 
            onChange={handleCheckboxChange} 
            className="m-2"
          />
      ))}
      </div>
      <div>
        <div>
          {filteredProducts.map((importProduct) => (
            <div
              key={importProduct.id}
              className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto border m-3 p-4 border-dark rounded">
              <div>
                <p>country: {importProduct.country}</p>
                <p>price: {importProduct.price}</p>
                <p>name: {importProduct.name}</p>
                <p>description: {importProduct.description}</p>
                <p>created at: {formatDate(importProduct.created_at)}</p>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => {
                    handleNavigateItem(importProduct.id);
                    handleView(importProduct.id);
                  }}
                >
                  View More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Import;