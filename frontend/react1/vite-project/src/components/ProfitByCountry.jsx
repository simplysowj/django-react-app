import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ProfitByRevenue.css'; // Create this CSS file for component-specific styles

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);
const BASE_URL = "https://djangoappcontainer2025unique.azurewebsites.net/";
const ProfitByRevenue = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Color palette for the chart
    const colorPalette = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8AC24A', '#EA5F89', '#00BBD3', '#F06292'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://djangoappcontainer2025unique.azurewebsites.net/api/business/profitbycountry/');
                
                const countries = Object.keys(response.data);
                const profits = Object.values(response.data);

                if (countries.length === 0) {
                    throw new Error('No data available');
                }

                setChartData({
                    labels: countries,
                    datasets: [{
                        label: 'Profit by Country',
                        data: profits,
                        backgroundColor: colorPalette.slice(0, countries.length).map(color => `${color}80`),
                        borderColor: colorPalette.slice(0, countries.length),
                        borderWidth: 1,
                        hoverOffset: 15
                    }]
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Profit Distribution by Country',
                font: {
                    size: 16
                }
            }
        },
        cutout: '60%', // Makes it more of a donut chart
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    return (
        <div className="profit-by-revenue-container">
            <h2 className="chart-title">Profit by Country</h2>
            
            {loading ? (
                <div className="loading-indicator">Loading data...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="chart-wrapper">
                    <Pie 
                        data={chartData} 
                        options={chartOptions}
                        redraw
                    />
                </div>
            )}
        </div>
    );
};

export default ProfitByRevenue;
