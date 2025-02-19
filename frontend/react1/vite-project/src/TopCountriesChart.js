import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TopCountriesChart({ topCountriesData }) {
  const chartData = {
    labels: topCountriesData ? Object.keys(topCountriesData) : [],
    datasets: [
      {
        label: 'Top Countries by Revenue',
        data: topCountriesData ? Object.values(topCountriesData) : [],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
}

export default TopCountriesChart;
