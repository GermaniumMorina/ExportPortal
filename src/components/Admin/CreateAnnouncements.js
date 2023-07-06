import React from 'react'
import { useState } from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { checkIfAdmin } from "./checkIfAdmin";
import NotAllowedAdmin from "./NotAllowedAdmin";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";
const CreateAnnouncements = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    text: "",
  });
  const isAdmin = checkIfAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/announcements', formValues);
      console.log(response);
  
      alertify.success(response.statusText);
    } catch (error) {
      console.error(error);
    }
  };
  
  const { t } = useTranslation();
  return isAdmin?(
    <div>
      <div className="d-flex justify-content-center">
        <div id="add-new-company-base">
          <div className="add-new-company-form-div">
            <Form>
              <h1 className="text-center">
               Write an Announcement
              </h1>
               <h5>Title</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={formValues.title}
                  name="title"
                  required
                  placeholder="Title"
   
                />
              </InputGroup>

              <h5>{t("support.Message")}</h5>

              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  required
                  rows={7}
                  onChange={handleChange}
                  value={formValues.text}
                  name="text"
                  placeholder="Text"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <br></br>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSubmit}
              >
                {t("support.Send")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ):(
    <NotAllowedAdmin/>
  )
};


export default CreateAnnouncements