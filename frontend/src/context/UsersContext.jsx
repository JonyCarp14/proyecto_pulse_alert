import { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockUsers';

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
    const [users, setUsers] = useState(
        mockUsers.map(({ password, ...user }) => user)
    );

    const updateUser = (userId, updatedData) => {
        setUsers((previousUsers) =>
            previousUsers.map((user) =>
                user.id === userId
                    ? { ...user, ...updatedData }
                    : user
            )
        );
    };

    const deleteUser = (userId) => {
        setUsers((previousUsers) =>
            previousUsers.filter((user) => user.id !== userId)
        );
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                updateUser,
                deleteUser,
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
