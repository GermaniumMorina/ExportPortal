import React from 'react';
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";


const NewsletterCreator = () => {
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
        console.log(formValues);
     
      };
    return (
        <div>
          <div className="d-flex justify-content-center">
            <div id="add-new-company-base">
              <div className="add-new-company-form-div">
                <Form>
                  <h1 className="text-center">
                    Write newsletter
                  </h1>
                  <h5>To</h5>
                  <InputGroup className="mb-3">
                    <Form.Control
                        onChange={handleChange}
                        required
                        value={formValues.email}
                        name="email"
                        placeholder="Subscribers"
                        aria-label="Email"
                        aria-describedby="basic-addon2"
    
                    />
                  </InputGroup>
                  
                  <h5>Subject</h5>
                  <InputGroup className="mb-3">
                    <Form.Control
                    onChange={handleChange}
                    value={formValues.name}
                    name="name"
                    required
                        placeholder="Subject"
                        aria-label="Subject"
                    />
                  </InputGroup>
                 
                
       
                  <h5>Message</h5>
    
                  <InputGroup className="mb-3">
                    
                    <Form.Control
                      as="textarea"
                      required
                      rows={7}
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
                    Send
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
  
}

export default NewsletterCreator