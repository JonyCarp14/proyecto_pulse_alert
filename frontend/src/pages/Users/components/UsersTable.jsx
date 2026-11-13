
import {
    Box,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    EditOutlined,
    DeleteOutline,
    AdminPanelSettingsOutlined,
    PersonOutline,
} from '@mui/icons-material';

function UsersTable({ users, onEdit, onDelete }) {
    const getRoleChip = (role) => {
        if (role === 'admin') {
            return (
                <Chip
                    icon={<AdminPanelSettingsOutlined />}
                    label="Administrador"
                    size="small"
                    color="secondary"
                />
            );
        }

        return (
            <Chip
                icon={<PersonOutline />}
                label="Usuario"
                size="small"
                color="primary"
            />
        );
    };

    const getPlanChip = (plan) => {
        if (!plan) {
            return <Typography color="text.secondary">—</Typography>;
        }

        return (
            <Chip
                label={plan === 'premium' ? 'Premium' : 'Free'}
                size="small"
                color={plan === 'premium' ? 'success' : 'default'}
            />
        );
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: '#111827',
                border: '1px solid #263244',
                borderRadius: 3,
                boxShadow: 'none',
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            '& th': {
                                color: '#94A3B8',
                                fontWeight: 700,
                                borderBottom: '1px solid #263244',
                            },
                        }}
                    >
                        <TableCell>Nombre</TableCell>
                        <TableCell>Correo electrónico</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Plan</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            hover
                            sx={{
                                '& td': {
                                    color: '#F8FAFC',
                                    borderBottom: '1px solid #263244',
                                },
                                '&:hover': {
                                    backgroundColor: '#1E293B',
                                },
                            }}
                        >
                            <TableCell>
                                <Typography fontWeight={600}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography color="#94A3B8">
                                    {user.email}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                {getRoleChip(user.role)}
                            </TableCell>

                            <TableCell>
                                {getPlanChip(user.plan)}
                            </TableCell>

                            <TableCell align="center">
                                <Tooltip title="Editar usuario">
                                    <IconButton
                                        size="small"
                                        onClick={() => onEdit(user)}
                                        sx={{ color: '#38BDF8', mr: 1 }}
                                    >
                                        <EditOutlined />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Eliminar usuario">
                                    <IconButton
                                        size="small"
                                        onClick={() => onDelete(user)}
                                        sx={{ color: '#F87171' }}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}

                    {users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <Box py={4}>
                                    <Typography color="#94A3B8">
                                        No se encontraron usuarios.
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTable;
