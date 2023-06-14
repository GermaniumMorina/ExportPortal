import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const [exportProducts, setExportProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

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
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("typeId", 1); // Change the type ID to the appropriate value
  
      axios
        .post("http://localhost:8000/api/addFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image uploaded successfully!", response.data.url);
          // Handle the response or update the UI accordingly
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <div>
      <div>
        {exportProducts.map((item) => (
          <div key={item.id}>
            <img src={`http://localhost:8000${item.URL}`} alt="image" />
            <img src={`http://localhost:8000${item.URL}`} alt="image" />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image" style={{ marginRight: "10px" }}>
            Choose a file
          </label>
          <span>{fileName}</span>
        </div>
        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageComponent;
