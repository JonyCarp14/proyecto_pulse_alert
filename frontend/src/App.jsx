
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Users from './pages/Users';
import { AuthProvider } from './context/AuthContext';
import { AlertsProvider } from './context/AlertsContext';
import { CampaignsProvider } from './context/CampaignsContext';
import { UsersProvider } from './context/UsersContext';

function App() {
    return (
        <AuthProvider>
            <UsersProvider>
                <AlertsProvider>
                    <CampaignsProvider>
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="/login" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <MainLayout>
                                                <Dashboard />
                                            </MainLayout>
                                        }
                                    />
                                    <Route
                                        path="/campaigns"
                                        element={
                                            <MainLayout>
                                                <Campaigns />
                                            </MainLayout>
                                        }
                                    />
                                </Route>
                                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                                    <Route
                                        path="/users"
                                        element={
                                            <MainLayout>
                                                <Users />
                                            </MainLayout>
                                        }
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    </CampaignsProvider>
                </AlertsProvider>
            </UsersProvider>
        </AuthProvider>
    );
}

export default App;



