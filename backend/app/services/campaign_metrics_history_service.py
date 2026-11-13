from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.campaign_repository import CampaignRepository
from app.repositories.campaign_metrics_history_repository import (
    CampaignMetricsHistoryRepository
)


class CampaignMetricsHistoryService:

    def __init__(self, db: Session):
        self.db = db
        self.history_repository = CampaignMetricsHistoryRepository(db)
        self.campaign_repository = CampaignRepository(db)

    def get_campaign_history(
        self,
        campaign_id: int,
        usuario_id: int,
        days: int = 7
    ):
        """
        Obtiene el historial de métricas de una campaña
        verificando que pertenezca al usuario autenticado.
        """

        # 1. Buscar la campaña
        campaign = self.campaign_repository.get_by_id(campaign_id)

        # 2. Comprobar que exista y pertenezca al usuario
        if campaign is None or campaign.usuario_id != usuario_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Campaña no encontrada"
            )

        # 3. Validar el rango de días solicitado
        if days < 1 or days > 365:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El rango debe estar entre 1 y 365 días"
            )

        # 4. Obtener las métricas históricas
        return self.history_repository.get_last_days(
            campaign_id=campaign_id,
            days=days
        )