
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from '@mui/material';
import { WarningAmberOutlined } from '@mui/icons-material';

function DeleteUserDialog({ open, user, onClose, onConfirm }) {
    if (!user) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    backgroundColor: '#111827',
                    color: '#F8FAFC',
                    border: '1px solid #263244',
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <WarningAmberOutlined sx={{ color: '#F87171' }} />
                Eliminar usuario
            </DialogTitle>

            <DialogContent>
                <Typography color="#CBD5E1">
                    ¿Estás seguro de que deseas eliminar a{' '}
                    <strong>
                        {user.firstName} {user.lastName}
                    </strong>?
                </Typography>

                <Typography color="#94A3B8" variant="body2" mt={2}>
                    Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                >
                    Eliminar usuario
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteUserDialog;
