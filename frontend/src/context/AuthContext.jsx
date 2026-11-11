
import { createContext, useContext, useState } from 'react';
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

    const login = (email, password) => {
        const foundUser = mockUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: 'Correo o contraseña incorrectos.',
            };
        }

        const { password: _, ...userWithoutPassword } = foundUser;

        setUser(userWithoutPassword);
        sessionStorage.setItem('pulsealert_user', JSON.stringify(userWithoutPassword));

        return {
            success: true,
            user: userWithoutPassword,
        };
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('pulsealert_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider');
    }

    return context;
}
