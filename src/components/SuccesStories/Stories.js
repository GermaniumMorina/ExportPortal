import "alertifyjs/build/css/alertify.css";
import "./Stories.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Stories = () => {
  const [successStories, setSuccessStories] = useState([]);

  const getStories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/successStory"
      );
      setSuccessStories(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div>
      <section className="container" id="main-container">
          {successStories.map((story) => (
            <article className="product-box" key={story.id}>
              <div className="stories-card">
                <span></span>

                <div className="stories-card-details">
                  <p className="stories-text-title">{story.topic}</p>
                  <p className="stories-text-body">{story.name}</p>
                  <p className="stories-text-body">{story.representative}</p>
                  <p className="stories-text-body">{story.name}</p>
                </div>
                <button className="stories-card-button">More info</button>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
};

export default Stories;
