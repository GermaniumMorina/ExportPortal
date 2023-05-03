import React, { useState } from "react";
import "./AddNewItem.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export const AddNewItem = () => {
  const [name, setItemName] = useState("");
  const [description, setItemDescription] = useState("");
  const [price, setItemPrice] = useState();

  const [category, setItemQuantity] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    const response = await axios.post(`http://localhost:8000/api/${type}`, {
      name,
      description,
      price,
      category,
      type,
    });
    console.log("response", response);
  };

  const [fileName, setFileName] = useState("");

  const handleFileSelect = (event) => {
    setFileName(event.target.files[0].name);
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
                onChange={(e) => setItemName(e.target.value)}
                value={name}
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
                onChange={(e) => setItemDescription(e.target.value)}
                value={description}
                name="description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="number"
                placeholder="Item Price"
                onChange={(e) => setItemPrice(e.target.value)}
                value={price}
                name="price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control
                type="text"
                placeholder="Item category"
                onChange={(e) => setItemQuantity(e.target.value)}
                value={category}
                name="category"
              />
            </Form.Group>

            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
            >
              <option value="">Type</option>
              <option value="importItem">Import Item</option>
              <option value="exportItem">Export Item</option>
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
            <span className="file-name">{fileName}</span>
          </Form>
        </div>
      </div>
    </div>
  );
};
