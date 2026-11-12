import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { NavLink } from 'react-router-dom';

const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
    { text: 'Campañas', icon: <CampaignOutlinedIcon />, path: '/campaigns' },
    { text: 'Alertas', icon: <NotificationsActiveOutlinedIcon />, path: '/alerts' },
    { text: 'Reportes', icon: <AssessmentOutlinedIcon />, path: '/reports' },
    { text: 'Usuarios', icon: <PeopleOutlineIcon /> },
];

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 260,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 260,
                    boxSizing: 'border-box',
                    backgroundColor: '#111827',
                    color: '#F8FAFC',
                    borderRight: '1px solid #263244',
                    padding: 1,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.3,
                    px: 0,
                    py: 2,
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    component="img"
                    src="/pulsealert-logo.png"
                    alt="PulseAlert"
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        flexShrink: 0,
                    }}
                />

                <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <Typography
                        component="div"
                        sx={{
                            fontSize: 22,
                            fontWeight: 800,
                            letterSpacing: '-0.8px',
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap',
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

                    <Box sx={{ display: 'flex', gap: 0.45, mt: 0.8, whiteSpace: 'nowrap' }}>
                        <Typography sx={{ fontSize: 7.5, letterSpacing: '1px', color: '#0865F5' }}>
                            MONITOR.
                        </Typography>
                        <Typography sx={{ fontSize: 7.5, letterSpacing: '1px', color: '#08BCEB' }}>
                            ANALYZE.
                        </Typography>
                        <Typography sx={{ fontSize: 7.5, letterSpacing: '1px', color: '#F59E0B' }}>
                            ALERT.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={item.path ? NavLink : 'div'}
                        {...(item.path ? { to: item.path, end: true } : {})}
                        disabled={!item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            color: '#F8FAFC',
                            textDecoration: 'none',
                            '&:hover': {
                                backgroundColor: '#1E293B',
                            },
                            '&.active': {
                                backgroundColor: '#1E3A5F',
                                '& .MuiListItemIcon-root': {
                                    color: '#2563EB',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#94A3B8', minWidth: 42 }}>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ fontSize: 14 }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;