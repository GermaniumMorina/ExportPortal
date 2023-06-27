import React from "react";
import { useParams } from "react-router-dom";
import "./ManageCompanies.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { BsFillFileEarmarkBreakFill } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { SiQuicklook } from "react-icons/si";

const ManageCompanies = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mc-grid-container">
      <div className="mc-left-column">ID: {id}</div>
      <div className="mc-right-column">
        <div className="row">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Status
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
              <div className="main-announcments-div">
              <div className="company-status is-preparing" onClick={handleClose}>
              <SiQuicklook />
              <span>Preparing </span>
            </div>
          
            <div
              className="company-status is-under"
              onClick={handleClose}
            >
              <BsFillFileEarmarkBreakFill />
              <span>Under Reviewal</span>
            </div>
            <div className="company-status is-approved" onClick={handleClose}>
              <MdOutlineDoneOutline />
              <span>Approved</span>
            </div>

            <div
              className="company-status is-disapproved"
              onClick={handleClose}
            >
              <ImNotification />
              <span>Disapproved</span>
            </div>

         
            </div>
          </Menu>
          
        </div>
        <div className="mc-row">Row 2</div>
      </div>
    </div>
  );
};

export default ManageCompanies;
