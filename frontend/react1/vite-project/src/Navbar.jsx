import React from "react";

const Navbar = ({ 
  setShowDashboard,
  setShowUploader,
  setShowForm,
  setShowDataAnalysis,
  toggleDashboard, 
  setShowScriptExecution
}) => {
  return (
    <div id="header">
      <div id="branding">
        <h1 id="site-name">Business Analytics</h1>
      </div>
      <div id="user-tools">
        
        <button 
      className="button" 
      onClick={() => toggleDashboard()}
    >
      Dashboard
    </button>
        <button 
          className="button" 
          onClick={() => {
            setShowUploader(true);
            setShowDashboard(false);
            setShowForm(false);
            setShowDataAnalysis(false);
            setShowScriptExecution(false);
          }}
        >
          Upload Data
        </button>
        <button 
          className="button" 
          onClick={() => {
            setShowForm(true);
            setShowDashboard(false);
            setShowUploader(false);
            setShowDataAnalysis(false);
            setShowScriptExecution(false);
          }}
        >
          Business Form
        </button>
        <button 
          className="button" 
          onClick={() => {
            setShowDataAnalysis(true);
            setShowDashboard(false);
            setShowUploader(false);
            setShowForm(false);
            setShowScriptExecution(false);
          }}
        >
          Data Analysis
        </button>
        <button 
          className="button" 
          onClick={() => {
            setShowScriptExecution(true);
            setShowDashboard(false);
            setShowUploader(false);
            setShowForm(false);
            setShowDataAnalysis(false);
          }}
        >
          Script Execution
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;