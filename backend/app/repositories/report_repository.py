from datetime import date, datetime, time, timedelta, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.campaign import Campaign
from app.models.report import Report


class ReportRepository:
    # Acceso a datos de reportes

    def __init__(self, db: Session):
        self.db = db

    def get_all_by_user(
        self, usuario_id: int, campaign_id: Optional[int] = None
    ) -> list[Report]:
        # Reportes de las campañas del usuario, del más reciente al más antiguo
        # El JOIN con Campaign garantiza que solo se vean reportes de campañas propias
        query = (
            self.db.query(Report)
            .join(Campaign, Report.campaign_id == Campaign.id_campaign)
            .filter(Campaign.usuario_id == usuario_id)
        )
        if campaign_id is not None:
            query = query.filter(Report.campaign_id == campaign_id)

        return query.order_by(Report.created_at.desc()).all()

    def get_by_id_for_user(self, id_report: int, usuario_id: int) -> Optional[Report]:
        """Devuelve el reporte solo si pertenece a una campaña del usuario."""
        return (
            self.db.query(Report)
            .join(Campaign, Report.campaign_id == Campaign.id_campaign)
            .filter(Report.id_report == id_report, Campaign.usuario_id == usuario_id)
            .first()
        )

    def create(self, report: Report) -> Report:
        self.db.add(report)
        self.db.commit()
        self.db.refresh(report)
        return report

    def get_alerts_in_period(
        self, campaign_id: int, period_start: date, period_end: date
    ) -> list[Alert]:
        """Alertas de una campaña generadas entre dos fechas (ambas incluidas, en UTC)."""
        start = datetime.combine(period_start, time.min, tzinfo=timezone.utc)
        # Se usa "menor que el día siguiente" para incluir todo el último día
        end = datetime.combine(period_end + timedelta(days=1), time.min, tzinfo=timezone.utc)

        return (
            self.db.query(Alert)
            .filter(
                Alert.campaign_id == campaign_id,
                Alert.fecha >= start,
                Alert.fecha < end,
            )
            .order_by(Alert.fecha.desc())
            .all()
        )
