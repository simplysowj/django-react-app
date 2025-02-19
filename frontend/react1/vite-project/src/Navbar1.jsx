import React from "react";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = ({ toggleDashboard, setShowUploader, setShowForm, setShowDataAnalysis }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Business Analytics
        </Typography>
        <div>
          <Button
            color="inherit"
            onClick={toggleDashboard}
            sx={{ marginRight: 2, fontWeight: "bold" }}
          >
            Visualization plots (Dashboard)
          </Button>
          <Button
            color="inherit"
            onClick={() => setShowUploader((prev) => !prev)}
            sx={{ marginRight: 2, fontWeight: "bold" }}
          >
            Upload Data from excel file
          </Button>
          <Button
            color="inherit"
            onClick={() => setShowForm((prev) => !prev)}
            sx={{ marginRight: 2, fontWeight: "bold" }}
          >
            Enter data from Form
          </Button>
          <Button
            color="inherit"
            onClick={() => setShowDataAnalysis((prev) => !prev)}
            sx={{ fontWeight: "bold" }}
          >
            Data Analysis
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
