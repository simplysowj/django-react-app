import React, { useState, useEffect } from "react";
import axios from "axios";

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    revenue: "",
    profit: "",
    employees: "",
    country: "",
  });
  const [businesses, setBusinesses] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("https://djangoappcontainer2025unique.azurewebsites.net/api/business/business/");
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.revenue || isNaN(formData.revenue)) newErrors.revenue = "Revenue must be a valid number.";
    if (!formData.profit || isNaN(formData.profit)) newErrors.profit = "Profit must be a valid number.";
    if (!formData.employees || isNaN(formData.employees)) newErrors.employees = "Employees must be a valid number.";
    if (!formData.country) newErrors.country = "Country is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (editId) {
          await axios.put(`https://djangoappcontainer2025unique.azurewebsites.net/api/business/business/${editId}/`, formData);
        } else {
          await axios.post("https://djangoappcontainer2025unique.azurewebsites.net/api/business/forminsert/", formData);
        }
        setSuccess(true);
        setFormData({ name: "", revenue: "", profit: "", employees: "", country: "" });
        setEditId(null);
        fetchBusinesses();
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to submit the form. Please try again." });
      }
    }
  };

  const handleEdit = (business) => {
    setFormData(business);
    setEditId(business.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://djangoappcontainer2025unique.azurewebsites.net/api/business/business/${id}/`);
      
      fetchBusinesses();
    } catch (error) {
      console.error("Error deleting business:", error);
      //console.log("Deleting business with ID:", id);
    }
  };

  return (
    <div className="form-container">
      <h2>{editId ? "Edit Business Data" : "Add Business Data"}</h2>
      {success && <p style={{ color: "green" }}>Data submitted successfully!</p>}
      {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label>Revenue:</label>
          <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} />
          {errors.revenue && <p style={{ color: "red" }}>{errors.revenue}</p>}
        </div>
        <div>
          <label>Profit:</label>
          <input type="number" name="profit" value={formData.profit} onChange={handleChange} />
          {errors.profit && <p style={{ color: "red" }}>{errors.profit}</p>}
        </div>
        <div>
          <label>Employees:</label>
          <input type="number" name="employees" value={formData.employees} onChange={handleChange} />
          {errors.employees && <p style={{ color: "red" }}>{errors.employees}</p>}
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>
        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>

      <h2>Business Data</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Revenue</th>
            <th>Profit</th>
            <th>Employees</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business,index) => (
                        <tr key={business.id || `business-${index}`}>
              <td>{business.name}</td>
              <td>{business.revenue}</td>
              <td>{business.profit}</td>
              <td>{business.employees}</td>
              <td>{business.country}</td>
              <td>
                <button onClick={() => handleEdit(business)}>Edit</button>
                <button onClick={() => handleDelete(business.id)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessForm;
