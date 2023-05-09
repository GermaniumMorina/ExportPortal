import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
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
  return (
    <div>
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>   Export List</h1>
      </div>
      <div>
        <div>
          {exportProducts.map((exportProduct) => {
            return (
              <div
                key={exportProduct.id}
                className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto border m-3 p-4 border-dark  rounded"
              >
                <div className="">
                  <p>country: {exportProduct.country}</p>
                  <p>price: {exportProduct.price}</p>
                  <p>name: {exportProduct.name}</p>
                  <p>description: {exportProduct.description}</p>
                  <p>created at: {formatDate(exportProduct.created_at)}</p>
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

export default ProductList;
