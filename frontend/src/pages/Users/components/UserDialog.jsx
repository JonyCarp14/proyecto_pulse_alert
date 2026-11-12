
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';

const initialForm = {
    firstName: '',
    lastName: '',
    role: 'user',
    plan: 'free',
};

function UserDialog({ open, user, onClose, onSave }) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                plan: user.plan || 'free',
            });
        } else {
            setForm(initialForm);
        }
    }, [user, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => {
            const updated = {
                ...previous,
                [name]: value,
            };

            if (name === 'role' && value === 'admin') {
                updated.plan = null;
            }

            if (name === 'role' && value === 'user') {
                updated.plan = 'free';
            }

            return updated;
        });
    };

    const handleSubmit = () => {
        onSave({
            ...form,
            plan: form.role === 'admin' ? null : form.plan,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    backgroundColor: '#111827',
                    color: '#F8FAFC',
                    border: '1px solid #263244',
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle fontWeight="bold">
                Editar usuario
            </DialogTitle>

            <DialogContent>
                <Typography color="#94A3B8" variant="body2" mb={3}>
                    Modificá los datos y permisos de este usuario.
                </Typography>

                <Stack spacing={2.5} mt={1}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Apellido"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Rol"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <MenuItem value="user">Usuario</MenuItem>
                        <MenuItem value="admin">Administrador</MenuItem>
                    </TextField>

                    {form.role === 'user' && (
                        <TextField
                            select
                            fullWidth
                            label="Plan"
                            name="plan"
                            value={form.plan || 'free'}
                            onChange={handleChange}
                        >
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="premium">Premium</MenuItem>
                        </TextField>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        background: 'linear-gradient(90deg, #0865F5, #08BCEB)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #0755CC, #079CC5)',
                        },
                    }}
                >
                    Guardar cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDialog;
