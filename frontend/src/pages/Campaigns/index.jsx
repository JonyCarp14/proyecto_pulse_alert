import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import {
    AddOutlined,
    CampaignOutlined,
    CheckCircleOutline,
    PauseCircleOutline,
    AttachMoneyOutlined,
} from '@mui/icons-material';
import { useCampaigns } from '../../context/CampaignsContext';
import CampaignCard from '../../components/campaigns/CampaignCard';
import CampaignDialog from '../../components/campaigns/CampaignDialog';
function Campaigns() {
    const {
        campaigns,
        addCampaign,
        updateCampaign,
    } = useCampaigns();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
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
    const handleNewCampaign = () => {
        setSelectedCampaign(null);
        setDialogOpen(true);
    };
    const handleEditCampaign = (campaign) => {
        setSelectedCampaign(campaign);
        setDialogOpen(true);
    };
    const handleSaveCampaign = (campaignData) => {
        if (selectedCampaign) {
            updateCampaign(selectedCampaign.id, campaignData);
        } else {
            addCampaign(campaignData);
        }
    };
    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mb={3}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Campañas
                    </Typography>
                    <Typography color="text.secondary">
                        Gestioná y monitoreá tus campañas publicitarias.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={handleNewCampaign}
                >
                    Nueva campaña
                </Button>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={2}
                mb={4}
            >
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: `${stat.color}20`,
                                    color: stat.color,
                                    display: 'flex',
                                }}
                            >
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {stat.title}
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    md: 'repeat(2, 1fr)',
                }}
                gap={2}
            >
                {campaigns.map(campaign => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onEdit={handleEditCampaign}
                    />
                ))}
            </Box>
            <CampaignDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCampaign}
                campaign={selectedCampaign}
            />
        </Box>
    );
}
export default Campaigns;
