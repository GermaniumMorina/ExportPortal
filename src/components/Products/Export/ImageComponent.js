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
      const apiExportProducts = await axios.get("http://localhost:8000/api/allFiles");
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
      formData.append("files[]", selectedFile); // Use 'files[]' as the name to handle multiple files
      formData.append("typeId[]", 1); // Change the type ID to the appropriate value

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
        {exportProducts.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              alt="image"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="files"
            id="files" // Update the ID to match the label's htmlFor attribute
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple // Enable multiple file selection
          />
          <label htmlFor="files" style={{ marginRight: "10px" }}>
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
