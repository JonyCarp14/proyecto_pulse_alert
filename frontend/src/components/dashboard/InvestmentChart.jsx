import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector,
    Tooltip,
    Legend,
} from 'recharts';

import { Box, Typography } from '@mui/material';
import { useCampaigns } from '../../context/CampaignsContext';

const COLORS = ['#2563EB', '#22D3EE', '#F59E0B'];
const CustomPieShape = (props) => (
    <Sector
        {...props}
        fill={COLORS[props.index % COLORS.length]}
    />
);

function InvestmentChart() {
    const { campaigns } = useCampaigns();

    // Agrupar la inversión según la plataforma
    const investmentByPlatform = Object.values(
        campaigns.reduce((result, campaign) => {
            if (!result[campaign.platform]) {
                result[campaign.platform] = {
                    platform: campaign.platform,
                    investment: 0,
                };
            }

            result[campaign.platform].investment += campaign.investment;

            return result;
        }, {})
    );

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
                            cy="55%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                            label
                            shape={CustomPieShape}
                        />

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

                        <Legend
                            content={() => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                        mt: 2,
                                    }}
                                >
                                    {investmentByPlatform.map((entry, index) => (
                                        <Box
                                            key={entry.platform}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.7,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '2px',
                                                    backgroundColor: COLORS[index % COLORS.length],
                                                }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                {entry.platform}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}

export default InvestmentChart;

