import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
const Export = () => {
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
  const handleNavigateAddReq = () => {
    navigate("/AddNewItem");
    window.location.reload();
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
  return (
    <div>
      <div>
        <div>Sales offer</div>
        <div>
          <Button onClick={handleNavigateAddReq} variant="success">
            Add request free
          </Button>
        </div>
      </div>
      <div>
        <div>
          {exportProducts.map((exportProduct) => {
            return (
              <div key={exportProduct.id}>
                <div>
                  <h4>{exportProduct.name}</h4>
                  <p>{exportProduct.description}</p>
                  <p>{exportProduct.country}</p>
                  <td>{exportProduct.type}</td>
                  <td>{exportProduct.keywords}</td>
                  <td>{exportProduct.price}</td>
                  <td>{formatDate(exportProduct.created_at)}</td>
                </div>
                <div>
                  <div>{exportProduct.price}</div>
                  <p>{exportProduct.keywords}</p>

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

export default Export;
