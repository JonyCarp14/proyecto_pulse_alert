import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { useAuth } from './AuthContext';

const CampaignsContext = createContext(null);

const statusToBackend = {
    active: 'activa',
    paused: 'pausada',
    finished: 'finalizada',
};

const statusToFrontend = {
    activa: 'active',
    pausada: 'paused',
    finalizada: 'finished',
};

const mapCampaign = (campaign) => ({
    id: campaign.id_campaign,
    name: campaign.nombre,
    platform: campaign.cuenta_publicitaria || 'Meta Ads',
    budget: Number(campaign.presupuesto || 0),
    investment: Number(campaign.gasto || 0),
    impressions: Number(campaign.impresiones || 0),
    clicks: Number(campaign.clics || 0),
    conversions: Number(campaign.resultados || 0),
    status: statusToFrontend[campaign.estado] || campaign.estado,
    costPerResult: campaign.costo_por_resultado,
    updatedAt: campaign.fecha_actualizacion,
});

const mapCampaignData = (data) => {
    const payload = {};

    if (data.name !== undefined) payload.nombre = data.name;
    if (data.platform !== undefined) payload.cuenta_publicitaria = data.platform;
    if (data.budget !== undefined) payload.presupuesto = Number(data.budget);
    if (data.investment !== undefined) payload.gasto = Number(data.investment);
    if (data.impressions !== undefined) payload.impresiones = Number(data.impressions);
    if (data.clicks !== undefined) payload.clics = Number(data.clicks);
    if (data.conversions !== undefined) payload.resultados = Number(data.conversions);

    if (data.status !== undefined) {
        const backendStatus = statusToBackend[data.status];

        if (!backendStatus) {
            throw new Error(`Estado de campaña no válido: ${data.status}`);
        }

        payload.estado = backendStatus;
    }

    return payload;
};

export function CampaignsProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id_user ?? user?.id;

    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const loadCampaigns = async () => {
            if (!userId) {
                setCampaigns([]);
                setError('');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await apiRequest('/campaigns/');
                if (!cancelled) {
                    setCampaigns(response.map(mapCampaign));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    console.error('Error al cargar campañas:', err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadCampaigns();

        return () => {
            cancelled = true;
        };
    }, [userId]);

    const addCampaign = async (campaignData) => {
        const response = await apiRequest('/campaigns/', {
            method: 'POST',
            body: JSON.stringify({
                nombre: campaignData.name,
                cuenta_publicitaria: campaignData.platform,
                presupuesto: Number(campaignData.budget),
            }),
        });

        const newCampaign = mapCampaign(response);
        setCampaigns(previous => [...previous, newCampaign]);

        return newCampaign;
    };

    const updateCampaign = async (campaignId, updatedData) => {
        const response = await apiRequest(`/campaigns/${campaignId}`, {
            method: 'PATCH',
            body: JSON.stringify(mapCampaignData(updatedData)),
        });

        const updatedCampaign = mapCampaign(response);

        setCampaigns(previous =>
            previous.map(campaign =>
                campaign.id === campaignId ? updatedCampaign : campaign
            )
        );

        return updatedCampaign;
    };

    const deleteCampaign = async (campaignId) => {
        await apiRequest(`/campaigns/${campaignId}`, {
            method: 'DELETE',
        });

        setCampaigns(previous =>
            previous.filter(campaign => campaign.id !== campaignId)
        );
    };

    const updateCampaignStatus = async (campaignId, status) => {
        return updateCampaign(campaignId, { status });
    };

    const updateCampaignInvestment = async (campaignId, investment) => {
        return updateCampaign(campaignId, { investment });
    };

    return (
        <CampaignsContext.Provider
            value={{
                campaigns,
                loading,
                error,
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



