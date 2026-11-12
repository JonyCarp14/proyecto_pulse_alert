
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    ShowChart,
    Campaign,
    NotificationsActive,
    TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
const chartBars = [35, 55, 42, 75, 60, 90, 70, 100, 82, 115, 95, 130];
function Login() {
    const navigate = useNavigate();
    const { login, loginWithMock } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const redirectUser = (user) => {
        if (user.role === 'admin' || user.rol === 'admin') {
            navigate('/users');
        } else {
            navigate('/dashboard');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!email.trim() || !password) {
            setError('Completá todos los campos.');
            return;
        }
        setLoading(true);
        try {
            const result = await login(email.trim(), password);
            if (!result.success) {
                setError(result.message);
                return;
            }
            redirectUser(result.user);
        } catch {
            setError('No se pudo iniciar sesión. Intentá nuevamente.');
        } finally {
            setLoading(false);
        }
    };
    const handleMockLogin = () => {
        setError('');
        if (!email.trim() || !password) {
            setError('Completá el correo y la contraseña para ingresar en modo desarrollo.');
            return;
        }
        const result = loginWithMock(email.trim(), password);
        if (!result.success) {
            setError(result.message);
            return;
        }
        redirectUser(result.user);
    };
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 4,
                background: `
                    radial-gradient(circle at 15% 20%, rgba(8,101,245,0.12), transparent 30%),
                    radial-gradient(circle at 85% 80%, rgba(167,139,250,0.10), transparent 30%),
                    #0B1220
                `,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        backgroundColor: '#111827',
                        border: '1px solid #263244',
                        boxShadow: '0 24px 70px rgba(0,0,0,0.3)',
                    }}
                >
                    <Stack alignItems="center" spacing={0.5} mb={4}>
                        <Box
                            component="img"
                            src="/pulsealert-logo.png"
                            alt="PulseAlert"
                            sx={{
                                width: 100,
                                height: 100,
                                objectFit: 'contain',
                            }}
                        />
                        <Typography
                            component="div"
                            sx={{
                                fontSize: 30,
                                fontWeight: 800,
                                letterSpacing: '-0.8px',
                                lineHeight: 1.1,
                            }}
                        >
                            <Box component="span" sx={{ color: '#F8FAFC' }}>
                                Pulse
                            </Box>
                            <Box
                                component="span"
                                sx={{
                                    background: 'linear-gradient(90deg, #0865F5, #08BCEB)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Alert
                            </Box>
                        </Typography>
                        <Stack direction="row" spacing={0.8} mt={1}>
                            <Typography sx={{ fontSize: 8, letterSpacing: '1px', color: '#0865F5' }}>
                                MONITOR.
                            </Typography>
                            <Typography sx={{ fontSize: 8, letterSpacing: '1px', color: '#08BCEB' }}>
                                ANALYZE.
                            </Typography>
                            <Typography sx={{ fontSize: 8, letterSpacing: '1px', color: '#F59E0B' }}>
                                ALERT.
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight="bold" color="#F8FAFC" mb={1}>
                            Bienvenido de nuevo
                        </Typography>
                        <Typography color="#94A3B8" variant="body2">
                            Ingresá a tu cuenta para continuar.
                        </Typography>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: '#F8FAFC',
                                        backgroundColor: '#1E293B',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#94A3B8',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#334155',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0865F5',
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0865F5',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: '#F8FAFC',
                                        backgroundColor: '#1E293B',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#94A3B8',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#334155',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0865F5',
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0865F5',
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: '#94A3B8' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    background: 'linear-gradient(90deg, #0865F5, #08BCEB)',
                                    boxShadow: '0 5px 20px rgba(8,101,245,0.2)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #0755CC, #079CC5)',
                                    },
                                }}
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#263244' }} />
                                <Typography variant="caption" color="#64748B">
                                    O
                                </Typography>
                                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#263244' }} />
                            </Box>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={handleMockLogin}
                                disabled={loading}
                                sx={{
                                    py: 1.3,
                                    borderRadius: 2,
                                    borderColor: '#475569',
                                    color: '#CBD5E1',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        borderColor: '#08BCEB',
                                        backgroundColor: 'rgba(8,188,235,0.06)',
                                    },
                                }}
                            >
                                Ingresar en modo desarrollo
                            </Button>
                            <Typography variant="caption" color="#64748B" textAlign="center">
                                Acceso temporal con cuentas de prueba.
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            mt: 4,
                            pt: 3,
                            borderTop: '1px solid #263244',
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="#94A3B8"
                            fontWeight="medium"
                        >
                            TODO TU MARKETING EN UN SOLO LUGAR
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={1}
                            mt={2}
                        >
                            {[
                                { icon: <ShowChart />, label: 'Métricas', color: '#22D3EE' },
                                { icon: <Campaign />, label: 'Campañas', color: '#A78BFA' },
                                { icon: <NotificationsActive />, label: 'Alertas', color: '#EF4444' },
                                { icon: <TrendingUp />, label: 'Resultados', color: '#34D399' },
                            ].map((item) => (
                                <Stack key={item.label} alignItems="center" spacing={0.5}>
                                    <Box sx={{ color: item.color, display: 'flex' }}>
                                        {item.icon}
                                    </Box>
                                    <Typography variant="caption" color="#CBD5E1">
                                        {item.label}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                        <Box
                            sx={{
                                height: 65,
                                display: 'flex',
                                alignItems: 'end',
                                justifyContent: 'center',
                                gap: 1,
                                mt: 3,
                                opacity: 0.8,
                            }}
                        >
                            {chartBars.map((height, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        flex: 1,
                                        maxWidth: 22,
                                        height: `${height / 1.5}%`,
                                        minHeight: 8,
                                        borderRadius: '4px 4px 0 0',
                                        background: [
                                            '#0865F5',
                                            '#08BCEB',
                                            '#A78BFA',
                                            '#34D399',
                                            '#FBBF24',
                                            '#EF4444',
                                        ][index % 6],
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Typography
                        variant="caption"
                        color="#64748B"
                        display="block"
                        textAlign="center"
                        mt={3}
                    >
                        PulseAlert © 2026
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
export default Login;
