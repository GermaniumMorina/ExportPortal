import "./Brands.css";
import coop from "./coop.png";
import loremlogo from "./logo.png";

const Brands = () => {
  return (
    <div className="company-data-text">
      <div class="brands-card-container">
        <div class="brands-card">
          <div class="brands-img-content">
            <img src={coop} alt="coop" className="brands-logos" />
          </div>
          <div class="brands-content">
            <p class="brands-heading">COOP Switzerland</p>
            <p>
              Retail Application & Network / System administration Installing
              Coop Retail application and customized based on branch request.
              Optimize database and connect with datacenter. Install all network
              hardware and software. 
            </p>
          </div>
        </div>
      </div>
      <div class="brands-card-container">
        <div class="brands-card">
          <div class="brands-img-content">
            <img src={loremlogo} alt="coop" className="brands-logos" />
          </div>
          <div class="brands-content">
            <p class="brands-heading">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipii voluptas ten
              mollitia pariatur odit, ab minus ratione adipisci accusamus vel
              est excepturi laboriosam magnam necessitatibus dignissimos
              molestias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
