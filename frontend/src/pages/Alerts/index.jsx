import { useState } from 'react';
import {
    Stack,
    Button,
    Paper,
    TextField,
    MenuItem,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Box,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import { useAlerts } from '../../context/AlertsContext';
import { useCampaigns } from '../../context/CampaignsContext';
import TarjetaAlerta from '../../components/alerts/TarjetaAlerta';
import { eventos } from '../../mocks/eventos';

function adaptarAlerta(alerta) {
    return {
        ...alerta,
        created_at: alerta.created_at || alerta.date,
        campaign_name: alerta.campaign_name || alerta.campaign,
        titulo: alerta.titulo || alerta.title,
        priority: alerta.priority || alerta.severity,
    };
}

export default function Alerts() {
    const { alerts, addAlert, updateAlert } = useAlerts();
    const { campaigns } = useCampaigns();

    const [enviando, setEnviando] = useState(false);
    const [campaniaElegida, setCampaniaElegida] = useState('');
    const [filtro, setFiltro] = useState('todas');
    const [eventoElegido, setEventoElegido] = useState(eventos[0].id);

    const simularDisparo = () => {
        const campania = campaigns.find(
            (c) => String(c.id) === String(campaniaElegida)
        );

        const evento = eventos.find(
            (e) => e.id === eventoElegido
        );

        if (!campania || !evento || enviando) return;

        const nueva = addAlert({
            campaign: campania.name,
            campaign_name: campania.name,
            title: evento.titulo,
            titulo: evento.titulo,
            priority: evento.prioridad,
            severity: evento.prioridad,
            message: evento.mensaje({
                ...campania,
                value: campania.investment,
                limit: campania.budget,
            }),
            status: 'nueva',
            telegram_status: 'enviando',
        });

        setEnviando(true);

        setTimeout(() => {
            updateAlert(nueva.id, {
                telegram_status: 'enviado',
            });

            setEnviando(false);
        }, 1500);
    };

    const alertasAdaptadas = alerts.map((alerta) => {
        const campania = campaigns.find(
            (c) => Number(c.id) === Number(alerta.campaign_id)
        );

        return adaptarAlerta({
            ...alerta,
            campaign_name: campania?.name || 'Campaña sin nombre',
        });
    });

    const filtradas =
        filtro === 'todas'
            ? alertasAdaptadas
            : alertasAdaptadas.filter(
                (alerta) => alerta.priority === filtro
            );

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    Alertas
                </Typography>
                <Typography color="text.secondary">
                    Simula y visualiza alertas de campañas.
                </Typography>
            </Box>

            {/* Panel para simular un evento */}
            <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: 'none' }}>
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Simular evento
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<BoltIcon />}
                            onClick={simularDisparo}
                            disabled={
                                enviando ||
                                !campaniaElegida ||
                                campaigns.length === 0
                            }
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 700,
                            }}
                        >
                            {enviando ? 'Enviando...' : 'Simular'}
                        </Button>
                    </Stack>

                    <Stack spacing={2}>
                        <TextField
                            select
                            label="Evento"
                            value={eventoElegido}
                            onChange={(e) =>
                                setEventoElegido(e.target.value)
                            }
                            fullWidth
                        >
                            {eventos.map((ev) => (
                                <MenuItem key={ev.id} value={ev.id}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        {ev.icono}
                                        <Stack>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {ev.titulo}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {ev.descripcion}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Campaña"
                            value={campaniaElegida}
                            onChange={(e) =>
                                setCampaniaElegida(e.target.value)
                            }
                            fullWidth
                        >
                            {campaigns.map((campania) => (
                                <MenuItem
                                    key={campania.id}
                                    value={String(campania.id)}
                                >
                                    {campania.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {campaigns.length === 0 && (
                            <Typography color="text.secondary">
                                No hay campañas disponibles para simular alertas.
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Paper>

            {/* Alertas generadas */}
            <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: 'none' }}>
                <Stack spacing={2}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Alertas enviadas
                        </Typography>

                        <ToggleButtonGroup
                            size="small"
                            exclusive
                            value={filtro}
                            onChange={(e, nuevo) =>
                                nuevo && setFiltro(nuevo)
                            }
                            sx={{
                                '& .MuiToggleButton-root': {
                                    textTransform: 'none',
                                },
                            }}
                        >
                            <ToggleButton value="todas">Todas</ToggleButton>
                            <ToggleButton value="critical">Crítica</ToggleButton>
                            <ToggleButton value="medium">Media</ToggleButton>
                            <ToggleButton value="info">Informativa</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                    {filtradas.length === 0 ? (
                        <Typography color="text.secondary">
                            No hay alertas para mostrar
                        </Typography>
                    ) : (
                        filtradas.map((alerta) => (
                            <TarjetaAlerta
                                key={alerta.id}
                                alerta={alerta}
                            />
                        ))
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}
