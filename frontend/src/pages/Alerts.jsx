import { useState } from "react";
import { Stack, Button, Paper, TextField, MenuItem, Typography} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { alertas as alertasIniciales } from "../mocks/alerts";
import TarjetaAlerta from "../components/alerts/TarjetaAlerta";


export default function Alerts() {
  
  const [enviadas, setEnviadas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [campaniaElegida, setCampaniaElegida] = useState(alertasIniciales[0].id);



  const simularDisparo = () => {
  
  const base = alertasIniciales.find((c) => c.id === campaniaElegida);


  const nueva = {
    ...base,
    id: Date.now(),
    created_at: new Date().toISOString(),
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

  


    return (
    <Stack spacing={2} sx={{ p: 3 }}>                

      <Paper sx={{ p: 3, borderRadius: 4 }}>        
        <Typography variant="h6" sx={{ mb: 2 }}>
          Simular evento
        </Typography>

        

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            select
            label="Campaña"
            value={campaniaElegida}
            onChange={(e) => setCampaniaElegida(e.target.value)}
            sx={{ flexGrow: 1 }}
          >
            {alertasIniciales.map((campania) => (    
              <MenuItem key={campania.id} value={campania.id}>
                {campania.campaign_name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            startIcon={<BoltIcon />}
            onClick={simularDisparo}
            disabled={enviando}
            sx={{ borderRadius: 5 }}
          >
            Simular
          </Button>
        </Stack>
      </Paper>                                      

      
      <Paper sx={{ p: 3, borderRadius: 4, backgroundImage: "none" }}>
      <Stack spacing={2}>
        <Typography variant="h6">Alertas enviadas</Typography>

          {enviadas.length === 0 ? (
        <Typography color="text.secondary">
          Todavía no se envió ninguna alerta
        </Typography>
      ) : (
        enviadas.map((alerta) => <TarjetaAlerta key={alerta.id} alerta={alerta} />)
      )}
      </Stack>
      </Paper>

    </Stack> 
    
    
  );
}
