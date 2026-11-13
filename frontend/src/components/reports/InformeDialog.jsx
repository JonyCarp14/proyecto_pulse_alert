import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Typography,
    Button,
    Divider,
    Alert,
} from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const API_URL = 'http://localhost:8000';

const fecha = (iso) => new Date(iso).toLocaleDateString('es-AR');
const plata = (n) => `$${Number(n || 0).toLocaleString('es-AR')}`;
const numero = (n) => Number(n || 0).toLocaleString('es-AR');

export default function InformeDialog({ reporte, onClose }) {
    const [descargando, setDescargando] = useState(false);
    const [error, setError] = useState(null);

    if (!reporte) return null;

    const m = reporte.metricas;

    const filas = [
        ['Inversión', `${plata(m.inversion)} de ${plata(m.presupuesto)} (${m.usoPresupuesto.toFixed(0)} %)`],
        ['Impresiones', numero(m.impresiones)],
        ['Clics', numero(m.clics)],
        ['CTR', `${m.ctr.toFixed(1)} %`],
        ['Conversiones', numero(m.conversiones)],
    ];

    const descargarPDF = async () => {
        setDescargando(true);
        setError(null);

        try {
            const token = sessionStorage.getItem('pulsealert_token');
            const idReporte = reporte.id_report || reporte.id;

            const response = await fetch(
                `${API_URL}/reports/${idReporte}/pdf`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.detail || 'No se pudo descargar el PDF.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const enlace = document.createElement('a');

            enlace.href = url;
            enlace.download = `reporte-${idReporte}.pdf`;
            document.body.appendChild(enlace);
            enlace.click();
            enlace.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.message);
        } finally {
            setDescargando(false);
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>
                Informe {reporte.frecuencia} — {reporte.nombre}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <Typography variant="body2" color="text.secondary">
                        Período: {fecha(reporte.inicio)} al {fecha(reporte.fin)} · {reporte.plataforma}
                    </Typography>

                    <Divider />

                    {filas.map(([nombre, valor]) => (
                        <Stack
                            key={nombre}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography color="text.secondary">
                                {nombre}
                            </Typography>
                            <Typography sx={{ fontWeight: 700 }}>
                                {valor}
                            </Typography>
                        </Stack>
                    ))}

                    <Divider />

                    <Typography>
                        <b>Conclusión:</b> {reporte.conclusion}
                    </Typography>
                </Stack>
            </DialogContent>

            <DialogActions
                sx={{
                    gap: 1,
                    px: 3,
                    pb: 2,
                }}
            >
                <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                    Cerrar
                </Button>

                <Button
                    variant="contained"
                    startIcon={<PictureAsPdfOutlinedIcon />}
                    onClick={descargarPDF}
                    disabled={descargando || !reporte.id_report}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                    }}
                >
                    {descargando ? 'Descargando...' : 'Descargar PDF'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
