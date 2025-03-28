import React, { useState } from 'react';
import TopCountriesByRevenue from './components/TopCountriesByRevenue';
import ProfitByCountry from './components/ProfitByCountry';
import TopBusinessesByRevenue from './components/TopBusinessesByRevenue';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary component


const BASE_URL = "https://djangoappcontainer2025unique.azurewebsites.net/";
const Dashboard = () => {
    const [view, setView] = useState(null);

    return (
        <div>
            <h1>Data Analysis Dashboard</h1>
            <button onClick={() => setView('topCountriesByRevenue')}>Top 5 Countries by Revenue</button>
            <button onClick={() => setView('profitByCountry')}>Profit by Country</button>
            <button onClick={() => setView('topBusinessesByRevenue')}>Top 5 Businesses by Revenue</button>

            {/* Use ErrorBoundary to wrap each chart component */}
            <ErrorBoundary>
                {view === 'topCountriesByRevenue' && (
                    <TopCountriesByRevenue key="topCountriesByRevenue" />
                )}
                {view === 'profitByCountry' && (
                    <ProfitByCountry key="profitByCountry" />
                )}
                {view === 'topBusinessesByRevenue' && (
                    <TopBusinessesByRevenue key="topBusinessesByRevenue" />
                )}
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard;
