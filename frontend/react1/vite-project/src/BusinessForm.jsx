import React, { useState, useEffect } from "react";
import axios from "axios";
import './components/BusinessForm.css';
const BASE_URL = "https://djangoappcontainer2025unique.azurewebsites.net/";
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
  const [searchTerm, setSearchTerm] = useState("");

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
          await axios.put(`http://127.0.0.1:8000/api/business/business/${editId}/`, formData);
          setSuccess("Business updated successfully!");
        } else {
          await axios.post("http://127.0.0.1:8000/api/business/forminsert/", formData);
          setSuccess("Business added successfully!");
        }
        setFormData({ name: "", revenue: "", profit: "", employees: "", country: "" });
        setEditId(null);
        fetchBusinesses();
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to submit the form. Please try again." });
      }
    }
  };

  const handleEdit = (business) => {
    setFormData({
      name: business.name,
      revenue: business.revenue,
      profit: business.profit,
      employees: business.employees,
      country: business.country
    });
    setEditId(business.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/business/business/${id}/`);
        setSuccess("Business deleted successfully!");
        fetchBusinesses();
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        console.error("Error deleting business:", error);
        setErrors({ submit: "Failed to delete business. Please try again." });
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm) ||
    business.country.toLowerCase().includes(searchTerm) ||
    business.revenue.toString().includes(searchTerm) ||
    business.profit.toString().includes(searchTerm) ||
    business.employees.toString().includes(searchTerm)
  );

  return (
    <div className="module">
      <h2>{editId ? "Edit Business Data" : "Add Business Data"}</h2>
      
      {success && (
        <ul className="messagelist">
          <li>{success}</li>
        </ul>
      )}
      
      {errors.submit && (
        <div className="errornote">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="field-box">
            <label htmlFor="id_name">Name:</label>
            <div className="field-content">
              <input
                type="text"
                name="name"
                id="id_name"
                className="vTextField"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="field-box">
            <label htmlFor="id_revenue">Revenue:</label>
            <div className="field-content">
              <input
                type="number"
                name="revenue"
                id="id_revenue"
                className="vTextField"
                value={formData.revenue}
                onChange={handleChange}
              />
              {errors.revenue && <div className="error">{errors.revenue}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="field-box">
            <label htmlFor="id_profit">Profit:</label>
            <div className="field-content">
              <input
                type="number"
                name="profit"
                id="id_profit"
                className="vTextField"
                value={formData.profit}
                onChange={handleChange}
              />
              {errors.profit && <div className="error">{errors.profit}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="field-box">
            <label htmlFor="id_employees">Employees:</label>
            <div className="field-content">
              <input
                type="number"
                name="employees"
                id="id_employees"
                className="vTextField"
                value={formData.employees}
                onChange={handleChange}
              />
              {errors.employees && <div className="error">{errors.employees}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="field-box">
            <label htmlFor="id_country">Country:</label>
            <div className="field-content">
              <input
                type="text"
                name="country"
                id="id_country"
                className="vTextField"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <div className="error">{errors.country}</div>}
            </div>
          </div>
        </div>

        <div className="submit-row">
          <button type="submit" className="button default">
            {editId ? "Update" : "Submit"}
          </button>
          {editId && (
            <button
              type="button"
              className="button"
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", revenue: "", profit: "", employees: "", country: "" });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="module">
        <h2>Business Data</h2>
        
        <div className="search-container">
          <form className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </div>

        <div className="table-container">
          <table className="table">
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
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business, index) => (
                  <tr key={business.id || `business-${index}`} className={index % 2 === 0 ? "row1" : "row2"}>
                    <td>{business.name}</td>
                    <td>${business.revenue.toLocaleString()}</td>
                    <td>${business.profit.toLocaleString()}</td>
                    <td>{business.employees.toLocaleString()}</td>
                    <td>{business.country}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(business)}
                        className="changelink"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(business.id)}
                        className="deletelink"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No businesses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;
