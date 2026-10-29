import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#2563EB", // Azul
        },
        secondary: {
            main: "#22D3EE", // Cian
        },
        warning: {
            main: "#F59E0B", // Ámbar
        },
        error: {
            main: "#EF4444", // Rojo
        },
        success: {
            main: "#10B981", // Verde
        },
        background: {
            default: "#0B1220", // Azul noche
            paper: "#111827", // Superficie de tarjetas y paneles
        },
        text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
        },
        divider: "#263244",
    },
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
    },
});

export default theme;
