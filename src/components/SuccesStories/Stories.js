import "alertifyjs/build/css/alertify.css";
import "./Stories.css";

const AllProduct = () => {
  return (
    <div>
      <section className="container" id="main-container">
        <div className="left-half">
          <article className="product-box">
            <div class="stories-card">
              <span></span>

              <div class="stories-card-details">
                <p class="stories-text-title">Lorem Ipsum</p>
                <p class="stories-text-body">
                Lorem Ipsum Company                </p>
              </div>
              <button class="stories-card-button">More info</button>
            </div>
          </article>
        </div>
        <div className="right-half">
          <article className="product-box">
            <div class="stories-card">
            <span></span>

              <div class="stories-card-details">
                <p class="stories-text-title">Lorem Ipsum</p>
                <p class="stories-text-body">
Lorem Ipsum Company                </p>
              </div>
              <button class="stories-card-button">More info</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default AllProduct;
