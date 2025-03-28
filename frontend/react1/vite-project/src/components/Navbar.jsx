import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  currentUser,
  setShowDashboard,
  setShowUploader,
  setShowForm,
  setShowDataAnalysis,
  setShowScriptExecution,
  toggleDashboard,
  handleLogout
}) => {
  const navigate = useNavigate();

  // Function to handle both state changes and navigation
  const handleNavButtonClick = (stateUpdates, path = null) => {
    // Update all state flags
    setShowDashboard(stateUpdates.showDashboard || false);
    setShowUploader(stateUpdates.showUploader || false);
    setShowForm(stateUpdates.showForm || false);
    setShowDataAnalysis(stateUpdates.showDataAnalysis || false);
    setShowScriptExecution(stateUpdates.showScriptExecution || false);
    
    // Navigate if path is provided
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav style={{
      backgroundColor: "#333",
      padding: "10px 20px",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      {/* Left side - Branding */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Business Analytics
          </Link>
        </div>
        {currentUser && (
          <span style={{ color: "#aaa" }}>
            {currentUser.username} ({currentUser.role})
          </span>
        )}
      </div>

      {/* Right side - Navigation */}
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Dashboard */}
        {currentUser && (
          <button 
            className="nav-button" 
            onClick={() => {
              handleNavButtonClick({
                showDashboard: true
              }, "/dashboard");
              toggleDashboard();
            }}
          >
            Dashboard
          </button>
        )}

        {/* Upload Data */}
        {(currentUser?.is_admin || currentUser?.is_super_admin) && (
          <button 
            className="nav-button"
            onClick={() => handleNavButtonClick({
              showUploader: true
            }, "/upload")}
          >
            Upload Data
          </button>
        )}

        {/* Business Form */}
        {currentUser?.is_super_admin && (
          <button 
            className="nav-button"
            onClick={() => handleNavButtonClick({
              showForm: true
            }, "/business-form")}
          >
            Business Form
          </button>
        )}

        {/* Data Analysis */}
        {currentUser && (
          <button 
            className="nav-button"
            onClick={() => handleNavButtonClick({
              showDataAnalysis: true
            }, "/analysis")}
          >
            Data Analysis
          </button>
        )}

        {/* Script Execution */}
        {currentUser?.is_super_admin && (
          <button 
            className="nav-button"
            onClick={() => handleNavButtonClick({
              showScriptExecution: true
            }, "/script-control")}
          >
            Script Control
          </button>
        )}

        {/* Additional Buttons */}
        {currentUser && (
          <>
            <button 
              className="nav-button"
              onClick={() => handleNavButtonClick({
                showDashboard: false,
                showUploader: false,
                showForm: false,
                showDataAnalysis: false,
                showScriptExecution: false
              }, "/reports")}
            >
              Reports
            </button>

           
          </>
        )}

        {/* Logout */}
        {currentUser ? (
          <button 
            className="nav-button logout-button" 
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
