import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

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
                  <p>{exportProduct.info}</p>
                  <label for="">time</label>
                </div>
                <div>
                  <div>{exportProduct.price}</div>
                  <p>{exportProduct.keywords}</p>
                  <Button
                    onClick={() => handleNavigateItem(exportProduct.id)}
                  ></Button>
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
