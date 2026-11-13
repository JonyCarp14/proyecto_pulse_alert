
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
} from '@mui/material';
function CampaignDialog({ open, onClose, onSave, campaign = null }) {
    const [formData, setFormData] = useState({
        name: '',
        platform: 'Meta Ads',
        budget: '',
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (open) {
            setFormData({
                name: campaign?.name || '',
                platform: campaign?.platform || 'Meta Ads',
                budget: campaign?.budget ?? '',
            });
            setErrors({});
        }
    }, [open, campaign]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(previous => ({
            ...previous,
            [name]: value,
        }));
        setErrors(previous => ({
            ...previous,
            [name]: '',
        }));
    };
    const handleSubmit = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Ingresá el nombre de la campaña';
        }
        if (!formData.budget || Number(formData.budget) <= 0) {
            newErrors.budget = 'Ingresá un presupuesto mayor a cero';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSave({
            name: formData.name.trim(),
            platform: formData.platform,
            budget: Number(formData.budget),
        });
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {campaign ? 'Editar campaña' : 'Nueva campaña'}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ mt: 1 }}>
                    <TextField
                        label="Nombre de la campaña"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        select
                        label="Plataforma publicitaria"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="Meta Ads">Meta Ads</MenuItem>
                        <MenuItem value="Google Ads">Google Ads</MenuItem>
                        <MenuItem value="TikTok Ads">TikTok Ads</MenuItem>
                    </TextField>
                    <TextField
                        label="Presupuesto"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleChange}
                        fullWidth
                        required
                        slotProps={{
                            htmlInput: { min: 1 },
                        }}
                        error={Boolean(errors.budget)}
                        helperText={errors.budget}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    {campaign ? 'Guardar cambios' : 'Crear campaña'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default CampaignDialog;
