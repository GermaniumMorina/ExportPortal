import React from 'react'
import NavBar from '../Navigation/NavBar';
import './ProfileManager.css';

const ProfileViewer = () => {
    const UserName=localStorage.getItem("userName");
    const UserEmail=localStorage.getItem("userEmail");
    const UserSurname=localStorage.getItem("userSurname");
    const UserPhone=localStorage.getItem("userPhone");
    const UserGender=localStorage.getItem("userGender");



  return (
    <div>
        <NavBar />
        <div className='profile-view'>
            <h1>Profile</h1>
            <p>Name: {UserName} </p>
            <p>Surname: {UserSurname} </p>
            <p>Email: {UserEmail} </p>
            <p>Phone: {UserPhone} </p>
            <p>Gender: {UserGender}</p>
            <button ><a href="/profile/manager"> Edit </a></button>
        </div>
    </div>
  )
}

export default ProfileViewer