from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.routes.campaigns import get_current_user_id  # TEMPORAL: mover a app/security
from app.schemas.alert import AlertCreate, AlertResponse
from app.services.alert_service import AlertService

router = APIRouter(prefix="/alerts", tags=["Alertas"])


def get_alert_service(db: Session = Depends(get_db)) -> AlertService:
    return AlertService(db)


@router.get("/", response_model=list[AlertResponse])
def list_alerts(
    campaign_id: Optional[int] = None,  # filtro opcional: /alerts/?campaign_id=3
    leida: Optional[bool] = None,  # filtro opcional: /alerts/?leida=false
    usuario_id: int = Depends(get_current_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.list_alerts(usuario_id, campaign_id, leida)


@router.get("/{id_alert}", response_model=AlertResponse)
def get_alert(
    id_alert: int,
    usuario_id: int = Depends(get_current_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.get_alert(id_alert, usuario_id)


@router.patch("/{id_alert}/read", response_model=AlertResponse)
def mark_alert_as_read(
    id_alert: int,
    usuario_id: int = Depends(get_current_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.mark_as_read(id_alert, usuario_id)


# TEMPORAL: solo para probar en Swagger. Las alertas las debe generar el sistema
# al evaluar las reglas, no los usuarios. Eliminar este endpoint cuando exista esa lógica.
@router.post("/", response_model=AlertResponse, status_code=status.HTTP_201_CREATED)
def create_alert(
    data: AlertCreate,
    usuario_id: int = Depends(get_current_user_id),
    service: AlertService = Depends(get_alert_service),
):
    return service.create_alert(data, usuario_id)
