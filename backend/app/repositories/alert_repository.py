from typing import Optional

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.campaign import Campaign

#Acceso a datos de alertas, solo consultas, sin lógica de negocio.
class AlertRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all_by_user(
        self,
        usuario_id: int,
        campaign_id: Optional[int] = None,
        leida: Optional[bool] = None,
    ) -> list[Alert]:
        """Alertas de las campañas del usuario, de la más reciente a la más antigua."""
        # El JOIN con Campaign garantiza que solo se vean alertas de campañas propias
        query = (
            self.db.query(Alert)
            .join(Campaign, Alert.campaign_id == Campaign.id_campaign)
            .filter(Campaign.usuario_id == usuario_id)
        )

        if campaign_id is not None:
            query = query.filter(Alert.campaign_id == campaign_id)
        if leida is not None:
            query = query.filter(Alert.leida == leida)

        return query.order_by(Alert.fecha.desc()).all()

    def get_by_id_for_user(self, id_alert: int, usuario_id: int) -> Optional[Alert]:
        """Devuelve la alerta solo si pertenece a una campaña del usuario."""
        return (
            self.db.query(Alert)
            .join(Campaign, Alert.campaign_id == Campaign.id_campaign)
            .filter(Alert.id_alert == id_alert, Campaign.usuario_id == usuario_id)
            .first()
        )

    def create(self, alert: Alert) -> Alert:
        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)
        return alert

    def update(self, alert: Alert) -> Alert:
        # El objeto ya fue modificado en el servicio; aquí solo se guardan los cambios
        self.db.commit()
        self.db.refresh(alert)
        return alert
