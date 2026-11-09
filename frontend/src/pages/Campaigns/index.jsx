import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import {
    AddOutlined,
    CampaignOutlined,
    CheckCircleOutline,
    PauseCircleOutline,
    AttachMoneyOutlined,
} from '@mui/icons-material';

import { useCampaigns } from '../../context/CampaignsContext';
import CampaignCard from '../../components/campaigns/CampaignCard';

function Campaigns() {
    const { campaigns } = useCampaigns();
    const stats = [
        {
            title: 'Total de campañas',
            value: campaigns.length,
            icon: <CampaignOutlined />,
            color: '#2563EB',
        },
        {
            title: 'Campañas activas',
            value: campaigns.filter(c => c.status === 'active').length,
            icon: <CheckCircleOutline />,
            color: '#10B981',
        },
        {
            title: 'Campañas pausadas',
            value: campaigns.filter(c => c.status === 'paused').length,
            icon: <PauseCircleOutline />,
            color: '#F59E0B',
        },
        {
            title: 'Inversión total',
            value: `$${campaigns.reduce((total, c) => total + c.investment, 0).toLocaleString('es-AR')}`,
            icon: <AttachMoneyOutlined />,
            color: '#22D3EE',
        },
    ];

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Encabezado */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Campañas
                    </Typography>
                    <Typography color="text.secondary">
                        Monitoreo y gestión de campañas publicitarias.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                    Nueva campaña
                </Button>
            </Box>

            {/* Indicadores */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        lg: 'repeat(4, minmax(0, 1fr))',
                    },
                    gap: 3,
                }}
            >
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        sx={{
                            backgroundColor: '#111827',
                            border: '1px solid #263244',
                            borderRadius: 3,
                            height: 150,
                        }}
                    >
                        <CardContent
                            sx={{
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                            }}
                        >
                            <Box>
                                <Typography color="text.secondary" variant="body2">
                                    {stat.title}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                    {stat.value}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    color: stat.color,
                                    backgroundColor: `${stat.color}20`,
                                    borderRadius: 2,
                                    p: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& svg': { fontSize: 30 },
                                }}
                            >
                                {stat.icon}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {/* Listado de campañas */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        Mis campañas
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Seleccioná una campaña para consultar sus métricas y rendimiento.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, minmax(0, 1fr))',
                        },
                        gap: 3,
                    }}
                >
                    {campaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Campaigns;

