import { useState } from 'react';
import {
    Stack,
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useCampaigns } from '../../context/CampaignsContext';
import TarjetaReporte from '../../components/reports/TarjetaReporte';
import InformeDialog from '../../components/reports/InformeDialog';

// Cuántos días abarca cada frecuencia para calcular el período del informe.
const diasPorFrecuencia = { diaria: 1, semanal: 7, mensual: 30 };

// Suma las métricas de una lista de campañas y calcula CTR y uso del presupuesto.
function calcularMetricas(lista) {
    const inversion = lista.reduce((total, c) => total + (Number(c.investment) || 0), 0);
    const presupuesto = lista.reduce((total, c) => total + (Number(c.budget) || 0), 0);
    const impresiones = lista.reduce((total, c) => total + (Number(c.impressions) || 0), 0);
    const clics = lista.reduce((total, c) => total + (Number(c.clicks) || 0), 0);
    const conversiones = lista.reduce((total, c) => total + (Number(c.conversions) || 0), 0);

    return {
        inversion,
        presupuesto,
        impresiones,
        clics,
        conversiones,
        ctr: impresiones > 0 ? (clics / impresiones) * 100 : 0,
        usoPresupuesto: presupuesto > 0 ? (inversion / presupuesto) * 100 : 0,
    };
}

// Arma una conclusión en palabras según cómo dieron las métricas.
function armarConclusion(m) {
    if (m.usoPresupuesto >= 100) return 'La inversión superó el presupuesto. Conviene revisar los límites de gasto.';
    if (m.usoPresupuesto >= 90) return 'El presupuesto está casi agotado.';
    if (m.ctr < 2) return 'El CTR está por debajo de lo esperado. Revisá creatividades y segmentación.';
    return 'El rendimiento está dentro de lo esperado.';
}

export default function Reports() {
    const { campaigns } = useCampaigns();

    // Configuración elegida por el usuario.
    const [campaniaElegida, setCampaniaElegida] = useState('todas');
    const [frecuencia, setFrecuencia] = useState('semanal');

    // Reportes generados.
    const [reportes, setReportes] = useState([]);
    const [generando, setGenerando] = useState(false);
    const [reporteAbierto, setReporteAbierto] = useState(null);

    const generarReporte = () => {
        // 1. Qué campañas entran en el informe.
        const lista =
            campaniaElegida === 'todas'
                ? campaigns
                : campaigns.filter((c) => String(c.id) === campaniaElegida);

        if (lista.length === 0) return;

        // 2. El período: desde hoy menos los días de la frecuencia, hasta hoy.
        const fin = new Date();
        const inicio = new Date();
        inicio.setDate(fin.getDate() - diasPorFrecuencia[frecuencia]);

        // 3. Las cuentas.
        const metricas = calcularMetricas(lista);
        const esTodas = campaniaElegida === 'todas';

        // 4. El reporte nuevo.
        const nuevo = {
            id: Date.now(),
            nombre: esTodas ? 'Todas las campañas' : lista[0].name,
            plataforma: esTodas ? 'Varias plataformas' : lista[0].platform,
            frecuencia,
            inicio: inicio.toISOString(),
            fin: fin.toISOString(),
            metricas,
            conclusion: armarConclusion(metricas),
            telegram_status: 'enviando',
        };

        setReportes((prev) => [nuevo, ...prev]);

        // Simulamos el envío por Telegram.
        setGenerando(true);
        setTimeout(() => {
            setGenerando(false);
            setReportes((prev) =>
                prev.map((r) =>
                    r.id === nuevo.id ? { ...r, telegram_status: 'enviado' } : r
                )
            );
        }, 1500);
    };

    return (
        <Stack spacing={3}>
            {/* Encabezado de la página */}
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    Reportes
                </Typography>
                <Typography color="text.secondary">
                    Informes automáticos del rendimiento de tus campañas.
                </Typography>
            </Box>

            {/* Panel de configuración */}
            <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: 'none' }}>
                <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Configuración
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DescriptionOutlinedIcon />}
                            onClick={generarReporte}
                            disabled={generando || campaigns.length === 0}
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
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

            {/* Reportes generados */}
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

            {/* Ventana con el informe completo */}
            <InformeDialog
                reporte={reporteAbierto}
                onClose={() => setReporteAbierto(null)}
            />
        </Stack>
    );
}
