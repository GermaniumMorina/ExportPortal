import React, { useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./UploadFile.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const UploadFile = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [slideImages, setSlideImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedCoverImage, setUploadedCoverImage] = useState(null);
  const [uploadedSlideImages, setUploadedSlideImages] = useState([]);
  const [uploadedPdfFile, setUploadedPdfFile] = useState(null);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSlideImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSlideImages((prevSlideImages) => [...prevSlideImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedSlideImages((prevSlideImages) => [
          ...prevSlideImages,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePdfFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedPdfFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    const formData = new FormData();

    if (coverImage) {
      formData.append("files[]", coverImage);
      formData.append("typeId[]", 1);
    }

    slideImages.forEach((slideImage) => {
      formData.append("files[]", slideImage);
      formData.append("typeId[]", 2);
    });

    if (pdfFile) {
      formData.append("files[]", pdfFile);
      formData.append("typeId[]", 3);
    }

    axios
      .post("http://127.0.0.1:8000/api/addFile", formData)
      .then((response) => {
        const uploadedFiles = response.data;
        uploadedFiles.forEach((file) => {
          if (file.typeId === 1) {
            setUploadedCoverImage(file);
          } else if (file.typeId === 2) {
            setUploadedSlideImages((prevSlideImages) => [
              ...prevSlideImages,
              file,
            ]);
          } else if (file.typeId === 3) {
            setUploadedPdfFile(file);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="image-component">
      <div>
        <label htmlFor="coverImage" className="file-label">
          Cover Image:
        </label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleCoverImageChange}
          id="coverImage"
          className="file-input"
        />
        {uploadedCoverImage && (
          <div>
            <h4>Uploaded Cover Image:</h4>
            <img
              src={uploadedCoverImage}
              alt="Cover"
              width="100"
              height="100"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="slideImages" className="file-label">
          Slide Images (Up to 5):
        </label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          multiple
          onChange={handleSlideImageChange}
          id="slideImages"
          className="file-input"
        />
        {uploadedSlideImages.length > 0 && (
          <div>
            <h4>Uploaded Slide Images:</h4>
            {uploadedSlideImages.map((slideImage, index) => (
              <div key={index}>
                <img
                  src={slideImage}
                  alt={`Slide ${index + 1}`}
                  width="100"
                  height="100"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="pdfFile" className="file-label">
          PDF File:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfFileChange}
          id="pdfFile"
          className="file-input"
        />
        {uploadedPdfFile && (
          <div>
            <h4>Uploaded PDF File:</h4>
            <object
              data={uploadedPdfFile}
              type="application/pdf"
              width="100"
              height="100"
            >
              <p>PDF cannot be displayed.</p>
            </object>
          </div>
        )}
      </div>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
