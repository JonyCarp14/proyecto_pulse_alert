
import { createContext, useContext, useState } from 'react';
import { alerts as initialAlerts } from '../data/dashboardData';

const AlertsContext = createContext(null);

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState(initialAlerts);

    const addAlert = (newAlert) => {
        setAlerts((previousAlerts) => [
            {
                ...newAlert,
                id: Date.now(),
                date: new Date().toISOString(),
            },
            ...previousAlerts,
        ]);
    };

    return (
        <AlertsContext.Provider
            value={{
                alerts,
                addAlert,
            }}
        >
            {children}
        </AlertsContext.Provider>
    );
}

export function useAlerts() {
    const context = useContext(AlertsContext);

    if (!context) {
        throw new Error(
            'useAlerts debe utilizarse dentro de AlertsProvider'
        );
    }

    return context;
}
