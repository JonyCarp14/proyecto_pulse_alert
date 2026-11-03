from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.campaign import CampaignCreate, CampaignResponse, CampaignUpdate


class CampaignService:

    def __init__(self, db: Session):
        self.repository = CampaignRepository(db)

    # Métodos públicos

    def list_campaigns(self, usuario_id: int) -> list[CampaignResponse]:
        campaigns = self.repository.get_all_by_user(usuario_id)
        return [self._to_response(c) for c in campaigns]

    def get_campaign(self, id_campaign: int, usuario_id: int) -> CampaignResponse:
        campaign = self._get_owned_campaign(id_campaign, usuario_id)
        return self._to_response(campaign)

    def create_campaign(self, data: CampaignCreate, usuario_id: int) -> CampaignResponse:
        # El usuario sale del token, nunca del body de la petición
        campaign = Campaign(**data.model_dump(), usuario_id=usuario_id)
        saved = self.repository.create(campaign)
        return self._to_response(saved)

    def update_campaign(
        self, id_campaign: int, data: CampaignUpdate, usuario_id: int
    ) -> CampaignResponse:
        campaign = self._get_owned_campaign(id_campaign, usuario_id)

        # exclude_unset=True: solo se modifican los campos que el cliente envió
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(campaign, field, value)

        updated = self.repository.update(campaign)
        return self._to_response(updated)

    def delete_campaign(self, id_campaign: int, usuario_id: int) -> None:
        campaign = self._get_owned_campaign(id_campaign, usuario_id)
        self.repository.delete(campaign)

    # Métodos privados

    def _get_owned_campaign(self, id_campaign: int, usuario_id: int) -> Campaign:
        """Devuelve la campaña solo si existe y pertenece al usuario."""
        campaign = self.repository.get_by_id(id_campaign)

        # Mismo error si no existe o es ajena: así no se revela que existe
        if campaign is None or campaign.usuario_id != usuario_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Campaña no encontrada",
            )
        return campaign

    def _to_response(self, campaign: Campaign) -> CampaignResponse:
        response = CampaignResponse.model_validate(campaign)
        response.costo_por_resultado = self._calculate_cost_per_result(
            campaign.gasto, campaign.resultados
        )
        return response

    @staticmethod
    def _calculate_cost_per_result(gasto: float, resultados: int) -> Optional[float]:
        if not resultados:  # evitamos dividir por cero
            return None
        return round(gasto / resultados, 2)
