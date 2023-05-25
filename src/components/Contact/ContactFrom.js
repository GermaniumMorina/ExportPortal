import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

import "./ContactFrom.css";

export const ContactFrom = () => {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    Quantity: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/form/${id}`)
      .then(response => {
        const { Product, email } = response.data;
        setFormValues({
          name: Product,
          email: email,
          message: `I am interested in your product: ${Product}`,
          Quantity: formValues.Quantity
        });
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, [id]);

  useEffect(() => {
    console.log(formValues); // Log formValues whenever it changes
  }, [formValues]);  // Add id as a dependency to useEffect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get('http://localhost:8000/api/Notify/${Oid}/${Uid}/${Pid}', formValues)
      .then(res => {
        console.log('Data sent to database successfully.');
        window.location.href = `mailto:${formValues.email}?subject=Interest in ${formValues.name}&body=${formValues.message}`;
      })
      .catch(err => {
        console.log('Error in sending data to database.', err);
      });
  };

  return (
    <div>
      <div id="add-new-company-base">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">Contact seller</h1>
          <br></br>
          <h5>Subject</h5>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange}
              value={formValues.name}
              name="name"
              placeholder="Subject"
              aria-label="Name"
            />
          </InputGroup>
          <br></br>
          <h5>Email</h5>
          <InputGroup className="mb-3">
            <Form.Control
              readOnly
              value={formValues.email}
              name="email"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <br></br>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange}
              type="number"
              min="0"
              value={formValues.Quantity}
              name="Quantity"
              placeholder="Quantity"
              aria-label="Quantity"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <br></br>
          <h5>Message</h5>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              value={formValues.message}
              name="message"
              placeholder="Message"
              aria-label="Message"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <br></br>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              Send
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
