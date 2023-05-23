import React from "react";
import axios from "axios";

import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";

import "./ContactFrom.css";

export const ContactFrom = () => {
  
  const { state } = useLocation();

  const [formValues, setFormValues] = useState({
    name: state?.name || "",
    email: "",
    message: state?.product || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/waitForTableFromBack', formValues)
      .then(res => {
        console.log('Data sent to database successfully.');
        window.location.href = `mailto:${formValues.email}`;
      })
      .catch(err => {
        console.log('Error in sending data to database.', err);
      });
  };

  return (
    <div>

        <div id="add-new-company-base">
            <Form>
              <h1 className="text-center">
                Contact seller{" "}
              </h1>
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
                    onChange={handleChange}

                    value={formValues.email}
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon2"
                />
              </InputGroup>
              <br></br>
              <h5>Quantity</h5>
              <InputGroup className="mb-3">
                <Form.Control
                    onChange={handleChange}
                    type="number"
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
                    onClick={handleSubmit}
                >
                    Send
                </Button>
            </div>
            </Form>
          </div>
        </div>
  );
};