import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const [exportProducts, setExportProducts] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getExportProducts();
  }, []);

  const getExportProducts = async () => {
    try {
      const apiExportProducts = await axios.get("http://localhost:8000/api/img");
      setExportProducts(apiExportProducts.data);
      console.log(apiExportProducts.data);
    } catch (error) {
      console.error("Error fetching export products:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:8000/api/addFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  };

  return (
    <div>
      <div>
        {exportProducts.map((item) => (
          <div key={item.id}>
            <img src={item.URL} alt="image" />
          </div>
        ))}
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageComponent;
