
import { Card, CardContent, Stack, Typography, Chip, Button } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
const colorTelegram = {
    enviando: 'default',
    enviado: 'success',
    fallido: 'error',
};
const fecha = (iso) => new Date(iso).toLocaleDateString('es-AR');
const plata = (n) => `$${n.toLocaleString('es-AR')}`;
export default function TarjetaReporte({ reporte, onVer }) {
    const m = reporte.metricas;
    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 600,
                borderRadius: 4,
                bgcolor: 'background.paper',
                backgroundImage: 'none',
            }}
        >
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        {fecha(reporte.inicio)} al {fecha(reporte.fin)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Informe {reporte.frecuencia} · {reporte.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Inversión {plata(m.inversion)} de {plata(m.presupuesto)} · CTR {m.ctr.toFixed(1)} % · {m.conversiones} conversiones
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {reporte.telegram_status && (
                            <Chip
                                icon={<TelegramIcon />}
                                label={`Telegram: ${reporte.telegram_status}`}
                                color={colorTelegram[reporte.telegram_status] || 'default'}
                                variant="outlined"
                                size="small"
                            />
                        )}
                        <Button
                            size="small"
                            onClick={onVer}
                            sx={{ ml: 'auto', textTransform: 'none', fontWeight: 700 }}
                        >
                            Ver informe
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
