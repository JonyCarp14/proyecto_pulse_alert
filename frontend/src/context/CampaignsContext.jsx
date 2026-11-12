
import { createContext, useContext, useState } from 'react';
import { campaigns as initialCampaigns } from '../data/dashboardData';
const CampaignsContext = createContext(null);
export function CampaignsProvider({ children }) {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const addCampaign = (campaignData) => {
        setCampaigns(previousCampaigns => {
            const nextId = previousCampaigns.reduce(
                (maxId, campaign) => Math.max(maxId, campaign.id),
                0
            ) + 1;
            const newCampaign = {
                id: nextId,
                name: campaignData.name,
                platform: campaignData.platform,
                budget: Number(campaignData.budget),
                investment: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                status: 'active',
            };
            return [...previousCampaigns, newCampaign];
        });
    };
    const updateCampaign = (campaignId, updatedData) => {
        setCampaigns(previousCampaigns =>
            previousCampaigns.map(campaign =>
                campaign.id === campaignId
                    ? {
                        ...campaign,
                        ...updatedData,
                        id: campaign.id,
                        budget: updatedData.budget !== undefined
                            ? Number(updatedData.budget)
                            : campaign.budget,
                    }
                    : campaign
            )
        );
    };
    const deleteCampaign = (campaignId) => {
        setCampaigns(previousCampaigns =>
            previousCampaigns.filter(campaign => campaign.id !== campaignId)
        );
    };
    const updateCampaignStatus = (campaignId, status) => {
        setCampaigns(previousCampaigns =>
            previousCampaigns.map(campaign =>
                campaign.id === campaignId
                    ? { ...campaign, status }
                    : campaign
            )
        );
    };
    const updateCampaignInvestment = (campaignId, investment) => {
        setCampaigns(previousCampaigns =>
            previousCampaigns.map(campaign =>
                campaign.id === campaignId
                    ? { ...campaign, investment }
                    : campaign
            )
        );
    };
    return (
        <CampaignsContext.Provider
            value={{
                campaigns,
                addCampaign,
                updateCampaign,
                deleteCampaign,
                updateCampaignStatus,
                updateCampaignInvestment,
            }}
        >
            {children}
        </CampaignsContext.Provider>
    );
}
export function useCampaigns() {
    const context = useContext(CampaignsContext);
    if (!context) {
        throw new Error(
            'useCampaigns debe utilizarse dentro de CampaignsProvider'
        );
    }
    return context;
}


