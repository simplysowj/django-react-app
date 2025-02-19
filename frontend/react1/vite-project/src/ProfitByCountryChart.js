import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ProfitByCountryChart({ profitByCountryData }) {
  // Prepare the data in the format Recharts expects
  const chartData = profitByCountryData
    ? Object.keys(profitByCountryData).map((country) => ({
        name: country,
        value: profitByCountryData[country],
      }))
    : [];

  return (
    <div>
      <h2>Profit by Country (Bar Chart)</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default ProfitByCountryChart;
