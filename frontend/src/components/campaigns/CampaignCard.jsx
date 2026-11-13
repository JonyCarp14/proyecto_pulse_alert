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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    ExpandMore,
    ExpandLess,
    EditOutlined,
    DeleteOutline
} from '@mui/icons-material';

import { useAlerts } from '../../context/AlertsContext';
import { useCampaigns } from '../../context/CampaignsContext';

import EventSimulator from './EventSimulator';

function CampaignCard({ campaign, onEdit }) {
    const [expanded, setExpanded] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { alerts, createAlert } = useAlerts();
    const {
        updateCampaignStatus,
        updateCampaignInvestment,
        deleteCampaign,
    } = useCampaigns();

    const budgetPercentage = campaign.budget > 0
        ? (campaign.investment / campaign.budget) * 100
        : 0;

    const progressPercentage = Math.min(budgetPercentage, 100);

    const progressColor = budgetPercentage > 100
        ? '#EF4444'
        : budgetPercentage >= 90
            ? '#F59E0B'
            : '#2563EB';

    const exceededAmount = Math.max(campaign.investment - campaign.budget, 0);

    const statusConfig = {
        active: { label: 'Activa', color: 'success' },
        paused: { label: 'Pausada', color: 'warning' },
        down: { label: 'Caída', color: 'error' },
    };

    const currentStatus = statusConfig[campaign.status] || statusConfig.active;

    const campaignAlerts = alerts.filter(
        alert =>
            alert.campaign_id === campaign.id ||
            alert.campaignId === campaign.id ||
            alert.campaign === campaign.name ||
            alert.campaign_name === campaign.name
    );

    const handleSimulate = async (campaignId, eventType) => {
        if (campaignId !== campaign.id) return;

        if (
            (eventType === 'budgetCritical' || eventType === 'budgetExceeded') &&
            campaign.budget <= 0
        ) {
            return;
        }

        const alertConfig = {
            budgetCritical: {
                tipo: 'presupuesto',
                metrica: 'gasto',
                valor_detectado: campaign.budget * 0.9,
                limite: campaign.budget,
                mensaje: 'La campaña alcanzó el 90% de su presupuesto.',
            },
            budgetExceeded: {
                tipo: 'presupuesto',
                metrica: 'gasto',
                valor_detectado: campaign.budget * 1.1,
                limite: campaign.budget,
                mensaje: 'La campaña superó su presupuesto en un 10%.',
            },
            down: {
                tipo: 'caida',
                metrica: 'estado',
                valor_detectado: 0,
                limite: 1,
                mensaje: 'Se detectó una caída en la campaña.',
            },
            paused: {
                tipo: 'pausada',
                metrica: 'estado',
                valor_detectado: 0,
                limite: 1,
                mensaje: 'La campaña fue pausada.',
            },
            performance: {
                tipo: 'rendimiento',
                metrica: 'clics',
                valor_detectado: 0,
                limite: Math.max(campaign.clicks || 0, 1),
                mensaje: 'Se detectó una caída en el rendimiento de la campaña.',
            },
        };

        const config = alertConfig[eventType];
        if (!config) return;

        try {
            await createAlert({
                campaign_id: campaign.id,
                ...config,
            });

            if (eventType === 'budgetCritical') {
                await updateCampaignInvestment(campaignId, campaign.budget * 0.9);
            }

            if (eventType === 'budgetExceeded') {
                await updateCampaignInvestment(campaignId, campaign.budget * 1.1);
            }

            if (eventType === 'paused') {
                await updateCampaignStatus(campaignId, 'paused');
            }
        } catch (error) {
            console.error('Error al simular el evento:', error);
            window.alert(error.message || 'No se pudo registrar el evento.');
        }
    };

    const handleDelete = () => {
        deleteCampaign(campaign.id);
        setDeleteDialogOpen(false);
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
                    value={progressPercentage}
                    sx={{
                        height: 7,
                        borderRadius: 5,
                        backgroundColor: '#263244',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: progressColor,
                            borderRadius: 5,
                        },
                    }}
                />

                <Box sx={{ mt: 1 }}>
                    {campaign.budget <= 0 ? (
                        <Typography variant="caption" color="text.secondary">
                            Presupuesto no disponible
                        </Typography>
                    ) : budgetPercentage > 100 ? (
                        <Typography variant="caption" color="error.main">
                            Presupuesto excedido en ${exceededAmount.toLocaleString('es-AR')}
                            {' '}({budgetPercentage.toFixed(1)}% utilizado)
                        </Typography>
                    ) : (
                        <Typography
                            variant="caption"
                            color={budgetPercentage >= 90 ? 'warning.main' : 'text.secondary'}
                        >
                            {budgetPercentage.toFixed(1)}% del presupuesto utilizado
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        gap: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditOutlined />}
                            onClick={() => onEdit(campaign)}
                            sx={{
                                textTransform: 'none',
                                borderColor: '#475569',
                                color: '#CBD5E1',
                            }}
                        >
                            Editar
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteOutline />}
                            onClick={() => setDeleteDialogOpen(true)}
                            sx={{ textTransform: 'none' }}
                        >
                            Eliminar
                        </Button>
                        {campaign.status !== 'active' && (
                            <Button
                                size="small"
                                variant="outlined"
                                color="success"
                                onClick={() => updateCampaignStatus(campaign.id, 'active')}
                                sx={{ textTransform: 'none' }}
                            >
                                Reactivar campaña
                            </Button>
                        )}
                    </Box>
                    <Button
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                        sx={{ textTransform: 'none', ml: 'auto' }}
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
                                    {campaign.budget > 0 ? `${budgetPercentage.toFixed(1)}%` : 'N/D'}
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
                                {campaignAlerts.map(alert => {
                                    const severity = alert.priority || alert.severity || 'info';

                                    const severityConfig = {
                                        critical: { label: 'Crítica', color: 'error' },
                                        medium: { label: 'Media', color: 'warning' },
                                        info: { label: 'Informativa', color: 'info' },
                                    };

                                    const currentSeverity = severityConfig[severity] || severityConfig.info;

                                    return (
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
                                                    {alert.titulo || alert.title || alert.message || 'Alerta'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {alert.created_at
                                                        ? new Date(alert.created_at).toLocaleString('es-AR')
                                                        : alert.date || 'Fecha no disponible'}
                                                </Typography>
                                            </Box>

                                            <Chip
                                                label={currentSeverity.label}
                                                size="small"
                                                color={currentSeverity.color}
                                            />
                                        </Box>
                                    );
                                })}
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
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>Eliminar campaña</DialogTitle>
                    <DialogContent>
                        <Typography>
                            ¿Estás seguro de que querés eliminar la campaña
                            <strong> {campaign.name}</strong>?
                            Esta acción no se puede deshacer.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() => setDeleteDialogOpen(false)}
                            color="inherit"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleDelete}
                            color="error"
                            variant="contained"
                        >
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default CampaignCard;
