import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
} from '@mui/material';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

function Header() {
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
                    Dashboard
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton sx={{ color: '#94A3B8' }}>
                        <NotificationsOutlinedIcon />
                    </IconButton>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" fontWeight="600">
                            Franco Esquivel
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                            Administrador
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: '#2563EB' }}>
                        F
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;