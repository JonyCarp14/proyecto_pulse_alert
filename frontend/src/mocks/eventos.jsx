import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// formatea un número como plata: 22000 → "$22.000"
const plata = (n) => `$${n.toLocaleString("es-AR")}`;

// los 4 eventos que se pueden simular (los mismos que diseñó Franco)
export const eventos = [
  {
    id: "presupuesto",
    titulo: "Presupuesto crítico / excedido",
    descripcion: "Simula que la inversión alcanza o supera el presupuesto.",
    icono: <AccountBalanceWalletOutlinedIcon color="error" />,
    prioridad: "critical",
    mensaje: (c) =>
      `La inversión llegó a ${plata(c.value)} de un presupuesto de ${plata(c.limit)}.`,
  },
  {
    id: "caida",
    titulo: "Campaña caída",
    descripcion: "Simula una interrupción inesperada de la campaña.",
    icono: <ErrorOutlineIcon color="error" />,
    prioridad: "critical",
    mensaje: () => "La campaña dejó de entregar anuncios de forma inesperada.",
  },
  {
    id: "pausada",
    titulo: "Campaña pausada",
    descripcion: "Simula que la campaña pasa a estado pausado.",
    icono: <PauseCircleOutlineIcon color="warning" />,
    prioridad: "medium",
    mensaje: () => "La campaña pasó a estado pausado y no está generando impresiones.",
  },
  {
    id: "rendimiento",
    titulo: "Caída del rendimiento",
    descripcion: "Simula una disminución importante de clics o conversiones.",
    icono: <TrendingDownIcon color="warning" />,
    prioridad: "medium",
    mensaje: () => "Bajaron los clics y conversiones respecto del promedio.",
  },
];