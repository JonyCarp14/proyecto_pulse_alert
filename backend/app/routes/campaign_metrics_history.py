from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.security.dependencies import require_regular_user

from app.schemas.campaign_metrics_history import (
    CampaignMetricsHistoryResponse
)

from app.services.campaign_metrics_history_service import (
    CampaignMetricsHistoryService
)


router = APIRouter(
    prefix="/campaigns",
    tags=["Campaign Metrics History"]
)


@router.get(
    "/{campaign_id}/history",
    response_model=list[CampaignMetricsHistoryResponse]
)
def get_campaign_history(
    campaign_id: int,
    days: int = Query(default=7, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_regular_user)
):
    """
    Obtiene las métricas históricas de una campaña.

    Verifica que el usuario autenticado sea propietario
    de la campaña antes de devolver los datos.
    """

    service = CampaignMetricsHistoryService(db)

    return service.get_campaign_history(
        campaign_id=campaign_id,
        usuario_id=current_user.id_user,
        days=days
    )