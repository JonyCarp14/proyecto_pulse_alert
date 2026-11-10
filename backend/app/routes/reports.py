from typing import Optional

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.routes.campaigns import get_current_user_id  # TEMPORAL: mover a app/security
from app.schemas.report import ReportCreate, ReportResponse
from app.services.report_service import ReportService

router = APIRouter(prefix="/reports", tags=["Reportes"])


def get_report_service(db: Session = Depends(get_db)) -> ReportService:
    return ReportService(db)


@router.get("/", response_model=list[ReportResponse])
def list_reports(
    campaign_id: Optional[int] = None,  # filtro opcional: /reports/?campaign_id=3
    usuario_id: int = Depends(get_current_user_id),
    service: ReportService = Depends(get_report_service),
):
    return service.list_reports(usuario_id, campaign_id)


@router.get("/{id_report}", response_model=ReportResponse)
def get_report(
    id_report: int,
    usuario_id: int = Depends(get_current_user_id),
    service: ReportService = Depends(get_report_service),
):
    return service.get_report(id_report, usuario_id)


@router.post("/", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def create_report(
    data: ReportCreate,
    usuario_id: int = Depends(get_current_user_id),
    service: ReportService = Depends(get_report_service),
):
    return service.create_report(data, usuario_id)


@router.get("/{id_report}/pdf")
def download_report_pdf(
    id_report: int,
    usuario_id: int = Depends(get_current_user_id),
    service: ReportService = Depends(get_report_service),
):
    pdf_bytes, filename = service.generate_pdf(id_report, usuario_id)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        # "attachment" hace que el navegador lo descargue en vez de mostrarlo
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
