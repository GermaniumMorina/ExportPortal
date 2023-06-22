import React, { useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./ImageComponent.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ImageComponent = () => {
  
  const navigate = useNavigate();
  
  const [selectedMainImage, setSelectedMainImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedMainImage(file);
      setFileName(file ? file.name : "");
      generateImagePreviews([file]);
    } else {
      setSelectedMainImage(null);
      setFileName("");
      generateImagePreviews([]);
    }
  };

  const handleImagesChange = (event) => {
    const files = event.target.files;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setSelectedImages(imageFiles);
    setFileName(
      imageFiles.length === 1
        ? imageFiles[0].name
        : `${imageFiles.length} files selected`
    );
    generateImagePreviews(imageFiles);
  };

  const handlePDFChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedPDF(file);
      setFileName(file ? file.name : "");
    } else {
      setSelectedPDF(null);
      setFileName("");
    }
  };

  const generateImagePreviews = (files) => {
    const previews = Array.from(files).map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedMainImage) {
      formData.append("files[]", selectedMainImage);
      formData.append("typeId[]", 1);
    }

    if (selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("files[]", selectedImages[i]);
        formData.append("typeId[]", 2);
      }
    }

    if (selectedPDF) {
      formData.append("files[]", selectedPDF);
      formData.append("typeId[]", 3);
    }

    axios
    .post("http://localhost:8000/api/addFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Files uploaded successfully!", response.data.urls);
      alertify.success("Files uploaded successfully!");

      setTimeout(() => {
        navigate("/dashboard"); // Redirect to /dashboard after a delay
      }, 1500); // Delay 1.5s
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
      alertify.error("Error uploading files!");
    });
};

  return (
    <div className="image-component">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mainImage"   className="file-label">
            Main Image:
          </label>
          <input
            type="file"
            name="mainImage"
            id="mainImage"
            onChange={handleMainImageChange}
            className="file-input"
          />
          {selectedMainImage && (
            <img
              src={imagePreviews[0]}
              alt="preview"
              className="preview-image"
            />
          )}
        </div>
        <div>
          <Button htmlFor="images" className="file-label">
            Additional Images:
          </Button>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleImagesChange}
            className="file-input"
            multiple
          />
          {selectedImages.length > 0 && (
            <div className="preview-images">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="preview"
                  className="preview-image"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <Button htmlFor="pdf" className="file-label">
            PDF File:
          </Button>
          <input
            type="file"
            name="pdf"
            id="pdf"
            onChange={handlePDFChange}
            className="file-input"
          />
        </div>
        <div className="file-name">{fileName}</div>
        <button
          type="submit"
          className="upload-button"
          disabled={!selectedMainImage && selectedImages.length === 0 && !selectedPDF}
        >
          Upload Files
        </button>
      </form>
    </div>
  );
};

export default ImageComponent;
