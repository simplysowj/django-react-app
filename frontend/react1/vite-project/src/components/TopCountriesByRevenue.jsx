import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopCountriesByRevenue = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Revenue',
                data: [],
                backgroundColor: 'rgba(255,99,132,0.6)',
                barThickness: 40, // Adjust bar thickness
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/business/topbyrevenue/')
            .then(response => {
                console.log('API Response:', response.data); // Debugging log

                // Ensure the response is an object and not an array
                if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                    const countries = Object.keys(response.data); // Extract country names (keys)
                    const revenues = Object.values(response.data); // Extract revenues (values)

                    setData({
                        labels: countries,
                        datasets: [
                            {
                                label: 'Revenue',
                                data: revenues,
                                backgroundColor: 'rgba(255,99,132,0.6)',
                                barThickness: 40,
                            },
                        ],
                    });
                } else {
                    console.error('Invalid API response format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <h2>Top 5 Countries by Revenue</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Bar
                    ref={chartRef}
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        indexAxis: 'x', // Horizontal bar chart
                        scales: {
                            x: {
                                beginAtZero: true, // Ensure x-axis starts at zero
                            },
                            y: {
                                ticks: {
                                    maxRotation: 45, // Rotate labels to prevent overlap
                                    minRotation: 0,
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default React.memo(TopCountriesByRevenue);
