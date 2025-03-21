import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ProfitByRevenue = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Profit by Revenue',
                data: [],
                backgroundColor: [
                    'rgba(255,99,132,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(255,206,86,0.2)',
                    'rgba(75,192,192,0.2)',
                    'rgba(153,102,255,0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        axios.get('https://djangoappcontainer2025unique.azurewebsites.net/api/business/profitbycountry/')
            .then(response => {
                console.log('API Response:', response.data);  // Log the response data
                const countries = Object.keys(response.data);
                const profits = Object.values(response.data);

                setData({
                    labels: countries,
                    datasets: [
                        {
                            label: 'Profit by Revenue',
                            data: profits,
                            backgroundColor: [
                                'rgba(255,99,132,0.2)',
                                'rgba(54,162,235,0.2)',
                                'rgba(255,206,86,0.2)',
                                'rgba(75,192,192,0.2)',
                                'rgba(153,102,255,0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54,162,235,1)',
                                'rgba(255,206,86,1)',
                                'rgba(75,192,192,1)',
                                'rgba(153,102,255,1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Profit by Country</h2>
            {data.labels && data.datasets && data.labels.length > 0 && data.datasets[0].data.length > 0 ? (
                <Pie data={data}
                
                options={{
                    responsive: false,
                    maintainAspectRatio: true, // Ensures the chart maintains its aspect ratio
                    plugins: {
                        tooltip: {
                            enabled: true, // Enable tooltips
                        },
                    },
                }}
                
                     />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfitByRevenue;
