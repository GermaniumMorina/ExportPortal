import React, { useState } from 'react';
import './NavigationProfile.css';
import ProfileViewer from './ProfileViewer';
import ProfileManager from './ProfileManager';
import Password from './Password';
import { useMediaQuery } from "react-responsive";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const NavigationProfile = () => {
  const [selectedComponent, setSelectedComponent] = useState(<ProfileViewer />);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width :450px)" });

  const handleItemClick = (component) => {
    setSelectedComponent(component);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === "A") {
      const component = target.getAttribute("data-component");
      if (component === "ProfileViewer") {
        setSelectedComponent(<ProfileViewer />);
      } else if (component === "ProfileManager") {
        setSelectedComponent(<ProfileManager />);
      } else if (component === "Password") {
        setSelectedComponent(<Password />);
      }
    }
  };

  return !isPortrait && !isMobile ? (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <br />
        <br />
        <br />
        <p onClick={() => handleItemClick(<ProfileViewer />)}>
          <i className="fa fa-user-o" aria-hidden="true"></i>
          Account
        </p>
        <br />
        <br />
        <p onClick={() => handleItemClick(<ProfileManager />)}>
          <i className="fa fa-laptop" aria-hidden="true"></i>
          Account Editor
        </p>
        <br />
        <br />
        <p onClick={() => handleItemClick(<Password />)}>
          <i className="fa fa-clone" aria-hidden="true"></i>
          Security
        </p>
      </aside>
      <div className="profile-content">{selectedComponent}</div>
    </div>
  ) : (
<div className="d-flex justify-content-center"> 
   <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          data-component="ProfileViewer"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Account
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          data-component="ProfileManager"
        >
          <ManageAccountsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Account Editor
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          data-component="Password"
        >
          <PasswordIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Security
        </Link>
      </Breadcrumbs>
      {selectedComponent}
    </div>
    </div>
  );
};

export default NavigationProfile;
