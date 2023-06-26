import alertify from "alertifyjs";
import "./Admin.css";
import React from "react";

const Admin = () => {
  const handleAdmin = () => {
    localStorage.setItem("isAdmin", true);
    alertify.success("You are now in Admin Mode");
  };
  const handleUser = () => {
    localStorage.removeItem("isAdmin");
    alertify.error("You are now in User Mode");
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
    </div>
  );
};

export default Admin;
