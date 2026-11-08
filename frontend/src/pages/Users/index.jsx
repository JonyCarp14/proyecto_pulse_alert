import { Box, Typography } from '@mui/material';

function Users() {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold">
                Usuarios
            </Typography>
            <Typography color="text.secondary">
                Administración de usuarios y permisos.
            </Typography>
        </Box>
    );
}

export default Users;