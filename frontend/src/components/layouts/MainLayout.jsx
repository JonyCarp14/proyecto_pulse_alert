import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

function MainLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1220' }}>
            <Sidebar />

            <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <Header />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        color: '#F8FAFC',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;