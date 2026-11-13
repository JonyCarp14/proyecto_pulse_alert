
import { Box, Typography, Button } from '@mui/material';
import {
    AccountBalanceWalletOutlined,
    ErrorOutline,
    PauseCircleOutline,
    TrendingDownOutlined,
    WarningAmberOutlined,
} from '@mui/icons-material';

const events = [
    {
        id: 'budgetCritical',
        title: 'Presupuesto crítico (90%)',
        description: 'Simula que la inversión alcanza el 90% del presupuesto.',
        icon: <WarningAmberOutlined />,
        color: '#F59E0B',
    },
    {
        id: 'budgetExceeded',
        title: 'Presupuesto excedido (110%)',
        description: 'Simula que la inversión supera el presupuesto establecido.',
        icon: <AccountBalanceWalletOutlined />,
        color: '#EF4444',
    },
    {
        id: 'down',
        title: 'Campaña caída',
        description: 'Simula una interrupción inesperada de la campaña.',
        icon: <ErrorOutline />,
        color: '#EF4444',
    },
    {
        id: 'paused',
        title: 'Campaña pausada',
        description: 'Simula que la campaña pasa a estado pausado.',
        icon: <PauseCircleOutline />,
        color: '#F59E0B',
    },
    {
        id: 'performance',
        title: 'Caída del rendimiento',
        description: 'Simula una disminución importante de clics o conversiones.',
        icon: <TrendingDownOutlined />,
        color: '#F59E0B',
    },
];

function EventSimulator({ campaign, onSimulate }) {
    const isActive = campaign.status === 'active';

    return (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #263244' }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Simulador de eventos
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Ejecutá escenarios de prueba para comprobar el sistema de alertas.
            </Typography>

            {!isActive && (
                <Typography variant="body2" color="warning.main" mb={2}>
                    Reactivá la campaña para volver a simular eventos.
                </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {events.map(event => (
                    <Box
                        key={event.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: '#0B1220',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                            <Box sx={{ color: event.color, display: 'flex' }}>
                                {event.icon}
                            </Box>

                            <Box>
                                <Typography variant="body2" fontWeight="bold">
                                    {event.title}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    {event.description}
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="outlined"
                            size="small"
                            disabled={!isActive}
                            onClick={() => onSimulate?.(campaign.id, event.id)}
                            sx={{
                                color: event.color,
                                borderColor: event.color,
                                textTransform: 'none',
                            }}
                        >
                            Simular
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default EventSimulator;

