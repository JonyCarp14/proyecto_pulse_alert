import { useState } from "react";
import { Stack, Button, Paper, TextField, MenuItem, Typography, ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { alertas as alertasIniciales } from "../mocks/alerts";
import TarjetaAlerta from "../components/alerts/TarjetaAlerta";
import { eventos } from "../mocks/eventos";


export default function Alerts() {

  const [enviadas, setEnviadas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [campaniaElegida, setCampaniaElegida] = useState(alertasIniciales[0].id);
  const [filtro, setFiltro] = useState("todas");
  const [eventoElegido, setEventoElegido] = useState(eventos[0].id);


  const simularDisparo = () => {

    const base = alertasIniciales.find((c) => c.id === campaniaElegida);
    const evento = eventos.find((e) => e.id === eventoElegido);

    const nueva = {
      ...base,
      id: Date.now(),
      created_at: new Date().toISOString(),
      titulo: evento.titulo,
      priority: evento.prioridad,
      message: evento.mensaje(base),
      status: "nueva",
      telegram_status: "enviando",
    };

    setEnviando(true);
    setEnviadas((prev) => [nueva, ...prev]);


    setTimeout(() => {
      setEnviando(false);
      setEnviadas((prev) =>
        prev.map((a) => (a.id === nueva.id ? { ...a, telegram_status: "enviado" } : a))
      );
    }, 1500);

  };
  const filtradas =
    filtro === "todas" ? enviadas : enviadas.filter((a) => a.priority === filtro);




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

      {/* Panel para simular un evento: elegir evento y campaña, y disparar */}
      <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: "none" }}>
        <Stack spacing={3}>
          {/* Fila de arriba: título a la izquierda, botón a la derecha */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Simular evento
            </Typography>

            <Button
              variant="contained"
              startIcon={<BoltIcon />}
              onClick={simularDisparo}
              disabled={enviando}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
            >
              Simular
            </Button>
          </Stack>

          {/* Fila de abajo: los dos desplegables, uno al lado del otro */}
          <Stack spacing={2}>
            <TextField
              select
              label="Evento"
              value={eventoElegido}
              onChange={(e) => setEventoElegido(e.target.value)}
              fullWidth
            >
              {eventos.map((ev) => (
                <MenuItem key={ev.id} value={ev.id}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {ev.icono}
                    <Stack>
                      <Typography sx={{ fontWeight: 700 }}>{ev.titulo}</Typography>
                      <Typography variant="body2" color="text.secondary">
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
              onChange={(e) => setCampaniaElegida(e.target.value)}
              fullWidth
            >
              {alertasIniciales.map((campania) => (
                <MenuItem key={campania.id} value={campania.id}>
                  {campania.campaign_name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      </Paper>



      <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: "none" }}>
        <Stack spacing={2}>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Alertas enviadas
            </Typography>

            <ToggleButtonGroup
              size="small"
              exclusive
              value={filtro}
              onChange={(e, nuevo) => nuevo && setFiltro(nuevo)}
              sx={{ "& .MuiToggleButton-root": { textTransform: "none" } }}
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
            filtradas.map((alerta) => <TarjetaAlerta key={alerta.id} alerta={alerta} />)
          )}
        </Stack>
      </Paper>


    </Stack>


  );
}
