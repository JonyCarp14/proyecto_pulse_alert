from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.campaign import CampaignCreate, CampaignResponse, CampaignUpdate
from app.services.campaign_service import CampaignService

router = APIRouter(prefix="/campaigns", tags=["Campañas"])


def get_current_user_id() -> int:
    """TEMPORAL: devuelve un usuario fijo hasta que esté lista la autenticación.

    Cuando exista el módulo de seguridad, esta función debe leer el token JWT
    y devolver el id del usuario autenticado.
    """
    return 1


def get_campaign_service(db: Session = Depends(get_db)) -> CampaignService:
    return CampaignService(db)


@router.get("/", response_model=list[CampaignResponse])
def list_campaigns(
    usuario_id: int = Depends(get_current_user_id),
    service: CampaignService = Depends(get_campaign_service),
):
    return service.list_campaigns(usuario_id)


@router.get("/{id_campaign}", response_model=CampaignResponse)
def get_campaign(
    id_campaign: int,
    usuario_id: int = Depends(get_current_user_id),
    service: CampaignService = Depends(get_campaign_service),
):
    return service.get_campaign(id_campaign, usuario_id)


@router.post("/", response_model=CampaignResponse, status_code=status.HTTP_201_CREATED)
def create_campaign(
    data: CampaignCreate,
    usuario_id: int = Depends(get_current_user_id),
    service: CampaignService = Depends(get_campaign_service),
):
    return service.create_campaign(data, usuario_id)


@router.patch("/{id_campaign}", response_model=CampaignResponse)
def update_campaign(
    id_campaign: int,
    data: CampaignUpdate,
    usuario_id: int = Depends(get_current_user_id),
    service: CampaignService = Depends(get_campaign_service),
):
    return service.update_campaign(id_campaign, data, usuario_id)


@router.delete("/{id_campaign}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign(
    id_campaign: int,
    usuario_id: int = Depends(get_current_user_id),
    service: CampaignService = Depends(get_campaign_service),
):
    service.delete_campaign(id_campaign, usuario_id)
