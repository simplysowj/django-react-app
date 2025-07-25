import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./stylesnew.css";
import ExcelUpload from "./fileupload";
import BusinessForm from "./BusinessForm";
import Dashboard from "./components/Dashboard";
import Navbar from "./Navbar";
import Login from "./components/Login";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import dashboardImage from "./components/badashboard.png";

const BASE_URL = "https://djangoappcontainer2025unique.azurewebsites.net/";

// Configure axios to include auth token in all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const GraphDisplay = ({ columns, results, graphType }) => {
  if (!graphType) return null;

  const data = results.map((row) => ({
    [columns[0]]: row[0], // X-axis
    [columns[1]]: row[1], // Y-axis
  }));

  return (
    <div className="graph-container">
      <h2 className="graph-title">Generated Visualization</h2>
      <ResponsiveContainer width="80%" height={300}>
        {graphType === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey={columns[0]} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={columns[1]} fill="#8884d8" />
          </BarChart>
        )}
        {graphType === "line" && (
          <LineChart data={data}>
            <XAxis dataKey={columns[0]} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={columns[1]} stroke="#8884d8" />
          </LineChart>
        )}
        {graphType === "pie" && (
          <PieChart>
            <Pie data={data} dataKey={columns[1]} nameKey={columns[0]} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

function App() {
  // State declarations
  const [statsData, setStatsData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [scriptStatus, setScriptStatus] = useState('Stopped');
  const [profitData, setProfitData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [usaData, setUsaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [profitByCountryData, setProfitByCountryData] = useState(null);
  const [topCountriesData, setTopCountriesData] = useState(null);
  const [topBusinessesData, setTopBusinessesData] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);
  const [showScriptExecution, setShowScriptExecution] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");
  
  const [columns, setColumns] = useState([]);
  const [results, setResults] = useState([]);
  const [graphType, setGraphType] = useState(null);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("token")) && 
           localStorage.getItem("isSuperuser") === "true";
  });

  // Verify token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${BASE_URL}api/auth/verify/`)
        .catch(() => {
          handleLogout();
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isSuperuser");
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://djangoappcontainer2025unique.azurewebsites.net/api/business/execute-query/`, { query: sqlQuery });
      if (response.data.columns && response.data.results) {
        setColumns(response.data.columns);
        setResults(response.data.results);
        setGraphType(response.data.graph_type);
      } else {
        setError("Invalid response format from server.");
      }
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error executing query.");
    }
  };

  // ... (keep all your existing data fetching functions)

  const HomePage = () => (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Business Analytics Dashboard</h1>
          <p>Powerful insights and data visualization for your business</p>
          <div className="cta-buttons">
            <button 
              className="button primary" 
              onClick={() => {
                setShowDashboard(true);
                setShowUploader(false);
                setShowForm(false);
                setShowDataAnalysis(false);
                setShowScriptExecution(false);
              }}
            >
              Explore Dashboard
            </button>
            <button 
              className="button secondary"
              onClick={() => {
                setShowDataAnalysis(true);
                setShowDashboard(false);
                setShowUploader(false);
                setShowForm(false);
                setShowScriptExecution(false);
              }}
            >
              Start Analysis
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={dashboardImage} alt="Dashboard Preview" style={{ width: "100%", maxWidth: "500px" }} />
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Data Visualization</h3>
          <p>Interactive charts and graphs to understand your business metrics</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Revenue Analysis</h3>
          <p>Track and optimize your revenue streams</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌎</div>
          <h3>Global Insights</h3>
          <p>Analyze performance across different countries</p>
        </div>
      </div>
    </div>
  );
const startScript = async () => {
    try {
      const response = await axios.post('https://djangoappcontainer2025unique.azurewebsites.net/api/business/start-script/');
      setScriptStatus('Running');
      alert(response.data.status);
    } catch (error) {
      console.error('Error starting script:', error);
      alert('Failed to start the script. Check the console for details.');
    }
  };
  const stopScript = async () => {
    try {
      const response = await axios.post('https://djangoappcontainer2025unique.azurewebsites.net/api/business/stop-script/');
      setScriptStatus('Stopped');
      alert(response.data.status);
    } catch (error) {
      console.error('Error stopping script:', error);
      alert('Failed to stop the script. Check the console for details.');
    }
  };
  const fetchStatsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://djangoappcontainer2025unique.azurewebsites.net/api/business/business/stats/");
      setStatsData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch statistics.");
    }
    setLoading(false);
  };
  const fetchTopBusinessesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://djangoappcontainer2025unique.azurewebsites.net/api/business/top_businesses_by_revenue/");
      setTopBusinessesData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch top businesses by revenue.");
    }
    setLoading(false);
  };
const fetchTopCountriesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://djangoappcontainer2025unique.azurewebsites.net/api/business/topbyrevenue/");
      setTopCountriesData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch top countries by revenue.");
    }
    setLoading(false);
  };
  const fetchProfitByCountryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://djangoappcontainer2025unique.azurewebsites.net/api/business/profitbycountry/");
      setProfitByCountryData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch profit by country.");
    }
    setLoading(false);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchProfitData = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
     setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://djangoappcontainer2025unique.azurewebsites.net/api/business/data/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfitData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch profit data.");
    }
    setLoading(false);
  };
  const fetchRevenueData = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://djangoappcontainer2025unique.azurewebsites.net/api/business/revenue/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setRevenueData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch revenue data.");
    }
    setLoading(false);
  };

  const fetchUsaData = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://djangoappcontainer2025unique.azurewebsites.net/api/business/usa/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUsaData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch usa data.");
    }
    setLoading(false);
  };

  const BusinessAnalytics = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      axios.get(`${BASE_URL}api/business/analytics/`)
        .then(response => setData(response.data))
        .catch(error => console.error("Error fetching analytics:", error));
    }, []);

    return (
      <div className="module">
        <h2>Business Analytics</h2>
        {data ? (
          <ul>
            <li><b>Average Revenue:</b> ${data.mean_revenue.toLocaleString()}</li>
            <li><b>Average Profit:</b> ${data.mean_profit.toLocaleString()}</li>
            <li><b>Average number of Employees:</b> {data.mean_employees.toLocaleString()}</li>
            <li><b>Max Revenue:</b> ${data.max_revenue.toLocaleString()}</li>
            <li><b>Min Revenue:</b> ${data.min_revenue.toLocaleString()}</li>
          </ul>
        ) : (
          <p>Loading analytics...</p>
        )}
      </div>
    );
  };

  const ScriptExecutionPanel = () => (
    <div className="module">
      <h2>Script Control</h2>
      <div className="form-row">
        <p>Script Status: <strong>{scriptStatus}</strong></p>
        <div className="submit-row">
          <button
            onClick={startScript}
            disabled={scriptStatus === 'Running' || loading}
            className="button"
          >
            Start Script
          </button>
          <button
            onClick={stopScript}
            disabled={scriptStatus === 'Stopped' || loading}
            className="button"
          >
            Stop Script
          </button>
        </div>
      </div>
    </div>
  );

  const AppContent = () => (
    <div className="main" style={{ width: '100%' }}>
      <div className="content">
        <div id="content-main">
          {showDashboard && <Dashboard />}
          {showUploader && <ExcelUpload />}
          {showForm && <BusinessForm />}
          {showScriptExecution && <ScriptExecutionPanel />}
          
          {showDataAnalysis && (
            <>
              <BusinessAnalytics />
              <div className="module">
                <h2>Data Analysis Tools</h2>
                 <div className="form-row">
                    <button onClick={fetchStatsData} disabled={loading} className="button">
                      Get Business Stats
                    </button>
                    {statsData && (
  <div className="stats-table-container">
    <h3>Business Statistics</h3>
    <table className="stats-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Mean</th>
          <th>Standard Deviation</th>
          <th>Minimum</th>
          <th>Maximum</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(statsData).map(([category, values]) => (
          <tr key={category}>
            <td className="category">{category.charAt(0).toUpperCase() + category.slice(1)}</td>
            <td>{typeof values.mean === 'number' ? values.mean.toLocaleString(undefined, {maximumFractionDigits: 2}) : values.mean}</td>
            <td>{typeof values.std_dev === 'number' ? values.std_dev.toLocaleString(undefined, {maximumFractionDigits: 2}) : values.std_dev}</td>
            <td>{typeof values.min === 'number' ? values.min.toLocaleString() : values.min}</td>
            <td>{typeof values.max === 'number' ? values.max.toLocaleString() : values.max}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
                  </div>

                  <div className="form-row">
                    <button onClick={fetchProfitByCountryData} disabled={loading} className="button">
                      Get Profit by Country
                    </button>
                    {profitByCountryData && (
  <div className="profit-table-container">
    <h3>Profit by Country</h3>
    <table className="profit-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Profit</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(profitByCountryData).map(([country, profit]) => (
          <tr key={country}>
            <td>{country}</td>
            <td>${typeof profit === 'number' ? profit.toLocaleString() : profit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
                  </div>

                  <div className="form-row">
                    <button onClick={fetchTopCountriesData} disabled={loading} className="button">
                      Get Top Countries by Revenue
                    </button>
                    {topCountriesData && (
  <div className="countries-table-container">
    <h3>Top Countries by Revenue</h3>
    <table className="countries-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Country</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(topCountriesData).map(([country, revenue], index) => (
          <tr key={country}>
            <td>{index + 1}</td>
            <td>{country}</td>
            <td>${typeof revenue === 'number' ? revenue.toLocaleString() : revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
                  </div>

                  <div className="form-row">
                    <button onClick={fetchTopBusinessesData} disabled={loading} className="button">
                      Get Top 5 Businesses by Revenue
                    </button>
                    {topBusinessesData && (
  <div className="business-table-container">
    <h3>Top 5 Businesses by Revenue</h3>
    <table className="business-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Business Name</th>
          <th>Revenue (USD)</th>
        </tr>
      </thead>
      <tbody>
        {topBusinessesData.map((business, index) => (
          <tr key={`${business.name}-${index}`}>
            <td className="rank">{index + 1}</td>
            <td className="name">{business.name}</td>
            <td className="revenue">${business.revenue.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
                  </div>

                  <div className="form-row">
                    <h3>Upload Data</h3>
                    <input 
                      type="file" 
                      onChange={handleFileChange} 
                      className="vTextField" 
                      disabled={loading}
                    />
                    <div className="submit-row">
                      <button 
                        onClick={fetchProfitData} 
                        disabled={loading || !file}
                        className="button default"
                      >
                        Upload & Analyze Profit
                      </button>
                      <button 
                        onClick={fetchRevenueData} 
                        disabled={loading || !file}
                        className="button default"
                      >
                        Upload & Analyze Revenue
                      </button>
                      <button 
                        onClick={fetchUsaData} 
                        disabled={loading || !file}
                        className="button default"
                      >
                        Upload & Analyze USA Data
                      </button>
                    </div>
                  </div>

                  {error && <div className="errornote">{error}</div>}

                  {profitData && (
                    <div className="results">
                      <h3>Profitable Businesses (Profit greater than 20,000):</h3>
                      <pre>{JSON.stringify(profitData, null, 2)}</pre>
                    </div>
                  )}

                  {revenueData && (
                    <div className="results">
                      <h3>Revenue greater than 50,000:</h3>
                      <pre>{JSON.stringify(revenueData, null, 2)}</pre>
                    </div>
                  )}

                  {usaData && (
                    <div className="results">
                      <h3>Data with USA:</h3>
                      <pre>{JSON.stringify(usaData, null, 2)}</pre>
                    </div>
                  )}
              </div>
            </>
          )}
          
          {/* OpenAI Data Visualizations Section */}
          <div>
            <h4 style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "20px",
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
            }}>
              OpenAI Data Visualizations
            </h4>

            <form onSubmit={handleSubmit} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
            }}>
              <input 
                value={sqlQuery} 
                onChange={(e) => setSqlQuery(e.target.value)} 
                placeholder="Enter your question"
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  outline: "none",
                }} 
              />
              <button 
                type="submit" 
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#0056b3")}
                onMouseOut={(e) => (e.target.style.background = "#007bff")}
              >
                Generate
              </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {columns.length > 0 && results.length > 0 && (
              <div className="table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="graph-button" onClick={() => setGraphType("bar")}>
                  Generate Graph
                </button>
                <GraphDisplay columns={columns} results={results} graphType={graphType} />
              </div>
            )}
          </div>

          {!showDashboard && !showUploader && !showForm && 
           !showDataAnalysis && !showScriptExecution && <HomePage />}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div id="container" style={{ width: '100vw', overflowX: 'hidden' }}>
        {isAuthenticated && (
          <Navbar
            toggleDashboard={() => {
              setShowDashboard(!showDashboard);
              setShowUploader(false);
              setShowForm(false);
              setShowDataAnalysis(false);
              setShowScriptExecution(false);
            }}
            setShowUploader={(val) => {
              setShowUploader(val);
              setShowDashboard(false);
              setShowForm(false);
              setShowDataAnalysis(false);
              setShowScriptExecution(false);
            }}
            setShowForm={(val) => {
              setShowForm(val);
              setShowDashboard(false);
              setShowUploader(false);
              setShowDataAnalysis(false);
              setShowScriptExecution(false);
            }}
            setShowDataAnalysis={(val) => {
              setShowDataAnalysis(val);
              setShowDashboard(false);
              setShowUploader(false);
              setShowForm(false);
              setShowScriptExecution(false);
            }}
            setShowScriptExecution={(val) => {
              setShowScriptExecution(val);
              setShowDashboard(false);
              setShowUploader(false);
              setShowForm(false);
              setShowDataAnalysis(false);
            }}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        )}
        
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          
          <Route path="/" element={
            isAuthenticated ? (
              <AppContent />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
