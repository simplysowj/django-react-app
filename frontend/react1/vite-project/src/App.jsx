import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExcelUpload from "./fileupload";
//import ProfitByCountryChart from './ProfitByCountryChart';
//import TopCountriesChart from './TopCountriesChart';
import BusinessForm from "./BusinessForm";
//import navbar from "./components/navbar";
import Dashboard from  "./Dashboard";
import Navbar from "./Navbar1";




function App() {
  const [statsData, setStatsData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const toggleDashboard = () => {
    setShowDashboard(!showDashboard); // Toggle Dashboard visibility
  };
  const [scriptStatus, setScriptStatus] = useState('Stopped');
  const [profitData, setProfitData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  //const [toprevenueData, setToprevenueData] = useState(null);
  const [usaData, setUsaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [profitByCountryData, setProfitByCountryData] = useState(null);
  const [topCountriesData, setTopCountriesData] = useState(null);
  const [topBusinessesData, setTopBusinessesData] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showBusinessAnalytics, setShowBusinessAnalytics] = useState(false);
  const [showForm, setShowForm] = useState(false);
 
  const [chartType, setChartType] = useState('bar');  // New state for chart type
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);



  const startScript = async () => {
    try {
      const response = await axios.post('http://localhost:8000//api/business/start-script/');
      setScriptStatus('Running');
      alert(response.data.status);
    } catch (error) {
      console.error('Error starting script:', error);
      alert('Failed to start the script. Check the console for details.');
    }
  };
  const stopScript = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/business/stop-script/');
      setScriptStatus('Stopped');
      alert(response.data.status);
    } catch (error) {
      console.error('Error stopping script:', error);
      alert('Failed to stop the script. Check the console for details.');
    }
  };



  // Fetch Business Stats (GET request)
  const fetchStatsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/business/business/stats/");
      setStatsData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch statistics.");
    }
    setLoading(false);
  };
  // Fetch Top Businesses by Revenue
  const fetchTopBusinessesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/business/top_businesses_by_revenue/");
      setTopBusinessesData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch top businesses by revenue.");
    }
    setLoading(false);
  };
  // Fetch Top Countries by Revenue
  const fetchTopCountriesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/business/topbyrevenue/");
      setTopCountriesData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch top countries by revenue.");
    }
    setLoading(false);
  };




  // Fetch Profit by Country
  const fetchProfitByCountryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/business/profitbycountry/");
      setProfitByCountryData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch profit by country.");
    }
    setLoading(false);
  };




 




  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };




  // Fetch High-Profit Businesses (POST request with file upload)
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
        "http://127.0.0.1:8000/api/business/data/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
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
        "http://127.0.0.1:8000/api/business/revenue/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
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
        "http://127.0.0.1:8000/api/business/usa/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setUsaData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch usa data.");
    }
    setLoading(false);
  };




  




 




  return (
    <>
     <h1>Business Analytics Dashboard</h1>
     <Navbar
        toggleDashboard={() => setShowDashboard((prev) => !prev)}
        setShowUploader={setShowUploader}
        setShowForm={setShowForm}
        setShowDataAnalysis={setShowDataAnalysis}
      />
      <main style={{ padding: "20px" }}>
        
        {showDashboard && <Dashboard />}
        {showUploader && <ExcelUpload />}
        {showForm && <BusinessForm />}
        {showDataAnalysis && <BusinessAnalytics />}
      </main>
    
      
      
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h4>Script Status: {scriptStatus}</h4>
      <button
        onClick={startScript}
        disabled={scriptStatus === 'Running'}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          margin: '10px',
          backgroundColor: scriptStatus === 'Running' ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: scriptStatus === 'Running' ? 'not-allowed' : 'pointer',
        }}
      >
        Start Script
      </button>
      <button
        onClick={stopScript}
        disabled={scriptStatus === 'Stopped'}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          margin: '10px',
          backgroundColor: scriptStatus === 'Stopped' ? '#ccc' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: scriptStatus === 'Stopped' ? 'not-allowed' : 'pointer',
        }}
      >
        Stop Script
      </button>
    </div>
    
   

      
    
    
    
     
    
      

      
      {showDataAnalysis && (
 
      <div className="card">
        <button onClick={fetchStatsData} disabled={loading}>Get Business Stats</button>
        {statsData && (
          <div>
            <h3>Business Stats:</h3>
            <pre>{JSON.stringify(statsData, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchProfitByCountryData} disabled={loading}>Get Profit by Country</button>
        {profitByCountryData && (
          <div>
            <h3>Profit by Country:</h3>
            <pre>{JSON.stringify(profitByCountryData, null, 2)}</pre>
           
           
          </div>
        )}
         <button onClick={fetchTopCountriesData} disabled={loading}>Get Top Countries by Revenue</button>
        {topCountriesData && (
          <div>
            <h3>Top Countries by Revenue:</h3>
            <pre>{JSON.stringify(topCountriesData, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchTopBusinessesData} disabled={loading}>Get Top 5 Businesses by Revenue</button>
        {topBusinessesData && (
          <div>
            <h3>Top 5 Businesses by Revenue:</h3>
            <pre>{JSON.stringify(topBusinessesData, null, 2)}</pre>
          </div>
        )}








        <h3>Upload Data</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={fetchProfitData} disabled={loading}>Upload & Analyze Profit</button>




        {error && <p style={{ color: "red" }}>{error}</p>}




        {profitData && (
          <div>
            <h3>Profitable Businesses (Profit greater than 20,000):</h3>
            <pre>{JSON.stringify(profitData, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchRevenueData} disabled={loading}>Upload & Analyze Revenue</button>




        {error && <p style={{ color: "red" }}>{error}</p>}




        {revenueData && (
          <div>
            <h3>Revenue greater than 50,000:</h3>
            <pre>{JSON.stringify(revenueData, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchUsaData} disabled={loading}>usa data</button>




          {error && <p style={{ color: "red" }}>{error}</p>}




          {usaData && (
            <div>
              <h3>Data with USA:</h3>
              <pre>{JSON.stringify(usaData, null, 2)}</pre>
            </div>
          
          )}
      </div>
      )
      }
      
    




      

    


      
    </>
  );
}




// Component: Business Analytics Stats
const BusinessAnalytics = () => {
  const [data, setData] = useState(null);




  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/business/analytics/")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching analytics:", error));
  }, []);




  return (
    <div>
      <h2>Business Analytics</h2>
      {data ? (
        <ul>
          <li><b>Average Revenue:</b> ${data.mean_revenue}</li>
          <li><b>Average Profit:</b> ${data.mean_profit}</li>
          <li><b>Average number of  Employees:</b> {data.mean_employees}</li>
          <li><b>Max Revenue:</b> ${data.max_revenue}</li>
          <li><b>Min Revenue:</b> ${data.min_revenue}</li>
        </ul>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
  
};





export default App;









