import {
    Card,
    CardContent,
    Stack,
    Typography,
    Chip,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

const colorTelegram = {
    enviando: 'default',
    enviado: 'success',
    fallido: 'error',
};

const colorPrioridad = {
    critical: 'error',
    medium: 'warning',
    info: 'secondary',
};

const nombrePrioridad = {
    critical: 'Crítica',
    medium: 'Media',
    info: 'Informativa',
};

export default function TarjetaAlerta({ alerta }) {
    const fecha = alerta.created_at || alerta.date;

    const fechaFormateada = fecha
        ? new Date(fecha).toLocaleString('es-AR', {
              dateStyle: 'short',
              timeStyle: 'short',
          })
        : 'Fecha no disponible';

    const prioridad = alerta.priority || alerta.severity;
    const titulo = alerta.titulo || alerta.title;
    const campania = alerta.campaign_name || alerta.campaign;
    const telegramStatus = alerta.telegram_status;

    const esNueva = alerta.status === 'nueva';

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 500,
                bgcolor: 'background.paper',
                borderRadius: 7,
                boxShadow: 3,
                borderLeft: 6,
                borderColor: esNueva ? 'success.main' : 'divider',
            }}
        >
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        {fechaFormateada}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        {prioridad && (
                            <Chip
                                label={nombrePrioridad[prioridad] || prioridad}
                                color={colorPrioridad[prioridad] || 'default'}
                                size="small"
                            />
                        )}

                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {campania || 'Campaña sin nombre'}
                        </Typography>
                    </Stack>

                    {titulo && (
                        <Typography sx={{ fontWeight: 700 }}>
                            {titulo}
                        </Typography>
                    )}

                    {alerta.message && (
                        <Typography variant="body1">
                            {alerta.message}
                        </Typography>
                    )}

                    {telegramStatus && (
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Chip
                                icon={<TelegramIcon />}
                                label={`Telegram: ${telegramStatus}`}
                                color={
                                    colorTelegram[telegramStatus] || 'default'
                                }
                                variant="outlined"
                                size="small"
                            />
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
