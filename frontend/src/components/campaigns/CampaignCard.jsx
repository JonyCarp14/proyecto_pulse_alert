import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Collapse,
    LinearProgress,
} from '@mui/material';
import {
    ExpandMore,
    ExpandLess,
} from '@mui/icons-material';

import { useAlerts } from '../../context/AlertsContext';
import { useCampaigns } from '../../context/CampaignsContext';
import { generateAlert } from '../../services/alertService';
import EventSimulator from './EventSimulator';

function CampaignCard({ campaign }) {
    const [expanded, setExpanded] = useState(false);

    const { alerts, addAlert } = useAlerts();
    const { updateCampaignStatus } = useCampaigns();

    const budgetPercentage = campaign.budget > 0
        ? Math.min((campaign.investment / campaign.budget) * 100, 100)
        : 0;

    const statusConfig = {
        active: { label: 'Activa', color: 'success' },
        paused: { label: 'Pausada', color: 'warning' },
        down: { label: 'Caída', color: 'error' },
    };

    const currentStatus = statusConfig[campaign.status] || statusConfig.active;

    const campaignAlerts = alerts.filter(
        alert =>
            alert.campaignId === campaign.id ||
            alert.campaign === campaign.name
    );

    const handleSimulate = (campaignId, eventType) => {
        if (campaignId !== campaign.id) return;

        const newAlert = generateAlert(campaign, eventType);

        addAlert(newAlert);

        if (eventType === 'down') {
            updateCampaignStatus(campaignId, 'down');
        }

        if (eventType === 'paused') {
            updateCampaignStatus(campaignId, 'paused');
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: '#111827',
                border: '1px solid #263244',
                borderRadius: 3,
                color: '#F8FAFC',
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {campaign.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {campaign.platform}
                        </Typography>
                    </Box>

                    <Chip
                        label={currentStatus.label}
                        size="small"
                        color={currentStatus.color}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Inversión: ${campaign.investment.toLocaleString('es-AR')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Presupuesto: ${campaign.budget.toLocaleString('es-AR')}
                    </Typography>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={budgetPercentage}
                    sx={{
                        height: 7,
                        borderRadius: 5,
                        backgroundColor: '#263244',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: budgetPercentage >= 90 ? '#EF4444' : '#2563EB',
                            borderRadius: 5,
                        },
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                        sx={{ textTransform: 'none' }}
                    >
                        {expanded ? 'Ocultar detalle' : 'Ver detalle'}
                    </Button>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ borderTop: '1px solid #263244', pt: 2, mt: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                            Rendimiento de la campaña
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Impresiones
                                </Typography>
                                <Typography fontWeight="bold">
                                    {campaign.impressions.toLocaleString('es-AR')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Clics
                                </Typography>
                                <Typography fontWeight="bold">
                                    {campaign.clicks.toLocaleString('es-AR')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Conversiones
                                </Typography>
                                <Typography fontWeight="bold">
                                    {campaign.conversions.toLocaleString('es-AR')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Presupuesto utilizado
                                </Typography>
                                <Typography fontWeight="bold">
                                    {budgetPercentage.toFixed(1)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Alertas asociadas */}
                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #263244' }}>
                        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                            Alertas asociadas
                        </Typography>

                        {campaignAlerts.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {campaignAlerts.map(alert => (
                                    <Box
                                        key={alert.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 1.5,
                                            borderRadius: 2,
                                            backgroundColor: '#0B1220',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">
                                                {alert.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {alert.date}
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={
                                                alert.severity === 'critical'
                                                    ? 'Crítica'
                                                    : alert.severity === 'medium'
                                                        ? 'Media'
                                                        : 'Informativa'
                                            }
                                            size="small"
                                            color={
                                                alert.severity === 'critical'
                                                    ? 'error'
                                                    : alert.severity === 'medium'
                                                        ? 'warning'
                                                        : 'info'
                                            }
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Esta campaña no tiene alertas registradas.
                            </Typography>
                        )}
                    </Box>

                    <EventSimulator
                        campaign={campaign}
                        onSimulate={handleSimulate}
                    />
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default CampaignCard;
