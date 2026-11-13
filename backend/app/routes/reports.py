
from typing import Optional

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.report import ReportCreate, ReportResponse
from app.security.dependencies import require_regular_user
from app.services.report_service import ReportService


router = APIRouter(prefix="/reports", tags=["Reportes"])


# Dependencia que proporciona el servicio de reportes
def get_report_service(
    db: Session = Depends(get_db)
) -> ReportService:
    return ReportService(db)


# Obtiene el ID del usuario autenticado.
# Solo permite usuarios normales (Free y Premium).
# Los administradores reciben un error 403.
def get_report_user_id(current_user: User = Depends(require_regular_user)) -> int:
    return current_user.id_user


# Listar los reportes del usuario autenticado
@router.get("/", response_model=list[ReportResponse])
def list_reports(campaign_id: Optional[int] = None,usuario_id: int = Depends(get_report_user_id),service: ReportService = Depends(get_report_service),):
    return service.list_reports(usuario_id, campaign_id)


# Consultar un reporte específico
@router.get("/{id_report}", response_model=ReportResponse)
def get_report(id_report: int, usuario_id: int = Depends(get_report_user_id),service: ReportService = Depends(get_report_service),):
    return service.get_report(id_report, usuario_id)


# Crear un reporte para una campaña propia
@router.post( "/",response_model=ReportResponse,status_code=status.HTTP_201_CREATED)
def create_report(data: ReportCreate,usuario_id: int = Depends(get_report_user_id),service: ReportService = Depends(get_report_service),):
    return service.create_report(data, usuario_id)


# Descargar un reporte en formato PDF
@router.get("/{id_report}/pdf")
def download_report_pdf(id_report: int, usuario_id: int = Depends(get_report_user_id), service: ReportService = Depends(get_report_service),):
    pdf_bytes, filename = service.generate_pdf(id_report, usuario_id)

    return Response(content=pdf_bytes,media_type="application/pdf",headers={"Content-Disposition": f'attachment; filename="{filename}"'},)
