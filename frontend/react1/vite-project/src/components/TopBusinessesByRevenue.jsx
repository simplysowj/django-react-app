import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopBusinessesByRevenue = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Revenue',
                data: [],
                backgroundColor: 'rgba(255,99,132,0.6)',
                barThickness: 40,  // Adjust the thickness of the bars
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        axios.get('https://djangoappcontainer2025unique.azurewebsites.net/api/business/top_businesses_by_revenue/')
            .then(response => {
            if (response.data && Array.isArray(response.data)) {
                const businesses = response.data.map(business => business.name);
                const revenues = response.data.map(business => business.revenue);
                setData({
                    labels: businesses,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: revenues,
                            backgroundColor: 'rgba(255,99,132,0.6)',
                        },
                    ],
                });
            } else {
                console.error('Invalid API response:', response.data);
            }
        })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Top 5 Countries by Revenue</h2>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,  // Maintain aspect ratio
                    indexAxis: 'y', // This will make the bars horizontal
                    scales: {
                        x: {
                            beginAtZero: true,  // Ensure the x-axis starts at zero
                        },
                        y: {
                            ticks: {
                                maxRotation: 45,  // Rotate labels to prevent overlap
                                minRotation: 0,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default React.memo(TopBusinessesByRevenue);
