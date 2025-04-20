import React from 'react';
import GuestSideNavBar from '../../components/GuestSideNavBar';
import './GuestDashboard.css'; // Make sure this path is correct

const GuestDashboard = () => {
  return (
    <div className="guest-dashboard-layout">
      <GuestSideNavBar />
      <div className="guest-main-content">
        <h1>Welcome to the Guest Dashboard</h1>
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default GuestDashboard;
