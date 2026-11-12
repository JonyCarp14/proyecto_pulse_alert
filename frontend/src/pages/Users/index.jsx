
import { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    InputAdornment,
    Stack,
    Chip,
} from '@mui/material';
import {
    PeopleAltOutlined,
    AdminPanelSettingsOutlined,
    WorkspacePremiumOutlined,
    PersonOutline,
    SearchOutlined,
} from '@mui/icons-material';

import { useUsers } from '../../context/UsersContext';
import UsersTable from './components/UsersTable';
import UserDialog from './components/UserDialog';
import DeleteUserDialog from './components/DeleteUserDialog';

function Users() {
    const { users, updateUser, deleteUser } = useUsers();

    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const stats = useMemo(() => ({
        total: users.length,
        admins: users.filter((user) => user.role === 'admin').length,
        premium: users.filter((user) => user.role === 'user' && user.plan === 'premium').length,
        free: users.filter((user) => user.role === 'user' && user.plan === 'free').length,
    }), [users]);

    const filteredUsers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) return users;

        return users.filter((user) =>
            `${user.firstName} ${user.lastName} ${user.email}`
                .toLowerCase()
                .includes(normalizedSearch)
        );
    }, [users, search]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditOpen(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setDeleteOpen(true);
    };

    const handleSave = (updatedData) => {
        if (!selectedUser) return;

        updateUser(selectedUser.id, updatedData);
        setEditOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = () => {
        if (!selectedUser) return;

        deleteUser(selectedUser.id);
        setDeleteOpen(false);
        setSelectedUser(null);
    };

    const handleCloseDialogs = () => {
        setEditOpen(false);
        setDeleteOpen(false);
        setSelectedUser(null);
    };

    const statCards = [
        {
            title: 'Usuarios registrados - PRUEBA',
            value: stats.total,
            icon: <PeopleAltOutlined />,
            color: '#38BDF8',
        },
        {
            title: 'Administradores',
            value: stats.admins,
            icon: <AdminPanelSettingsOutlined />,
            color: '#A78BFA',
        },
        {
            title: 'Planes Premium',
            value: stats.premium,
            icon: <WorkspacePremiumOutlined />,
            color: '#34D399',
        },
        {
            title: 'Planes Free',
            value: stats.free,
            icon: <PersonOutline />,
            color: '#94A3B8',
        },
    ];

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                mb={4}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Usuarios
                    </Typography>
                    <Typography color="text.secondary" mt={0.5}>
                        Administración de usuarios y permisos.
                    </Typography>
                </Box>

                <Chip
                    label="Panel de administración"
                    color="secondary"
                    variant="outlined"
                />
            </Stack>

            <Grid container spacing={2.5} mb={4}>
                {statCards.map((card) => (
                    <Grid item xs={12} sm={6} lg={3} key={card.title}>
                        <Paper
                            sx={{
                                p: 2.5,
                                backgroundColor: '#111827',
                                border: '1px solid #263244',
                                borderRadius: 3,
                                boxShadow: 'none',
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="#94A3B8"
                                    >
                                        {card.title}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        color="#F8FAFC"
                                        mt={1}
                                    >
                                        {card.value}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: `${card.color}18`,
                                        color: card.color,
                                        '& svg': { fontSize: 26 },
                                    }}
                                >
                                    {card.icon}
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper
                sx={{
                    p: 2.5,
                    mb: 3,
                    backgroundColor: '#111827',
                    border: '1px solid #263244',
                    borderRadius: 3,
                    boxShadow: 'none',
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Buscar por nombre, apellido o correo..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined sx={{ color: '#94A3B8' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            <UsersTable
                users={filteredUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <UserDialog
                open={editOpen}
                user={selectedUser}
                onClose={handleCloseDialogs}
                onSave={handleSave}
            />

            <DeleteUserDialog
                open={deleteOpen}
                user={selectedUser}
                onClose={handleCloseDialogs}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default Users;
