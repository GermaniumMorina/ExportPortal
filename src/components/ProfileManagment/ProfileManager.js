import React from "react";
import NavBar from "../Navigation/NavBar";
import "./ProfileManager.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

const ProfileManager = () => {
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
    const UserPhone = localStorage.getItem("userPhone");
    const UserGender = localStorage.getItem("userGender");

  const [formValues, setFormValues] = useState({
    name: UserName,
    surname: UserSurname,
    email: UserEmail,
    phone: UserPhone,
    gender: UserGender,
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(formValues);
    // axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
    //   axios
    //     .put("http://localhost:8000/api/??????????", {
    //       name: formValues.name,
    //       surname: formValues.surname,
    //       email: formValues.email,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       //set response in local storage
    //       //  localStorage.setItem('user', JSON.stringify(response.data))
    //       if (response.status === 200) {
    //         localStorage.setItem("userName", response.data.user.name);
    //         localStorage.setItem("userEmail", response.data.user.email);
    //         localStorage.setItem("userSurname", response.data.user.surname);
    //         localStorage.setItem("userLoggedIn", true);
    //       }
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //       window.alert("Authentication Failed");
    //     });
    // });
  };

    const handleBack = () => {
        const confirmBack = window.confirm(
            "Discard Changes?"
          );
    
    if (confirmBack) {
        window.location.href = "/profile";
    }
 

       
    }


  return (
    <div>
      <NavBar />

      <div className="d-flex justify-content-center">
        <div className="edit-div">
          <h2 className="welcome">Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                id="name"
                name="name"
                defaultValue={UserName}
        
                onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                id="surname"
                name="surname"
                defaultValue={UserSurname}
                onChange={(e) =>
                    setFormValues({ ...formValues, surname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                id="email"
                name="email"
                defaultValue={UserEmail}
                onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Check
              type="radio"
              name="gender"
              id="male"
              label="Male"
              
              inline
              value="male"
            
              onChange={(e) =>
                    setFormValues({...formValues, gender: e.target.value})
                }
            />

            <Form.Check
            
              type="radio"
              name="gender"
              id="female"
              label="Female"
              inline
              value="female"
            
              onChange={(e) =>
                setFormValues({ ...formValues, gender: e.target.value })
            }
            />
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Control
                    type="text"
                    id="phone"
                    name="phone"
                    defaultValue={UserPhone}
                    onChange={(e) =>
                        setFormValues({ ...formValues, phone: e.target.value })
                    }
                />
            </Form.Group>
            <button className="edit-button" type="submit">Submit</button>
            <button className="back-button" onClick={handleBack}>Back</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
