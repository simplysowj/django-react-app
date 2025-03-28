import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const BASE_URL = "https://djangoappcontainer2025unique.azurewebsites.net/";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
 
//   Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
 
//   // Handle file upload to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file to upload.");
      return;
    }
 
    const formData = new FormData();
    formData.append("file", file); // Ensure this matches your Django API field name
 
    try {
      const response = await axios.post("https://djangoappcontainer2025unique.azurewebsites.net/api/business/upload-excel/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
 
      console.log("Upload Success:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload file.");
    }
  };
 
  return (
    <Box sx={{ textAlign: "center", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6">Upload Excel File</Typography>
 
      {/* File Input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{ mt: 2 }}
        >
          Choose File
        </Button>
      </label>
 
      {/* Show File Name */}
      {fileName && (
        <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
          Selected File: {fileName}
        </Typography>
      )}
 
      {/* Upload Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
    </Box>
  );
};
 
export default ExcelUpload;
 
