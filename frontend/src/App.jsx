
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import { alerts as initialAlerts } from './data/dashboardData';
import { AlertsProvider } from './context/AlertsContext';

function App() {
    const [alerts, setAlerts] = useState(initialAlerts);

    return (
        <AlertsProvider>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                </Routes>
            </MainLayout>
        </AlertsProvider>
    );
}


export default App;
