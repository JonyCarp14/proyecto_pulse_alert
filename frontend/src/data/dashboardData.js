export const campaigns = [
    {
        id: 1,
        name: 'Campaña Verano 2026',
        platform: 'Meta Ads',
        budget: 50000,
        investment: 32500,
        impressions: 15000,
        clicks: 850,
        conversions: 120,
        status: 'active',
    },
    {
        id: 2,
        name: 'Promoción Especial',
        platform: 'Google Ads',
        budget: 40000,
        investment: 38000,
        impressions: 22000,
        clicks: 1100,
        conversions: 95,
        status: 'active',
    },
    {
        id: 3,
        name: 'Lanzamiento Producto',
        platform: 'TikTok Ads',
        budget: 30000,
        investment: 18500,
        impressions: 18000,
        clicks: 1250,
        conversions: 160,
        status: 'active',
    },
    {
        id: 4,
        name: 'Campaña Institucional',
        platform: 'Meta Ads',
        budget: 25000,
        investment: 12000,
        impressions: 9000,
        clicks: 400,
        conversions: 45,
        status: 'paused',
    },
];
export const dailyMetrics = [
    { day: 'Lun', impressions: 4500, clicks: 210 },
    { day: 'Mar', impressions: 5200, clicks: 260 },
    { day: 'Mié', impressions: 4800, clicks: 235 },
    { day: 'Jue', impressions: 6100, clicks: 320 },
    { day: 'Vie', impressions: 7200, clicks: 380 },
    { day: 'Sáb', impressions: 6800, clicks: 350 },
    { day: 'Dom', impressions: 8500, clicks: 430 },
];
export const alerts = [
    {
        id: 1,
        title: 'Presupuesto próximo al límite',
        campaign: 'Promoción Especial',
        severity: 'critical',
        date: '2026-11-07',
    },
    {
        id: 2,
        title: 'Disminución de clics',
        campaign: 'Campaña Institucional',
        severity: 'medium',
        date: '2026-11-07',
    },
    {
        id: 3,
        title: 'Aumento de conversiones',
        campaign: 'Lanzamiento Producto',
        severity: 'info',
        date: '2026-11-06',
    },
];
export const dashboardStats = {
    activeCampaigns: campaigns.filter(campaign => campaign.status === 'active').length,
    criticalAlerts: alerts.filter(alert => alert.severity === 'critical').length,
    totalInvestment: campaigns.reduce((total, campaign) => total + campaign.investment, 0),
    totalImpressions: campaigns.reduce((total, campaign) => total + campaign.impressions, 0),
    totalClicks: campaigns.reduce((total, campaign) => total + campaign.clicks, 0),
    totalConversions: campaigns.reduce((total, campaign) => total + campaign.conversions, 0),
};
dashboardStats.ctr = dashboardStats.totalImpressions > 0
    ? (dashboardStats.totalClicks / dashboardStats.totalImpressions) * 100
    : 0;
export const investmentByPlatform = Object.values(
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

export const ctrByPlatform = Object.values(
    campaigns.reduce((result, campaign) => {
        if (!result[campaign.platform]) {
            result[campaign.platform] = {
                platform: campaign.platform,
                impressions: 0,
                clicks: 0,
            };
        }

        result[campaign.platform].impressions += campaign.impressions;
        result[campaign.platform].clicks += campaign.clicks;

        return result;
    }, {})
).map(platform => ({
    ...platform,
    ctr: platform.impressions > 0
        ? Number(((platform.clicks / platform.impressions) * 100).toFixed(2))
        : 0,
}));