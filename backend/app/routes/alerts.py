
from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.alert import AlertCreate, AlertResponse
from app.security.dependencies import require_regular_user
from app.services.alert_service import AlertService


router = APIRouter(prefix="/alerts", tags=["Alertas"])


# Dependencia que proporciona el servicio de alertas
def get_alert_service(
    db: Session = Depends(get_db)
) -> AlertService:
    return AlertService(db)


# Obtiene el ID del usuario autenticado.
# Solo permite usuarios normales (Free y Premium).
# Los administradores reciben un error 403.
def get_alert_user_id(
    current_user: User = Depends(require_regular_user)
) -> int:
    return current_user.id_user


# Listar las alertas del usuario autenticado
@router.get("/", response_model=list[AlertResponse])
def list_alerts(
    campaign_id: Optional[int] = None,
    leida: Optional[bool] = None,
    usuario_id: int = Depends(get_alert_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.list_alerts(usuario_id, campaign_id, leida)


# Consultar una alerta específica
@router.get("/{id_alert}", response_model=AlertResponse)
def get_alert(
    id_alert: int,
    usuario_id: int = Depends(get_alert_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.get_alert(id_alert, usuario_id)


# Marcar una alerta como leída
@router.patch("/{id_alert}/read", response_model=AlertResponse)
def mark_alert_as_read(
    id_alert: int,
    usuario_id: int = Depends(get_alert_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.mark_as_read(id_alert, usuario_id)


# TEMPORAL: este endpoint permite crear alertas desde Swagger.
# Más adelante, las alertas serán generadas automáticamente
# cuando el sistema detecte problemas en las campañas.
@router.post(
    "/",
    response_model=AlertResponse,
    status_code=status.HTTP_201_CREATED
)
def create_alert(
    data: AlertCreate,
    usuario_id: int = Depends(get_alert_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.create_alert(data, usuario_id)
