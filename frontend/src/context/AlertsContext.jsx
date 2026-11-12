import { createContext, useContext, useState } from 'react';
import { alerts as initialAlerts } from '../data/dashboardData';

const AlertsContext = createContext(null);

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState(initialAlerts);

    const addAlert = (newAlert) => {
        const alertWithMetadata = {
            ...newAlert,
            id: Date.now(),
            date: new Date().toISOString(),
        };

        setAlerts((previousAlerts) => [
            alertWithMetadata,
            ...previousAlerts,
        ]);

        return alertWithMetadata;
    };

    const updateAlert = (alertId, updatedData) => {
        setAlerts((previousAlerts) =>
            previousAlerts.map((alert) =>
                alert.id === alertId
                    ? { ...alert, ...updatedData }
                    : alert
            )
        );
    };

    return (
        <AlertsContext.Provider
            value={{
                alerts,
                addAlert,
                updateAlert,
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
