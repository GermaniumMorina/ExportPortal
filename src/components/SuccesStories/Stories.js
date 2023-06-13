import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stories.css"
import LoadingBar from "../LoadingScreens/LoadingBar";

const Stories = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [expandedStory, setExpandedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const getStories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/successStory");
      setSuccessStories(response.data.data);
      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching success stories:", error);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  const handleMore = (story) => {
    setExpandedStory(story);
  };

  const handleLess = () => {
    setExpandedStory(null);
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <section className="container" id="main-container">
        {successStories.map((story) => (
          <article className="product-box" key={story.id}>
            <div className={`stories-card ${expandedStory === story ? "expanded" : ""}`}>
              <span></span>

              <div className="stories-card-details">
                <p className="stories-text-title">{story.topic}</p>
                <p className="stories-text-body">Company Name: {story.name}</p>
                <p className="stories-text-body">Representative: {story.representative}</p>
                {expandedStory === story ? (
                  <p className="stories-text-body">{story.message}</p>
                ) : null}
              </div>
              {expandedStory === story ? (
                <button className="stories-card-button" onClick={handleLess}>
                  Less info
                </button>
              ) : (
                <button className="stories-card-button" onClick={() => handleMore(story)}>
                  More info
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Stories;
