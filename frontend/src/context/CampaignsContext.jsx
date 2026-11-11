
import { createContext, useContext, useState } from 'react';
import { campaigns as initialCampaigns } from '../data/dashboardData';

const CampaignsContext = createContext(null);

export function CampaignsProvider({ children }) {
    const [campaigns, setCampaigns] = useState(initialCampaigns);

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

