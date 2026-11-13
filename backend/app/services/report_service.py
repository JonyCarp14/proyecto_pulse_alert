from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.report import Report
from app.repositories.campaign_repository import CampaignRepository
from app.repositories.report_repository import ReportRepository
from app.schemas.report import ReportCreate, ReportResponse
from app.services.report_pdf import build_report_pdf


class ReportService:
    # Lógica de negocio de reportes,usa repositorios para acceder a la bd

    def __init__(self, db: Session):
        self.repository = ReportRepository(db)
        self.campaign_repository = CampaignRepository(db)

    def list_reports(
        self, usuario_id: int, campaign_id: Optional[int] = None
    ) -> list[ReportResponse]:
        reports = self.repository.get_all_by_user(usuario_id, campaign_id)
        return [ReportResponse.model_validate(r) for r in reports]

    def get_report(self, id_report: int, usuario_id: int) -> ReportResponse:
        report = self._get_owned_report(id_report, usuario_id)
        return ReportResponse.model_validate(report)

    def create_report(self, data: ReportCreate, usuario_id: int) -> ReportResponse:
        # La campaña debe existir y pertenecer al usuario
        campaign = self.campaign_repository.get_by_id(data.campaign_id)
        if campaign is None or campaign.usuario_id != usuario_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Campaña no encontrada",
            )

        report = Report(**data.model_dump())

        # SIMULACIÓN: todavía no hay integración con Telegram/WhatsApp, así que no se
        # envía nada real. Se registra como "simulada" y no como "enviada".
        # TODO: reemplazar por el notificador de app/integrations cuando exista.
        report.message_status = "simulada"

        saved = self.repository.create(report)
        return ReportResponse.model_validate(saved)

    def generate_pdf(self, id_report: int, usuario_id: int) -> tuple[bytes, str]:
        # Devuelve el contenido del PDF y el nombre sugerido para el archivo
        report = self._get_owned_report(id_report, usuario_id)
        campaign = self.campaign_repository.get_by_id(report.campaign_id)
        alerts = self.repository.get_alerts_in_period(
            report.campaign_id, report.period_start, report.period_end
        )

        pdf_bytes = build_report_pdf(
            report=report,
            campaign=campaign,
            alerts=alerts,
            costo_por_resultado=self._cost_per_result(campaign.gasto, campaign.resultados),
        )
        return pdf_bytes, f"reporte_{report.id_report}.pdf"

    def _get_owned_report(self, id_report: int, usuario_id: int) -> Report:
        """Devuelve el reporte solo si existe y pertenece al usuario."""
        report = self.repository.get_by_id_for_user(id_report, usuario_id)

        # Mismo error si no existe o es ajeno: así no se revela que existe
        if report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Reporte no encontrado",
            )
        return report

    @staticmethod
    def _cost_per_result(gasto: float, resultados: int) -> Optional[float]:
        if not resultados:  # evita dividir por cero
            return None
        return round(gasto / resultados, 2)
