import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';

import { AlertsProvider } from './context/AlertsContext';
import { CampaignsProvider } from './context/CampaignsContext';

function App() {
    return (
        <AlertsProvider>
            <CampaignsProvider>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                    </Routes>
                </MainLayout>
            </CampaignsProvider>
        </AlertsProvider>
    );
}

export default App;

