
const alertConfigurations = {
    budget: {
        title: 'Presupuesto crítico o excedido',
        description: 'La inversión de la campaña alcanzó o superó el presupuesto establecido.',
        severity: 'critical',
    },
    down: {
        title: 'Campaña caída',
        description: 'Se detectó una interrupción inesperada en la campaña.',
        severity: 'critical',
    },
    paused: {
        title: 'Campaña pausada',
        description: 'La campaña cambió su estado a pausada.',
        severity: 'medium',
    },
    performance: {
        title: 'Caída del rendimiento',
        description: 'Se detectó una disminución importante en los clics o conversiones.',
        severity: 'medium',
    },
};

export function generateAlert(campaign, eventType) {
    const configuration = alertConfigurations[eventType];

    if (!configuration) {
        throw new Error(`Tipo de evento desconocido: ${eventType}`);
    }

    return {
        ...configuration,
        campaign: campaign.name,
        campaignId: campaign.id,
        eventType,
    };
}
