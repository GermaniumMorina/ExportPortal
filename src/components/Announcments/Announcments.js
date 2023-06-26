import React, { useEffect, useState } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import axios from "axios";
import "./Announcments.css";

const Announcments = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [badgenumber, setBadgeNumber] = useState();
  const open = Boolean(anchorEl);

  const getAnnouncements = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/viewAnnouncements");
      setAnnouncements(response.data);
      setBadgeNumber(response.data.length); // Set badge number to the length of announcements
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setBadgeNumber(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "black" }}
        >
          <Badge badgeContent={badgenumber} color="primary">
            <CampaignIcon sx={{ fontSize: 30 }} />
          </Badge>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              background: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <div className="main-announcments-div">
            {announcements.map((announcement, index) => (
              <div className="announcments-card" key={index}>
                <h3 className="announcments-card__title">{announcement.title}</h3>
                <p className="announcments-card__content">{announcement.text}</p>
                <div className="announcments-card__date">{formatDate(announcement.created_at)}</div>
                <div className="announcments-card__arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    viewBox="0 0 24 24"
                    height="15"
                    width="15"
                  >
                    <path
                      fill="#fff"
                      d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Announcments;
