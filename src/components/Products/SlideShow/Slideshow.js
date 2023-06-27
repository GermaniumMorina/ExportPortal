import React, { useState } from "react";
import "./SlideShow.css"; // Import the CSS file for slideshow styles

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null; // Return null if images are not defined or empty
  }

  return (
    <div className="slideshow-container">
      <div>
        <img
          src={images[currentIndex]}
          alt="Slideshow"
          className="slideshow-image"
        />
      </div>
      <div className="slideshow">
        <div className="slideshow-buttons">
          <button className="prev-button" onClick={handlePrev}>
            Previous
          </button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
