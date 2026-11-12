from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.repositories.alert_repository import AlertRepository
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.alert import AlertCreate, AlertResponse

#Lógica de negocio de alertas.Usa repositorios para acceder a la BD
class AlertService:

    def __init__(self, db: Session):
        self.repository = AlertRepository(db)
        self.campaign_repository = CampaignRepository(db)

    def list_alerts(
        self,
        usuario_id: int,
        campaign_id: Optional[int] = None,
        leida: Optional[bool] = None,
    ) -> list[AlertResponse]:
        alerts = self.repository.get_all_by_user(usuario_id, campaign_id, leida)
        return [AlertResponse.model_validate(a) for a in alerts]

    def get_alert(self, id_alert: int, usuario_id: int) -> AlertResponse:
        alert = self._get_owned_alert(id_alert, usuario_id)
        return AlertResponse.model_validate(alert)

    def create_alert(self, data: AlertCreate, usuario_id: int) -> AlertResponse:
        """Crea una alerta. Más adelante lo llamará el servicio que evalúa las reglas."""
        # La campaña debe existir y pertenecer al usuario
        campaign = self.campaign_repository.get_by_id(data.campaign_id)
        if campaign is None or campaign.usuario_id != usuario_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Campaña no encontrada",
            )

        alert = Alert(**data.model_dump())
        saved = self.repository.create(alert)
        return AlertResponse.model_validate(saved)

    def mark_as_read(self, id_alert: int, usuario_id: int) -> AlertResponse:
        alert = self._get_owned_alert(id_alert, usuario_id)
        alert.leida = True
        updated = self.repository.update(alert)
        return AlertResponse.model_validate(updated)

    def _get_owned_alert(self, id_alert: int, usuario_id: int) -> Alert:
        """Devuelve la alerta solo si existe y pertenece al usuario."""
        alert = self.repository.get_by_id_for_user(id_alert, usuario_id)

        # Mismo error si no existe o es ajena: así no se revela que existe
        if alert is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Alerta no encontrada",
            )
        return alert
