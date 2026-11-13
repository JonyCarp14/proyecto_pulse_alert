import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Tooltip,
} from '@mui/material';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/campaigns': 'Campañas',
        '/alerts': 'Alertas',
        '/reports': 'Reportes',
        '/users': 'Usuarios',
    };

    const pageTitle = pageTitles[location.pathname] || 'PulseAlert';

    const roleNames = {
        admin: 'Administrador',
        user: user?.plan === 'premium' ? 'Premium' : 'Free',
    };

    const userName = user
        ? `${user.nombre ?? user.firstName ?? ''} ${user.apellido ?? user.lastName ?? ''}`.trim()
        : 'Invitado';
    const userRole = roleNames[user?.rol ?? user?.role] || 'Sin sesión';
    const avatarLetter = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#111827',
                borderBottom: '1px solid #263244',
                color: '#F8FAFC',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="600">
                    {pageTitle}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton sx={{ color: '#94A3B8' }}>
                        <NotificationsOutlinedIcon />
                    </IconButton>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" fontWeight="600">
                            {userName}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                            {userRole}
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: '#2563EB' }}>
                        {avatarLetter}
                    </Avatar>

                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                color: '#94A3B8',
                                '&:hover': {
                                    color: '#EF4444',
                                    backgroundColor: 'rgba(239,68,68,0.1)',
                                },
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
