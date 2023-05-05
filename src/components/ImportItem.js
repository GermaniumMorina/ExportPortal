import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
const ImportItem = () => {
  const navigate = useNavigate();
  const [importProduct, setImportProduct] = useState([]);
  //calling the GET method to get the "import" data
  const getImportProduct = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8000/api/ilist/" + id,
      data
    );
    const apiImportProducts = response.data.data;
    setImportProduct(apiImportProducts);
  };
  let { id } = useParams();
  useEffect(() => {
    getImportProduct(id);
  }, []);
  const handleNavigateItem = () => {
    navigate("/Import");
  };

  // const views = axios.post("http://127.0.0.1:8000/api/view");
  return (
    <div>
      <div>
        {importProduct.map((importProduct) => {
          const createdAtDate = new Date(importProduct.created_at);
          const formattedDate = createdAtDate
            .toLocaleDateString("en-US", {
              year: "numeric",
              day: "numeric",
              month: "short",
            })
            .split("/")
            .reverse()
            .join(" ");
          return (
            <div key={importProduct.id}>
              <div>
                <p>{importProduct.country}</p>
                <p>Buying</p>
                <div>{importProduct.price}</div>
                <div>{formattedDate}</div>
                <p> views{importProduct.views}</p>
                <h4>{importProduct.name}</h4>
              </div>
              <div>
                <p>{importProduct.keywords}</p>{" "}
              </div>
              <div>
                <p>{importProduct.description}</p>
                <div>
                  <Image src={importProduct.imageURL} fluid />
                </div>
              </div>
              <div>
                <h3>{importProduct.company_name}</h3>
                <p>{importProduct.budged}</p>
                <p>{importProduct.price}</p>
                <Button>Buy</Button>
              </div>
              <div>
                <Button onClick={handleNavigateItem}>Go Back</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ImportItem;
