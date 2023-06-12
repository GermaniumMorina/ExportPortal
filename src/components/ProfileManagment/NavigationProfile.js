import React, { useState } from 'react';
import './NavigationProfile.css';
import ProfileViewer from './ProfileViewer';
import ProfileManager from './ProfileManager';

const NavigationProfile = () => {
  const [selectedComponent, setSelectedComponent] = useState(<ProfileViewer />);

  const handleItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
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
        <p onClick={() => handleItemClick(<ProfileViewer />)}>
          <i className="fa fa-clone" aria-hidden="true"></i>
          Security
        </p>
      </aside>
      <div className="profile-content">{selectedComponent}</div>
    </div>
  );
};

export default NavigationProfile;
