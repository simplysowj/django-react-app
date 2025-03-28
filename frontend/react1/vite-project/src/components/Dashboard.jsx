import React, { useState } from 'react';
import TopCountriesByRevenue from './TopCountriesByRevenue';
import ProfitByCountry from './ProfitByCountry';
import TopBusinessesByRevenue from './TopBusinessesByRevenue';
import ErrorBoundary from './ErrorBoundary';
import './dashboardstyles.css';

const Dashboard = () => {
    const [view, setView] = useState('topCountriesByRevenue');

    const getChartContainerClass = (currentView) => {
        return `chart-container ${
            currentView === 'profitByCountry' ? 'pie-chart-container' : 'bar-chart-container'
        }`;
    };

    return (
        <div className="dashboard">
            <div className="module">
                <h2>Data Analysis Dashboard</h2>
                
                <div className="dashboard-controls">
                    <button 
                        onClick={() => setView('topCountriesByRevenue')}
                        className={`button ${view === 'topCountriesByRevenue' ? 'active' : ''}`}
                    >
                        Top Countries by Revenue
                    </button>
                    <button 
                        onClick={() => setView('profitByCountry')}
                        className={`button ${view === 'profitByCountry' ? 'active' : ''}`}
                    >
                        Profit by Country
                    </button>
                    <button 
                        onClick={() => setView('topBusinessesByRevenue')}
                        className={`button ${view === 'topBusinessesByRevenue' ? 'active' : ''}`}
                    >
                        Top Businesses by Revenue
                    </button>
                </div>

                <div className="dashboard-content">
                    <ErrorBoundary>
                        {view === 'topCountriesByRevenue' && (
                            <div className={getChartContainerClass(view)}>
                                <TopCountriesByRevenue />
                            </div>
                        )}
                        {view === 'profitByCountry' && (
                            <div className={getChartContainerClass(view)}>
                                <ProfitByCountry />
                            </div>
                        )}
                        {view === 'topBusinessesByRevenue' && (
                            <div className={getChartContainerClass(view)}>
                                <TopBusinessesByRevenue />
                            </div>
                        )}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
