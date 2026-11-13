import { useEffect, useState } from 'react';
import {
    Stack,
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Alert,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useCampaigns } from '../../context/CampaignsContext';
import { apiRequest } from '../../services/api';
import TarjetaReporte from '../../components/reports/TarjetaReporte';
import InformeDialog from '../../components/reports/InformeDialog';

const diasPorFrecuencia = { diaria: 1, semanal: 7, mensual: 30 };

export default function Reports() {
    const { campaigns } = useCampaigns();

    const [campaniaElegida, setCampaniaElegida] = useState('todas');
    const [frecuencia, setFrecuencia] = useState('semanal');
    const [reportes, setReportes] = useState([]);
    const [generando, setGenerando] = useState(false);
    const [reporteAbierto, setReporteAbierto] = useState(null);
    const [error, setError] = useState(null);

    const adaptarReporte = (reporte) => {
        const campania = campaigns.find(
            (c) => Number(c.id) === Number(reporte.campaign_id)
        );

        return {
            ...reporte,
            id: reporte.id_report,
            nombre: campania?.name || 'Campaña sin nombre',
            plataforma: campania?.platform || 'Sin plataforma',
            frecuencia:
                reporte.period_end && reporte.period_start
                    ? `${Math.max(
                          1,
                          Math.round(
                              (new Date(reporte.period_end) -
                                  new Date(reporte.period_start)) /
                                  86400000
                          )
                      )} días`
                    : 'Personalizado',
            inicio: reporte.period_start,
            fin: reporte.period_end,
            telegram_status: reporte.message_status,
            metricas: {
                inversion: Number(campania?.investment) || 0,
                presupuesto: Number(campania?.budget) || 0,
                impresiones: Number(campania?.impressions) || 0,
                clics: Number(campania?.clicks) || 0,
                conversiones: Number(campania?.conversions) || 0,
                ctr:
                    Number(campania?.impressions) > 0
                        ? (Number(campania?.clicks) /
                              Number(campania?.impressions)) *
                          100
                        : 0,
                usoPresupuesto:
                    Number(campania?.budget) > 0
                        ? (Number(campania?.investment) /
                              Number(campania?.budget)) *
                          100
                        : 0,
            },
            conclusion: 'Reporte registrado correctamente.',
        };
    };

    const cargarReportes = async () => {
        try {
            const data = await apiRequest('/reports/');
            setReportes(data.map(adaptarReporte));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (campaigns.length > 0) {
            cargarReportes();
        }
    }, [campaigns]);

    const generarReporte = async () => {
        const lista =
            campaniaElegida === 'todas'
                ? campaigns
                : campaigns.filter(
                      (c) => String(c.id) === campaniaElegida
                  );

        if (lista.length === 0 || generando) return;

        if (campaniaElegida === 'todas') {
            setError(
                'El backend genera reportes por campaña. Seleccioná una campaña específica.'
            );
            return;
        }

        const campania = lista[0];
        const fin = new Date();
        const inicio = new Date();
        inicio.setDate(
            fin.getDate() - diasPorFrecuencia[frecuencia]
        );

        setGenerando(true);
        setError(null);

        try {
            await apiRequest('/reports/', {
                method: 'POST',
                body: JSON.stringify({
                    campaign_id: campania.id,
                    period_start: inicio.toISOString().slice(0, 10),
                    period_end: fin.toISOString().slice(0, 10),
                    channel: 'telegram',
                }),
            });

            await cargarReportes();
        } catch (err) {
            setError(err.message);
        } finally {
            setGenerando(false);
        }
    };

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    Reportes
                </Typography>
                <Typography color="text.secondary">
                    Informes automáticos del rendimiento de tus campañas.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: 'none' }}>
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Configuración
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DescriptionOutlinedIcon />}
                            onClick={generarReporte}
                            disabled={generando || campaigns.length === 0}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 700,
                            }}
                        >
                            {generando ? 'Generando...' : 'Generar ahora'}
                        </Button>
                    </Stack>

                    <TextField
                        select
                        fullWidth
                        label="Campaña"
                        value={campaniaElegida}
                        onChange={(e) => setCampaniaElegida(e.target.value)}
                    >
                        <MenuItem value="todas">Todas las campañas</MenuItem>
                        {campaigns.map((c) => (
                            <MenuItem key={c.id} value={String(c.id)}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Frecuencia"
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                    >
                        <MenuItem value="diaria">Diaria</MenuItem>
                        <MenuItem value="semanal">Semanal</MenuItem>
                        <MenuItem value="mensual">Mensual</MenuItem>
                    </TextField>
                </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: 'none' }}>
                <Stack spacing={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Reportes generados
                    </Typography>

                    {reportes.length === 0 ? (
                        <Typography color="text.secondary">
                            Todavía no se generó ningún reporte
                        </Typography>
                    ) : (
                        reportes.map((r) => (
                            <TarjetaReporte
                                key={r.id}
                                reporte={r}
                                onVer={() => setReporteAbierto(r)}
                            />
                        ))
                    )}
                </Stack>
            </Paper>

            <InformeDialog
                reporte={reporteAbierto}
                onClose={() => setReporteAbierto(null)}
            />
        </Stack>
    );
}

