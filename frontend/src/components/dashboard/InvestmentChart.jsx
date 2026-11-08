
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';

import { Box, Typography } from '@mui/material';
import { investmentByPlatform } from '../../data/dashboardData';

const COLORS = ['#2563EB', '#22D3EE', '#F59E0B'];

function InvestmentChart() {
    return (
        <Box
            sx={{
                backgroundColor: '#111827',
                border: '1px solid #263244',
                borderRadius: 3,
                p: 3,
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" fontWeight="bold" color="#F8FAFC">
                Inversión por plataforma
            </Typography>

            <Typography variant="body2" color="#94A3B8" sx={{ mb: 2 }}>
                Distribución de la inversión publicitaria.
            </Typography>

            <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={investmentByPlatform}
                            dataKey="investment"
                            nameKey="platform"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                            label
                        >
                            {investmentByPlatform.map((entry, index) => (
                                <Cell
                                    key={entry.platform}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) =>
                                `$${Number(value).toLocaleString('es-AR')}`
                            }
                            contentStyle={{
                                backgroundColor: '#111827',
                                border: '1px solid #263244',
                                borderRadius: 8,
                                color: '#F8FAFC',
                            }}
                        />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}

export default InvestmentChart;
