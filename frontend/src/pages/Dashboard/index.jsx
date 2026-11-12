
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { TuneOutlined, WorkspacePremiumOutlined } from '@mui/icons-material';
import {
    CampaignOutlined,
    NotificationsActiveOutlined,
    AttachMoneyOutlined,
    TrendingUpOutlined,
} from '@mui/icons-material';
import StatCard from '../../components/dashboard/StatCard';
import CampaignChart from '../../components/dashboard/CampaignChart';
import InvestmentChart from '../../components/dashboard/InvestmentChart';
import ConversionsChart from '../../components/dashboard/ConversionsChart';
import CTRChart from '../../components/dashboard/CTRChart';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import DashboardSettings from './components/DashboardSettings';
import { useCampaigns } from '../../context/CampaignsContext';
import { useAlerts } from '../../context/AlertsContext';
import { useAuth } from '../../context/AuthContext';
const defaultItems = [
    'activeCampaigns',
    'criticalAlerts',
    'totalInvestment',
    'ctr',
    'campaignChart',
    'investmentChart',
    'conversionsChart',
    'ctrChart',
];
function Dashboard() {
    const { campaigns } = useCampaigns();
    const { alerts } = useAlerts();
    const { user } = useAuth();
    const isPremium = user?.plan === 'premium';
    const userId = user?.id_user ?? user?.id;
    const storageKey = `pulsealert_dashboard_${userId}`;
    const [selectedItems, setSelectedItems] = useState(defaultItems);
    const [settingsOpen, setSettingsOpen] = useState(false);
    useEffect(() => {
        if (!isPremium || !userId) {
            setSelectedItems(defaultItems);
            return;
        }
        try {
            const savedItems = localStorage.getItem(storageKey);
            setSelectedItems(savedItems ? JSON.parse(savedItems) : defaultItems);
        } catch {
            setSelectedItems(defaultItems);
        }
    }, [isPremium, storageKey, userId]);
    const handleItemChange = (itemId, checked) => {
        setSelectedItems((previousItems) => {
            const updatedItems = checked
                ? [...previousItems, itemId]
                : previousItems.filter((item) => item !== itemId);
            if (userId) {
                localStorage.setItem(storageKey, JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    };
    const handleReset = () => {
        setSelectedItems(defaultItems);
        if (userId) {
            localStorage.removeItem(storageKey);
        }
    };
    const activeCampaigns = campaigns.filter(
        campaign => campaign.status === 'active'
    ).length;
    const criticalAlerts = alerts.filter(
        alert => alert.severity === 'critical'
    ).length;
    const totalInvestment = campaigns.reduce(
        (total, campaign) => total + campaign.investment,
        0
    );
    const totalImpressions = campaigns.reduce(
        (total, campaign) => total + campaign.impressions,
        0
    );
    const totalClicks = campaigns.reduce(
        (total, campaign) => total + campaign.clicks,
        0
    );
    const ctr = totalImpressions > 0
        ? (totalClicks / totalImpressions) * 100
        : 0;
    const stats = [
        {
            id: 'activeCampaigns',
            title: 'Campañas activas',
            value: activeCampaigns,
            subtitle: 'Campañas en ejecución',
            icon: <CampaignOutlined />,
            color: '#2563EB',
        },
        {
            id: 'criticalAlerts',
            title: 'Alertas críticas',
            value: criticalAlerts,
            subtitle: 'Requieren atención',
            icon: <NotificationsActiveOutlined />,
            color: '#EF4444',
        },
        {
            id: 'totalInvestment',
            title: 'Inversión total',
            value: `$${totalInvestment.toLocaleString('es-AR')}`,
            subtitle: 'Inversión acumulada',
            icon: <AttachMoneyOutlined />,
            color: '#10B981',
        },
        {
            id: 'ctr',
            title: 'CTR promedio',
            value: `${ctr.toFixed(2)}%`,
            subtitle: 'Clics sobre impresiones',
            icon: <TrendingUpOutlined />,
            color: '#22D3EE',
        },
    ];
    const charts = [
        { id: 'campaignChart', component: <CampaignChart /> },
        { id: 'investmentChart', component: <InvestmentChart /> },
        { id: 'conversionsChart', component: <ConversionsChart /> },
        { id: 'ctrChart', component: <CTRChart /> },
    ];
    const visibleStats = isPremium
        ? stats.filter((stat) => selectedItems.includes(stat.id))
        : stats;
    const visibleCharts = isPremium
        ? charts.filter((chart) => selectedItems.includes(chart.id))
        : charts;
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Dashboard
                    </Typography>
                    <Typography color="text.secondary">
                        Resumen general del rendimiento de tus campañas.
                    </Typography>
                </Box>
                {isPremium ? (
                    <Button
                        variant="outlined"
                        startIcon={<TuneOutlined />}
                        onClick={() => setSettingsOpen(true)}
                        sx={{
                            borderColor: '#A78BFA',
                            color: '#C4B5FD',
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: '#C4B5FD',
                                backgroundColor: 'rgba(167,139,250,0.08)',
                            },
                        }}
                    >
                        Personalizar Dashboard
                    </Button>
                ) : (
                    <Chip
                        icon={<WorkspacePremiumOutlined />}
                        label="Personalización disponible en Premium"
                        sx={{
                            backgroundColor: 'rgba(245, 183, 0, 0.14)',
                            border: '1px solid #D4A017',
                            color: '#FFD54F',
                            fontWeight: 'bold',
                            '& .MuiChip-icon': {
                                color: '#FFD54F',
                            },
                        }}
                    />
                )}
            </Stack>
            {visibleStats.length > 0 && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                            lg: `repeat(${Math.min(visibleStats.length, 4)}, minmax(0, 1fr))`,
                        },
                        gap: 3,
                        width: '100%',
                    }}
                >
                    {visibleStats.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </Box>
            )}
            {visibleCharts.length > 0 && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, minmax(0, 1fr))',
                        },
                        gap: 3,
                        width: '100%',
                    }}
                >
                    {visibleCharts.map((chart) => (
                        <Box key={chart.id} sx={{ minWidth: 0 }}>
                            {chart.component}
                        </Box>
                    ))}
                </Box>
            )}
            {visibleStats.length === 0 && visibleCharts.length === 0 && (
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        border: '1px dashed #475569',
                        borderRadius: 3,
                    }}
                >
                    <Typography color="text.secondary">
                        No hay elementos seleccionados para mostrar.
                    </Typography>
                </Box>
            )}
            <Box sx={{ width: '100%', mt: 1 }}>
                <RecentAlerts />
            </Box>
            {isPremium && (
                <DashboardSettings
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                    selectedItems={selectedItems}
                    onChange={handleItemChange}
                    onReset={handleReset}
                />
            )}
        </Box>
    );
}
export default Dashboard;


