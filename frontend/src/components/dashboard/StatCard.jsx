
import { Card, CardContent, Typography, Box } from '@mui/material';

function StatCard({ title, value, subtitle, icon, color }) {
    return (
        <Card
            sx={{
                backgroundColor: '#111827',
                border: '1px solid #263244',
                borderRadius: 3,
                height: '100%',
            }}
        >
            <CardContent
                sx={{
                    backgroundColor: '#111827',
                    border: '1px solid #263244',
                    borderRadius: 3,
                    width: '100%',
                    minWidth: 0,
                    height: 180,
                    boxSizing: 'border-box',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="#94A3B8" variant="body2">
                        {title}
                    </Typography>

                    <Box sx={{ color, display: 'flex', alignItems: 'center' }}>
                        {icon}
                    </Box>
                </Box>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="#F8FAFC"
                    sx={{ mt: 2 }}
                >
                    {value}
                </Typography>

                <Typography
                    variant="caption"
                    color="#94A3B8"
                    sx={{ display: 'block', mt: 1 }}
                >
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default StatCard;
