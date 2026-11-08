
import { Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";


const colorPrioridad = { alta: "error", media: "warning", baja: "secondary" };
const colorTelegram = { enviando: "default", enviado: "success", fallido: "error" };
export default function TarjetaAlerta({ alerta }) {

  // convierte la fecha en texto 
  const fecha = new Date(alerta.created_at).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  // franja de color de la tarjeta si es nueva o no
  const esNueva = alerta.status === "nueva";

  

  return (
    
    <Card
      variant="outlined"
      sx={{
        maxWidth: 500,
        bgcolor: "background.paper",
        borderRadius: 7,
        boxShadow: 3,
        borderLeft: 6,
        borderColor: esNueva ? "success.main" : "divider",
      }}
    >

      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {fecha}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={alerta.priority.toUpperCase()}
              color={colorPrioridad[alerta.priority]}
              size="small"
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {alerta.campaign_name}
            </Typography>
          </Stack>

          <Typography variant="body1">{alerta.message}</Typography>

          <Typography variant="body2" color="text.secondary">
            Valor detectado: {alerta.value} · Límite: {alerta.limit}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<TelegramIcon />}
              label={`Telegram: ${alerta.telegram_status}`}
              color={colorTelegram[alerta.telegram_status]}
              variant="outlined"
              size="small"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
