
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import { alerts as initialAlerts } from './data/dashboardData';
import { AlertsProvider } from './context/AlertsContext';

import Alerts from './pages/Alerts';
import Reports from './pages/Reports';

function App() {
    const [alerts, setAlerts] = useState(initialAlerts);

    return (
        <AlertsProvider>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/reports" element={<Reports />} />

                </Routes>
            </MainLayout>
        </AlertsProvider>
    );
}


export default App;
