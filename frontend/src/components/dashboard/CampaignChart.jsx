import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { useCampaigns } from '../../context/CampaignsContext';
function CampaignChart() {
    const { campaigns } = useCampaigns();
    return (
        <Box sx={{ backgroundColor: '#111827', border: '1px solid #263244', borderRadius: 3, p: 3, width: '100%', minWidth: 0 }}>
            <Typography variant="h6" fontWeight="bold" color="#F8FAFC">
                Rendimiento de campañas
            </Typography>
            <Typography variant="body2" color="#94A3B8" sx={{ mb: 3 }}>
                Comparación de impresiones y clics por campaña.
            </Typography>
            <Box sx={{ width: '100%', height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={campaigns} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid stroke="#263244" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            stroke="#94A3B8"
                            tick={{ fill: '#94A3B8', fontSize: 11 }}
                            angle={-15}
                            textAnchor="end"
                            height={65}
                        />
                        <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111827',
                                border: '1px solid #263244',
                                borderRadius: 8,
                                color: '#F8FAFC',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="impressions"
                            name="Impresiones"
                            stroke="#2563EB"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="clicks"
                            name="Clics"
                            stroke="#22D3EE"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
export default CampaignChart;


