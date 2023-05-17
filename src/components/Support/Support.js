import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import contactImg from "./contact.jpg";
import "./support.css";

export const Support = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted " + formValues.name + formValues.email + formValues.message);
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div id="add-new-company-base">
          <div className="add-new-company-form-div">
            <Form>
              <h1 className="text-center">
                Contact Support{" "}
                <img src={contactImg} alt="contact" className="contactImg" />
              </h1>

              <br></br>
              <h5>Name</h5>
              <InputGroup className="mb-3">
                <Form.Control
                onChange={handleChange}
                value={formValues.name}
                name="name"
                    placeholder="Name"
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
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                Button
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
