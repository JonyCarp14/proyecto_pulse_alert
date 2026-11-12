
import { createContext, useContext, useState } from 'react';
import { loginRequest, getCurrentUser } from '../services/authService';
import { mockUsers } from '../data/mockUsers';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = sessionStorage.getItem('pulsealert_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    // Inicio de sesión real mediante el backend
    const login = async (email, password) => {
        try {
            const response = await loginRequest(email, password);
            sessionStorage.setItem('pulsealert_token', response.access_token);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            sessionStorage.setItem('pulsealert_user', JSON.stringify(currentUser));
            return { success: true, user: currentUser };
        } catch (error) {
            sessionStorage.removeItem('pulsealert_token');
            sessionStorage.removeItem('pulsealert_user');
            return { success: false, message: error.message };
        }
    };
    // Inicio de sesión temporal con usuarios mock
    const loginWithMock = (email, password) => {
        const mockUser = mockUsers.find(
            (item) => item.email === email && item.password === password
        );
        if (!mockUser) {
            return { success: false, message: 'Correo o contraseña incorrectos.' };
        }
        const { password: ignoredPassword, ...userData } = mockUser;
        sessionStorage.removeItem('pulsealert_token');
        sessionStorage.setItem('pulsealert_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
    };
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('pulsealert_user');
        sessionStorage.removeItem('pulsealert_token');
    };
    return (
        <AuthContext.Provider value={{ user, setUser, login, loginWithMock, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider');
    return context;
}
