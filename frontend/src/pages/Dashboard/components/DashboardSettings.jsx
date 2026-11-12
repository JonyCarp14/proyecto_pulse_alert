
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    Chip,
    Stack,
} from '@mui/material';
import { WorkspacePremiumOutlined } from '@mui/icons-material';
const dashboardOptions = [
    {
        title: 'Indicadores principales',
        description: 'Tarjetas con estadísticas generales.',
        items: [
            { id: 'activeCampaigns', label: 'Campañas activas' },
            { id: 'criticalAlerts', label: 'Alertas críticas' },
            { id: 'totalInvestment', label: 'Inversión total' },
            { id: 'ctr', label: 'CTR promedio' },
        ],
    },
    {
        title: 'Gráficos',
        description: 'Visualizaciones del rendimiento de tus campañas.',
        items: [
            { id: 'campaignChart', label: 'Rendimiento de campañas' },
            { id: 'investmentChart', label: 'Inversión publicitaria' },
            { id: 'conversionsChart', label: 'Conversiones' },
            { id: 'ctrChart', label: 'CTR' },
        ],
    },
];
function DashboardSettings({ open, onClose, selectedItems, onChange, onReset }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    backgroundColor: '#111827',
                    color: '#F8FAFC',
                    border: '1px solid #263244',
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <WorkspacePremiumOutlined sx={{ color: '#A78BFA' }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Personalizar Dashboard
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                            Elegí qué elementos querés visualizar.
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip
                        label="PREMIUM"
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(167,139,250,0.15)',
                            color: '#C4B5FD',
                            fontWeight: 'bold',
                        }}
                    />
                </Stack>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#263244' }}>
                {dashboardOptions.map((section) => (
                    <Box key={section.title} sx={{ mb: 3 }}>
                        <Typography fontWeight="bold" mb={0.5}>
                            {section.title}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                            {section.description}
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                },
                                gap: 1,
                                mt: 1.5,
                            }}
                        >
                            {section.items.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={selectedItems.includes(item.id)}
                                            onChange={(event) =>
                                                onChange(item.id, event.target.checked)
                                            }
                                            sx={{
                                                color: '#64748B',
                                                '&.Mui-checked': {
                                                    color: '#08BCEB',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" color="#CBD5E1">
                                            {item.label}
                                        </Typography>
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #263244' }}>
                <Button
                    onClick={onReset}
                    sx={{ color: '#94A3B8', textTransform: 'none' }}
                >
                    Restablecer
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(90deg, #0865F5, #08BCEB)',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 3,
                    }}
                >
                    Listo
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DashboardSettings;
