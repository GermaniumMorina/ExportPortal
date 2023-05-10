import React, { useState } from "react";
import "./AddNewItem.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export const AddNewItem = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    type: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    const data = JSON.stringify({
      ...formValues,
      company_id: 1,
    });
    console.log(data);
    const response = await axios.post(`http://localhost:8000/api/add`, {
      ...formValues,
      company_id: 1,
    });
    console.log("response", response);
  };

  const handleFileSelect = (event) => {
    setFormValues((prevValues) => ({ ...prevValues, imageURL: event.target.files[0].name }));
  };

  return (
    <div className="d-flex justify-content-center">
      <div id="add-new-company-base">
        <div className="add-new-company-form-div">
          <h2>Add new Item</h2>
          <Form onSubmit={handleSubmit} className="main-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Item Name"
                onChange={handleChange}
                value={formValues.name}
                name="name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Item Description"
                onChange={handleChange}
                value={formValues.description}
                name="description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder="Item Price"
                onChange={handleChange}
                value={formValues.price}
                name="price"
              />
            </Form.Group>
            <Form.Select
              value={formValues.category_id}
              onChange={handleChange}
              name="category_id"
            >
              <option value={""}>Category</option>
              <option value={1}>Fashion</option>
              <option value={2}>Accesories</option>
              <option value={3}>Home</option>
              <option value={4}>Sporting</option>
              <option value={5}>Health</option>
              <option value={6}>Medical</option>
              <option value={7}>Pets</option>
            </Form.Select>
            <br />
            <Form.Select
              value={formValues.type}
              onChange={handleChange}
              name="type"
            >
              <option value="">Type</option>
              <option value="import">Import Item</option>
              <option value="export">Export Item</option>
            </Form.Select>
            <br />
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <br />
            <br />
            <input
              type="file"
              id="myfile"
              name="myfile"
              onChange={handleFileSelect}
/>
<label htmlFor="myfile" className="custom-file-input">
Choose a file
</label>
<br />
<span className="file-name">File added: {formValues.imageURL}</span>
</Form>
</div>
</div>
</div>
);
};