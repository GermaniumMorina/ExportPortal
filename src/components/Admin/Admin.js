import alertify from "alertifyjs";
import "./Admin.css";
import React from "react";
import Chat from "../Chat/Chat";

const Admin = () => {
  const handleAdmin = () => {
    localStorage.setItem("isAdmin", true);
    alertify.success("You are now in Admin Mode");
  };
  const handleUser = () => {
    localStorage.removeItem("isAdmin");
    alertify.error("You are now in User Mode");
  };
  const handleUserManager = () => {
    window.location.href = "/admin/search-user";
  };

  const handleCompanies = () => {
    window.location.href = "/admin/search-company";
  };
  const handleNewsletter = () => {
    window.location.href = "/admin/newsletter";
  };
  const handleExport = () => {
    window.location.href = "/admin/success";
  };
  const handleAnnouncements = () => {
    window.location.href = "/admin/announcements";
  };
  return (
    <div>
      <button onClick={handleAdmin} className="admin-button">
        Admin Mode
      </button>
      <button onClick={handleUser} className="user-button">
        User Mode
      </button>
      <br />
      <button onClick={handleNewsletter} className="admin-button">
        Write newsletter
      </button>
      <br />

      <button onClick={handleExport} className="admin-button">
        Write success stories
      </button>
      <br />

      <button onClick={handleAnnouncements} className="admin-button">
        Write an Announcement
      </button>
      <br />

      <button onClick={handleCompanies} className="admin-button">
        Edit a company
      </button>
      <br />
      <button onClick={handleUserManager} className="admin-button">
        Edit a User
      </button>
      <br />

      <Chat/>
    </div>
  );
};

export default Admin;
