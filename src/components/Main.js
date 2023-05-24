import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from './Navigation/NavBar';
import { Navigate } from 'react-router-dom';
import { checkIfLoggedIn } from './Authentication/checkIfLoggedIn';
import truck from './Images/Trucks.jpg';
import depo from './Images/depo.jpg';
import './Main.css';

const Main = () => {
  let gender = '';

  const handleSubmit = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };

  const isLoggedIn = checkIfLoggedIn();
  const userName = localStorage.getItem('userName');
  const userSurname = localStorage.getItem('userSurname');
  const userGender = localStorage.getItem('userGender');

  if (userGender === 'male') {
    gender = 'Mr.';
  } else if (userGender === 'female') {
    gender = 'Mrs.';
  }

  return isLoggedIn ? (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Welcome {gender}{userName} {userSurname}!</h1>
            <h6 className="text-center">This is our ExportPortal</h6>
            <img src={truck} alt="truck" className="img-fluid main-truck" />
            <h6 className="text-center">You are logged in!</h6>
            <h6 className="text-center">You can now browse our products and services</h6>
            <img src={depo} alt="depo" className="img-fluid main-depo" />
            <h6 className="text-center">You can also add your own products and services</h6>
            <h6 className="text-center">You can also edit your profile</h6>
            <h6 className="text-center">You can also view your profile</h6>
            <h6 className="text-center">You can also view your orders</h6>

            <Form onSubmit={handleSubmit} className="text-center logout-button">
              <Button variant="primary" type="submit">
                !!! TEST LOGOUT !!!
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Main;
