import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from '../services/api';

const AlertsContext = createContext(null);

const prioridades = {
    presupuesto: 'critical',
    caida: 'critical',
    pausada: 'medium',
    rendimiento: 'medium',
};

const titulos = {
    presupuesto: 'Presupuesto crítico / excedido',
    caida: 'Campaña caída',
    pausada: 'Campaña pausada',
    rendimiento: 'Caída del rendimiento',
};

const mapAlert = (alert) => ({
    ...alert,
    id: alert.id_alert,
    created_at: alert.fecha,
    titulo: titulos[alert.tipo] || alert.tipo,
    message: alert.mensaje,
    priority: prioridades[alert.tipo] || 'info',
    status: alert.leida ? 'leida' : 'nueva',
    telegram_status: {
        pendiente: 'enviando',
        simulada: 'enviado',
        enviada: 'enviado',
        fallida: 'fallido',
    }[alert.estado_envio] || 'enviando',
});

export function AlertsProvider({ children }) {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setAlerts([]);
            return;
        }

        let cancelled = false;

        const loadAlerts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await apiRequest('/alerts/');

                if (!cancelled) {
                    setAlerts(data.map(mapAlert));
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadAlerts();

        return () => {
            cancelled = true;
        };
    }, [user?.id_user]);

    const createAlert = async (alertData) => {
        const response = await apiRequest('/alerts/', {
            method: 'POST',
            body: JSON.stringify(alertData),
        });

        const newAlert = mapAlert(response);

        setAlerts((previous) => [newAlert, ...previous]);

        return newAlert;
    };

    const addAlert = (newAlert) => {
        const alertWithMetadata = {
            ...newAlert,
            id: Date.now(),
            date: new Date().toISOString(),
        };

        setAlerts((previous) => [alertWithMetadata, ...previous]);
        return alertWithMetadata;
    };

    const updateAlert = (alertId, updatedData) => {
        setAlerts((previous) =>
            previous.map((alert) =>
                alert.id === alertId
                    ? { ...alert, ...updatedData }
                    : alert
            )
        );
    };

    const markAsRead = async (alertId) => {
        const alert = alerts.find((item) => item.id === alertId);

        if (!alert || alert.status !== 'nueva') return;

        if (!alert.id_alert) {
            updateAlert(alertId, { status: 'leida' });
            return;
        }

        try {
            const updated = await apiRequest(
                `/alerts/${alert.id_alert}/read`,
                { method: 'PATCH' }
            );

            setAlerts((previous) =>
                previous.map((item) =>
                    item.id === alertId
                        ? mapAlert(updated)
                        : item
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AlertsContext.Provider
            value={{
                alerts,
                createAlert,
                addAlert,
                updateAlert,
                markAsRead,
                loading,
                error,
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



