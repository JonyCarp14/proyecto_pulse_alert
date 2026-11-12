import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stack, Typography, Button, Divider,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const fecha = (iso) => new Date(iso).toLocaleDateString("es-AR");
const plata = (n) => `$${n.toLocaleString("es-AR")}`;
const numero = (n) => n.toLocaleString("es-AR");

export default function InformeDialog({ reporte, onClose }) {
  // si no hay reporte elegido, no se dibuja nada
  if (!reporte) return null;

  const m = reporte.metricas;

  // cada fila del informe: [nombre, valor]
  const filas = [
    ["Inversión", `${plata(m.inversion)} de ${plata(m.presupuesto)} (${m.usoPresupuesto.toFixed(0)} %)`],
    ["Impresiones", numero(m.impresiones)],
    ["Clics", numero(m.clics)],
    ["CTR", `${m.ctr.toFixed(1)} %`],
    ["Conversiones", numero(m.conversiones)],
  ];

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        Informe {reporte.frecuencia} — {reporte.nombre}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Período: {fecha(reporte.inicio)} al {fecha(reporte.fin)} · {reporte.plataforma}
          </Typography>

          <Divider />

          {filas.map(([nombre, valor]) => (
            <Stack key={nombre} direction="row" justifyContent="space-between">
              <Typography color="text.secondary">{nombre}</Typography>
              <Typography sx={{ fontWeight: 700 }}>{valor}</Typography>
            </Stack>
          ))}

          <Divider />

          <Typography>
            <b>Conclusión:</b> {reporte.conclusion}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cerrar
        </Button>

        <Button
          variant="contained"
          startIcon={<PictureAsPdfOutlinedIcon />}
          onClick={() => window.print()}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
        >
          Descargar PDF
        </Button>

      </DialogActions>
    </Dialog>
  );
}