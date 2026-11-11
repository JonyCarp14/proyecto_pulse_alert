import { Box, Typography } from '@mui/material';
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

import { useCampaigns } from '../../context/CampaignsContext';
import { useAlerts } from '../../context/AlertsContext';

function Dashboard() {
    const { campaigns } = useCampaigns();
    const { alerts } = useAlerts();

    // Cálculo de estadísticas actuales
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
            title: 'Campañas activas',
            value: activeCampaigns,
            subtitle: 'Campañas en ejecución',
            icon: <CampaignOutlined />,
            color: '#2563EB',
        },
        {
            title: 'Alertas críticas',
            value: criticalAlerts,
            subtitle: 'Requieren atención',
            icon: <NotificationsActiveOutlined />,
            color: '#EF4444',
        },
        {
            title: 'Inversión total',
            value: `$${totalInvestment.toLocaleString('es-AR')}`,
            subtitle: 'Inversión acumulada',
            icon: <AttachMoneyOutlined />,
            color: '#10B981',
        },
        {
            title: 'CTR promedio',
            value: `${ctr.toFixed(2)}%`,
            subtitle: 'Clics sobre impresiones',
            icon: <TrendingUpOutlined />,
            color: '#22D3EE',
        },
    ];

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Encabezado */}
            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Dashboard
                </Typography>

                <Typography color="text.secondary">
                    Resumen general del rendimiento de tus campañas.
                </Typography>
            </Box>

            {/* Fila 1: Indicadores KPI */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        lg: 'repeat(4, minmax(0, 1fr))',
                    },
                    gap: 3,
                    width: '100%',
                }}
            >
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </Box>

            {/* Fila 2: Gráficos */}
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
                <CampaignChart />
                <InvestmentChart />
            </Box>

            {/* Fila 3: Gráficos */}
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
                <ConversionsChart />
                <CTRChart />
            </Box>

            <Box sx={{ width: '100%', mt: 1 }}>
                <RecentAlerts />
            </Box>
        </Box>
    );
}

export default Dashboard;


