import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export const ModifyItem = () => {
  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/product/18`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const { t } = useTranslation();
  return (
    <div className=" d-flex justify-content-center">
      <Form.Group>
        <Link to={"/EditItem"}>
          <Button type="submit" className="btn btn-warning button-add  m-2">
            {t("editItem.Edit")}
          </Button>
        </Link>

        <Button
          type="submit"
          className="btn btn-danger button-add  m-2"
          onClick={deleteItem}
        >
          {t("editItem.Delete")}
        </Button>
      </Form.Group>
    </div>
  );
};
