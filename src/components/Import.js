import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
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
        <div>
          {importProducts.map((importProduct) => {
            return (
              <div key={importProduct.id}>
                <div>
                  <h4>{importProduct.name}</h4>
                  <p>{importProduct.description}</p>
                  <p>{importProduct.country}</p>
                  <p>{importProduct.info}</p>
                  <label for="">time</label>
                </div>
                <div>
                  <div>{importProduct.price}</div>
                  <p>{importProduct.keywords}</p>
                  <Button
                    onClick={() => handleNavigateItem(importProduct.id)}
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

export default Import;
