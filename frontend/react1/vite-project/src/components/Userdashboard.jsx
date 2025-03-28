import React from "react";
import DataVisualization from "../DataVisualization";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <p>You can view business data and visualizations</p>
      
      <div className="user-features">
        <Businessdata />
      </div>
    </div>
  );
};

export default UserDashboard;