import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
const ExportItem = () => {
  const navigate = useNavigate();
  const [exportProduct, setExportProduct] = useState([]);
  //calling the GET method to get the "export" data
  const getExportProduct = async () => {
    const data = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8000/api/elist/" + id,
      data
    );
    const apiExportProducts = response.data.data;
    setExportProduct(apiExportProducts);
  };
  let { id } = useParams();
  useEffect(() => {
    getExportProduct(id);
  }, []);
  const handleNavigateItem = () => {
    navigate("/Export");
  };
  return (
    <div>
      <div>
        {exportProduct.map((exportProduct) => {
          return (
            <div key={exportProduct.id}>
              <div>
                <p>{exportProduct.country}</p>
                <p>Buying</p>
                <div>{exportProduct.price}</div>
                <div>date</div>
                <p> views{exportProduct.views}</p>
              </div>
              <div>
                <p>{exportProduct.keywords}</p>
              </div>
              <div>
                <h4>{exportProduct.name}</h4>
                <p>{exportProduct.description}</p>
                <div>
                  <Image src={exportProduct.imageURL} fluid />
                </div>
              </div>
              <div>
                <h3>{exportProduct.company_name}</h3>
                <p>{exportProduct.budged}</p>
                <p>{exportProduct.price}</p>
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

export default ExportItem;
