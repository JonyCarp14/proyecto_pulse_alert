
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
import { dashboardStats } from '../../data/dashboardData';
import ConversionsChart from '../../components/dashboard/ConversionsChart';
import CTRChart from '../../components/dashboard/CTRChart';
import RecentAlerts from '../../components/dashboard/RecentAlerts';

function Dashboard() {
    const stats = [
        {
            title: 'Campañas activas',
            value: dashboardStats.activeCampaigns,
            subtitle: 'Campañas en ejecución',
            icon: <CampaignOutlined />,
            color: '#2563EB',
        },
        {
            title: 'Alertas críticas',
            value: dashboardStats.criticalAlerts,
            subtitle: 'Requieren atención',
            icon: <NotificationsActiveOutlined />,
            color: '#EF4444',
        },
        {
            title: 'Inversión total',
            value: `$${dashboardStats.totalInvestment.toLocaleString('es-AR')}`,
            subtitle: 'Inversión acumulada',
            icon: <AttachMoneyOutlined />,
            color: '#10B981',
        },
        {
            title: 'CTR promedio',
            value: `${dashboardStats.ctr.toFixed(2)}%`,
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
