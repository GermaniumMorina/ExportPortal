import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";

const Import = () => {
  const navigate = useNavigate();
  const [importProducts, setImportProducts] = useState([]);
  //calling the GET method to get the "import" data
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
  const handleView = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/view/${id}`);
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
  // const date = axios.get("http://127.0.0.1:8000/api/date/" + id);
  useEffect(() => {
    getImportProducts();
  }, []);
  //handling the navigation through pages with buttons
  const handleNavigateItem = (id) => {
    navigate("/ImportItem/" + id);
  };
  const handleNavigateAddReq = () => {
    navigate("/AddNewItem");
  };
  return (
    <div>
      <div>
        <div> Buying Request</div>
        <div>
          <Button onClick={handleNavigateAddReq} variant="success">
            Add request free
          </Button>
        </div>
      </div>
      <div>
        <table>
          <tbody>
            {importProducts.map((importProduct) => {
              return (
                <tr key={importProduct.id}>
                  <td>{importProduct.name}</td>
                  <td>{importProduct.description}</td>
                  <td>{importProduct.country}</td>
                  <td>{importProduct.type}</td>
                  <td>{importProduct.keywords}</td>
                  <td>{importProduct.price}</td>
                  <td>{formatDate(importProduct.created_at)}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleNavigateItem(importProduct.id);
                        handleView(importProduct.id);
                      }}
                    >
                      View More
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Import;
