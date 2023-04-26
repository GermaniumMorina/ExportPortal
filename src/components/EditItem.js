import { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, Link, useNavigate } from "react-router-dom";
export const EditItem = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "",
    category_id: "",
    company_id: "",
  });
//   const [task, setTask] = useState([]);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };
//   const getTask = async (id) => {
//     const response = await axios.get("http://127.0.0.1:8000/api/tasks/" + id);
//     const apiTask = response.data.data;
//     setTask(apiTask);
//     setFormValues({
//       title: apiTask.title,
//       description: apiTask.description,
//       status: apiTask.status,
//     });
//   };
//   const UpdateTask = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put("http://127.0.0.1:8000/api/tasks/" + task.id, formValues);
//       getTask();
//       navigate("/list");
//     } catch (e) {
//       if (e.response.status === 422) {
//         setErrors(e.response.data.errors);
//       }
//     }
//   };
//   let { id } = useParams();
//   useEffect(() => {
//     getTask(id);
//     UpdateTask();
//   }, []);
// const deleteEmployee = async (id) => {
//   try {
//     await axios.delete("items/" + id);
//     getItems();
//   } catch (e) {
//     console.error(e);
//   }
// };

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormValues({ ...formValues, [name]: value });
   };
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);}


  return (
    <div className="container ">
      <Form className="justify-content-center mt-5  mb-5" onSubmit={handleSubmit}>
        <Form.Group
          id="form"
          className=" col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-5  border border-dark  "
          controlId="exampleForm.ControlInput1"
        >
          <h5 className="p-2">Edit Item</h5>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name "
              className="mb-2"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="desciption"
              placeholder=" Description"
              className="mb-2"
              onChange={handleChange}
            />
            <Form.Group>
              <Form.Control
                type="number"
                name="price"
                placeholder=" Price"
                className="mb-2"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="imageURL"
                placeholder="ImageUrl"
                className="mb-2"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="category_id"
                placeholder="Category ID"
                className="mb-2"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="company_id"
                placeholder="Company ID"
                className="mb-2"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="btn btn-primary button-add  m-2">
                Update
              </Button>
              <Link to={"/components/modifyItem"}>
                <Button type="submit" className="btn btn-warning m-2">
                  Go Back
                </Button>
              </Link>
            </Form.Group>
          </Form.Group>
        </Form.Group>
      </Form>
    </div>
  );
};
