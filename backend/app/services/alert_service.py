
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.repositories.alert_repository import AlertRepository
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.alert import AlertCreate, AlertResponse
from app.services.notification_service import send_telegram_notification


# Lógica de negocio de alertas.
# Utiliza repositorios para acceder a PostgreSQL.
class AlertService:

    def __init__(self, db: Session):
        self.repository = AlertRepository(db)
        self.campaign_repository = CampaignRepository(db)

    # Obtener las alertas de un usuario.
    def list_alerts(
        self,
        usuario_id: int,
        campaign_id: Optional[int] = None,
        leida: Optional[bool] = None,
    ) -> list[AlertResponse]:

        alerts = self.repository.get_all_by_user(
            usuario_id, campaign_id, leida
        )

        return [AlertResponse.model_validate(a) for a in alerts]

    # Obtener una alerta específica.
    def get_alert(
        self,
        id_alert: int,
        usuario_id: int
    ) -> AlertResponse:

        alert = self._get_owned_alert(id_alert, usuario_id)

        return AlertResponse.model_validate(alert)

    # Crear una alerta y enviar una notificación por Telegram.
    def create_alert(
        self,
        data: AlertCreate,
        usuario_id: int
    ) -> AlertResponse:

        # Verificamos que la campaña exista y pertenezca al usuario.
        campaign = self.campaign_repository.get_by_id(
            data.campaign_id
        )

        if campaign is None or campaign.usuario_id != usuario_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Campaña no encontrada",
            )

        # Creamos la alerta y la guardamos en PostgreSQL.
        alert = Alert(**data.model_dump())

        saved = self.repository.create(alert)

        # Construimos el mensaje para Telegram.
        message = (
            "🚨 ALERTA DE PULSEALERT\n\n"
            f"Campaña: {campaign.nombre}\n"
            f"Tipo: {saved.tipo}\n"
            f"Métrica: {saved.metrica}\n"
            f"Valor detectado: {saved.valor_detectado}\n"
            f"Límite: {saved.limite}\n\n"
            f"Mensaje: {saved.mensaje}"
        )

        # Intentamos enviar la notificación a Telegram.
        telegram_sent = send_telegram_notification(message)

        # Actualizamos el estado del envío.
        if telegram_sent:
            saved.estado_envio = "enviada"
        else:
            saved.estado_envio = "pendiente"

            print(
                "Telegram: notificación no enviada "
                "o pendiente de configuración."
            )

        # Guardamos el estado actualizado en PostgreSQL.
        saved = self.repository.update(saved)

        # Devolvemos la alerta creada.
        return AlertResponse.model_validate(saved)

    # Marcar una alerta como leída.
    def mark_as_read(
        self,
        id_alert: int,
        usuario_id: int
    ) -> AlertResponse:

        alert = self._get_owned_alert(id_alert, usuario_id)

        alert.leida = True

        updated = self.repository.update(alert)

        return AlertResponse.model_validate(updated)

    # Verificar que la alerta pertenezca al usuario.
    def _get_owned_alert(
        self,
        id_alert: int,
        usuario_id: int
    ) -> Alert:

        alert = self.repository.get_by_id_for_user(
            id_alert, usuario_id
        )

        # No revelamos si una alerta ajena existe.
        if alert is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Alerta no encontrada",
            )

        return alert
