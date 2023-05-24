import { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, Link, useNavigate } from "react-router-dom";
export const EditItem = () => {
  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageURL: "",
    views: 0,
    type: "",
    category_id: 0,
    company_id: 0,
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [product, setProduct] = useState([]);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/product/` + formValues.id,
        formValues
      );

      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container ">
      <Form
        className="justify-content-center mt-5  mb-5"
        onSubmit={handleSubmit}
      >
        <Form.Group
          id="form"
          className=" col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-5  border border-dark  "
          controlId="exampleForm.ControlInput1"
        >
          <h5 className="p-2">Edit Item</h5>
          <Form.Group>
            <Form.Control
              type="text"
              name="id"
              placeholder="ID "
              className="mb-2"
              // value={formValues.id}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name "
              className="mb-2"
              value={formValues.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              className="mb-2"
              value={formValues.description}
              onChange={onChange}
            />

            <Form.Group>
              <Form.Control
                type="number"
                name="price"
                placeholder=" Price"
                className="mb-2"
                value={formValues["price"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="imageURL"
                placeholder="ImageUrl"
                className="mb-2"
                value={formValues["imageURL"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="views"
                placeholder="Views"
                className="mb-2"
                value={formValues["views"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="type"
                placeholder="type"
                className="mb-2"
                value={formValues["type"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="category_id"
                placeholder="Category ID"
                className="mb-2"
                value={formValues["category_id"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="company_id"
                placeholder="Company ID"
                className="mb-2"
                value={formValues["company_id"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="btn btn-primary button-add  m-2">
                Update
              </Button>
              <Link to={"/ModifyItem"}>
                <Button type="submit" className="btn btn-warning m-2">
                  Go Back
                </Button>
              </Link>
            </Form.Group>
          </Form.Group>
        </Form.Group>
      </Form>
    </div>
  );
};
