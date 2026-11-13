
import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const UsersContext = createContext(null);

const mapUser = (user) => ({
    id: user.id_user,
    firstName: user.nombre,
    lastName: user.apellido,
    email: user.email,
    role: user.rol,
    plan: user.plan,
});

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadUsers = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await apiRequest('/users/');
            setUsers(response.map(mapUser));
        } catch (err) {
            setError(err.message);
            console.error('Error al cargar usuarios:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateUser = async (userId, updatedData) => {
        const payload = {};

        if (updatedData.firstName !== undefined) payload.nombre = updatedData.firstName;
        if (updatedData.lastName !== undefined) payload.apellido = updatedData.lastName;
        if (updatedData.role !== undefined) payload.rol = updatedData.role;
        if (updatedData.plan !== undefined) payload.plan = updatedData.plan;

        const response = await apiRequest(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        });

        const updatedUser = mapUser(response);

        setUsers(previous =>
            previous.map(user => user.id === userId ? updatedUser : user)
        );

        return updatedUser;
    };

    const deleteUser = async (userId) => {
        await apiRequest(`/users/${userId}`, {
            method: 'DELETE',
        });

        setUsers(previous => previous.filter(user => user.id !== userId));
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                loading,
                error,
                updateUser,
                deleteUser,
                loadUsers,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
}

export function useUsers() {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error('useUsers debe utilizarse dentro de UsersProvider');
    }

    return context;
}
