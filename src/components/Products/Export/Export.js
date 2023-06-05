import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Form from "react-bootstrap/Form";
import LoadingBar from "../../LoadingScreens/LoadingBar";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const navigate = useNavigate();
  const [exportProducts, setExportProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const getExportProducts = async () => {
    try {
      const apiExportProducts = await axios.get("http://127.0.0.1:8000/api/elist");
      setExportProducts(apiExportProducts.data);
      console.log(apiExportProducts.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching export products:", error);
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const apiCategories = await axios.get("http://127.0.0.1:8000/api/productcategory");
      setCategories(apiCategories.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getExportProducts();
    getCategories();
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== name));
    }
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? exportProducts.filter((product) => selectedCategories.includes(product.category_name))
      : exportProducts;

  const handleNavigateItem = (id) => {
    navigate("/ExportItem/" + id);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/view/${id}`);
      console.log("View request successful:", response);
    } catch (error) {
      console.error("Error viewing product:", error);
    }
  };

  const formatDate = (date) => {
    const now = moment();
    const created = moment(date);
    const diffInHours = now.diff(created, "hours");
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    }
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>{t("import.Export List")}</h1>
      </div>
      <div className="d-flex justify-content-center mt-4">
        {categories.map((category, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`category-${category.name}`}
            label={t(`import.${category.name}`)}
            name={category.name}
            onChange={handleCheckboxChange}
            className="m-2"
          />
        ))}
      </div>
      <div>
        <div>
          {filteredProducts.map((exportProduct, index) => {
            return (
              <div
                key={index}
                className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto border m-3 p-4 border-dark  rounded"
              >
                <div>
                  <p>
                    {t("companies.Name")} {exportProduct.name}
                  </p>
                  <p>
                    {t("companies.Country")} {exportProduct.country}
                  </p>
                  <p>
                    {t("import.Price")} {exportProduct.price}
                  </p>
                  <p>
                    {t("import.Description")} {exportProduct.description}
                  </p>
                  <p>
                    {t("import.Created at")}
                    {formatDate(exportProduct.created_at)}
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      handleNavigateItem(exportProduct.id);
                      handleView(exportProduct.id);
                    }}
                  >
                    {t("companies.View More")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
