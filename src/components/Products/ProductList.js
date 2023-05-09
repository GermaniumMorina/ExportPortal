import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewItem.css";
import Button from "react-bootstrap/Button";
import { useEffect} from "react";



import axios from "axios";
import moment from "moment";
const ProductList = () => {
   const navigate = useNavigate();
  const [exportProducts, setExportProducts] = useState([]);
  const getExportProducts = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const apiExportProducts = await axios.get(
      "http://127.0.0.1:8000/api/elist",
      data
    );
    setExportProducts(apiExportProducts.data.data);
  };
  useEffect(() => {
    getExportProducts();
  }, []);
    const handleNavigateItem = (id) => {
      navigate("/ExportList/" + id);
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
      <div className="d-flex justify-content-center ">Export Details</div>
      <div >
        <div className="d-flex justify-content-center ">
          {exportProducts.map((exportProduct) => {
            return (
              <div key={exportProduct.id}>
                <div>
                  <p>country: {exportProduct.country}</p>
                  <p>price: {exportProduct.price}</p>
                  <p>name: {exportProduct.name}</p>
                  <p>description: {exportProduct.description}</p>
                  <p>created at: {formatDate(exportProduct.created_at)}</p>
                 
                </div>

                <div>
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

export default ProductList;