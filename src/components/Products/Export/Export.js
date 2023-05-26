import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Form from "react-bootstrap/Form";
import NavBar from "../../Navigation/NavBar";
import LoadingBar from "../../LoadingScreens/LoadingBar"; // Import your loading component

const ProductList = () => {
  const navigate = useNavigate();
  const [exportProducts, setExportProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const getExportProducts = async () => {
    try {
      const data = {
        headers: {
          Accept: "application/json",
        },
      };
      const apiExportProducts = await axios.get(
        "http://127.0.0.1:8000/api/elist",
        data
      );
      setExportProducts(apiExportProducts.data[0]);
      console.log(apiExportProducts.data[0]);

      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.error("Error fetching export products:", error);
      setIsLoading(false); // Set loading state to false on error
    }
  };

  const getCategories = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getExportProducts();
    getCategories();
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== name));
    }
  };

  const filteredProducts = selectedCategories.length > 0
    ? exportProducts.filter((product) => selectedCategories.includes(product.category_name))
    : exportProducts;

  const handleNavigateItem = (id) => {
    navigate("/ExportItem/" + id);
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

  if (isLoading) {
    // Render loading screen while data is being fetched
    return <LoadingBar />;
  }

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>   Export List</h1>
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
          {filteredProducts.map((exportProduct) => {
            return (
              <div
                key={exportProduct.id}
                className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto border m-3 p-4 border-dark  rounded"
              >
                <div>
                  <p>Name: {exportProduct.name}</p>
                  <p>Country: {exportProduct.country}</p>
                  <p>Price: {exportProduct.price}</p>
                  
                  <p>Description: {exportProduct.description}</p>
                  <p>Added: {formatDate(exportProduct.created_at)}</p>
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      handleNavigateItem(exportProduct.id);
                      handleView(exportProduct.id);
                    }}
                  >
                    View More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
