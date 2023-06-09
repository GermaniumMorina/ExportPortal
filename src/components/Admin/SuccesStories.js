import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { checkIfAdmin } from "./checkIfAdmin";
import NotAllowedAdmin from "./NotAllowedAdmin";

const SuccesStories = () => {
  const [formValues, setFormValues] = useState({
    company_id: "",
    topic: "",
    representative: "",
    position: "",
    message: "",
    image_url: ""
  });

  
  const isAdmin = checkIfAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePositionChange = (selectedPosition) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      position: selectedPosition
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  
  const { t } = useTranslation();
  return isAdmin ? (
    <div>
      <div className="d-flex justify-content-center">
        <div id="add-new-company-base">
          <div className="add-new-company-form-div">
            <Form>
              <h1 className="text-center">Write a success story</h1>
              <h5>Company ID</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  required
                  value={formValues.company_id}
                  name="company_id"
                  placeholder="Company ID"
                  aria-label="Company ID"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  required
                  value={formValues.topic}
                  name="topic"
                  placeholder="Topic"
                  aria-label="Topic"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>

              <h5>Company Representative</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  required
                  value={formValues.representative}
                  name="representative"
                  placeholder="Representative"
                  aria-label="Representative"
                  aria-describedby="basic-addon2"
                />

                <DropdownButton
                  variant="outline-secondary"
                  title={formValues.position || "Position"}
                  id="input-group-dropdown-2"
                  align="end"
                >
                  <Dropdown.Item onClick={() => handlePositionChange("CEO")}>
                    CEO
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePositionChange("Assistant")}>
                    Assistant
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePositionChange("Coordinator")}>
                    Coordinator
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handlePositionChange("Staff")}>
                    Staff
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>

              <h5>{t("support.Message")}</h5>

              <InputGroup className="mb-3">
                <Form.Control
                  as="textarea"
                  required
                  rows={7}
                  onChange={handleChange}
                  value={formValues.message}
                  name="message"
                  placeholder={t("support.Message")}
                  aria-label="Message"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>

              <h5>Image URL</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  required
                  value={formValues.image_url}
                  name="image_url"
                  placeholder="Image URL"
                  aria-label="Image URL"
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
  ) : (
    <NotAllowedAdmin />
  );
};

export default SuccesStories;
