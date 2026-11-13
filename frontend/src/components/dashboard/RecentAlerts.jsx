
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Divider,
} from '@mui/material';

import {
    ErrorOutline,
    WarningAmberOutlined,
    InfoOutlined,
} from '@mui/icons-material';

import { useAlerts } from '../../context/AlertsContext';

const severityConfig = {
    critical: {
        label: 'Crítica',
        color: '#EF4444',
        icon: <ErrorOutline />,
    },
    medium: {
        label: 'Media',
        color: '#F59E0B',
        icon: <WarningAmberOutlined />,
    },
    info: {
        label: 'Informativa',
        color: '#22D3EE',
        icon: <InfoOutlined />,
    },
};

function RecentAlerts() {
    const { alerts } = useAlerts();

    return (
        <Box
            sx={{
                backgroundColor: '#111827',
                border: '1px solid #263244',
                borderRadius: 3,
                p: 3,
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" fontWeight="bold" color="#F8FAFC">
                Alertas recientes
            </Typography>

            <Typography variant="body2" color="#94A3B8" sx={{ mb: 2 }}>
                Últimas notificaciones de tus campañas.
            </Typography>

            <List disablePadding>
                {alerts.map((alert, index) => {
                    const config =
                        severityConfig[alert.priority || alert.severity] ||
                        severityConfig.info;

                    return (
                        <Box key={alert.id}>
                            <ListItem
                                disableGutters
                                alignItems="flex-start"
                                sx={{ py: 2 }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: config.color,
                                        mt: 0.5,
                                    }}
                                >
                                    {config.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        <Typography
                                            color="#F8FAFC"
                                            fontWeight={600}
                                            variant="body2"
                                        >
                                            {alert.titulo || alert.title || alert.tipo}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            color="#94A3B8"
                                            variant="caption"
                                        >
                                            {alert.campaign_name ||
                                                alert.campaign ||
                                                'Campaña'}
                                        </Typography>
                                    }
                                />

                                <Chip
                                    label={config.label}
                                    size="small"
                                    sx={{
                                        color: config.color,
                                        backgroundColor: `${config.color}20`,
                                        border: `1px solid ${config.color}50`,
                                        fontWeight: 600,
                                    }}
                                />
                            </ListItem>

                            {index < alerts.length - 1 && (
                                <Divider sx={{ borderColor: '#263244' }} />
                            )}
                        </Box>
                    );
                })}
            </List>
        </Box>
    );
}

export default RecentAlerts;

