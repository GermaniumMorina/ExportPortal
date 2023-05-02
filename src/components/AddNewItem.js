import React, { useState } from "react";
import "./AddNewItem.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const AddNewItem = () => {
    const [formValues, setFormValues] = useState({

        item_name: "",
        item_description: "",
        item_price: "",
        item_quantity: "",
        item_category: "",   
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        setFormValues({ ...formValues, [name]: value });
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
              onChange={handleChange}
              value={formValues["item_name"]}
              name="item_name"
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
              value={formValues["item_description"]}
              name="item_description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Control
              type="number"
              placeholder="Item Price"
              onChange={handleChange}
              value={formValues["item_price"]}
              name="item_price"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Control
              type="number"
              placeholder="Item Quantity"
              onChange={handleChange}
              value={formValues["item_quantity"]}
              name="item_quantity"
            />
        </Form.Group>
       
          <Form.Select
            value={formValues["type"]}
            onChange={handleChange}
            name="type"
          >
            <option value={"Type"}>Type</option>
            <option value={"import_item"}>Import Item</option>
            <option value={"export_item"}>Export Item</option>
          </Form.Select> 
          <br />
          <Button type="submit" variant="primary">Submit</Button>
          <br />
          <br />
          <input type="file" id="myfile" name="myfile" onChange={handleFileSelect}  />
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
}




   
