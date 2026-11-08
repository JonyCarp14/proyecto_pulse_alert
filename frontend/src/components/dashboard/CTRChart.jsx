
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

import { Box, Typography } from '@mui/material';
import { ctrByPlatform } from '../../data/dashboardData';

function CTRChart() {
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
                CTR por plataforma
            </Typography>

            <Typography variant="body2" color="#94A3B8" sx={{ mb: 2 }}>
                Porcentaje de clics respecto de las impresiones.
            </Typography>

            <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={ctrByPlatform}
                        margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid stroke="#263244" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="platform"
                            stroke="#94A3B8"
                            tick={{ fill: '#94A3B8', fontSize: 11 }}
                        />

                        <YAxis
                            stroke="#94A3B8"
                            tick={{ fill: '#94A3B8', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />

                        <Tooltip
                            formatter={(value) => [`${value}%`, 'CTR']}
                            contentStyle={{
                                backgroundColor: '#111827',
                                border: '1px solid #263244',
                                borderRadius: 8,
                                color: '#F8FAFC',
                            }}
                        />

                        <Bar
                            dataKey="ctr"
                            name="CTR"
                            fill="#22D3EE"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}

export default CTRChart;
