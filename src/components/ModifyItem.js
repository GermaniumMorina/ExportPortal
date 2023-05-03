import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export const ModifyItem = () => {
  return (
    <div className=" d-flex justify-content-center">
      <Form.Group>
        <Link to={"/components/edit"}>
          <Button type="submit" className="btn btn-warning button-add  m-2">
            Edit
          </Button>
        </Link>

        <Button type="submit" className="btn btn-danger button-add  m-2">
          Delete
        </Button>
      </Form.Group>
    </div>
  );
};
