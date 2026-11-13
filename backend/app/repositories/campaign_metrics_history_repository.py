from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.campaign_metrics_history import CampaignMetricsHistory


class CampaignMetricsHistoryRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_last_days(
        self,
        campaign_id: int,
        days: int = 7
    ):
        """
        Obtiene las métricas diarias de una campaña
        durante los últimos N días.
        """

        today = date.today()
        start_date = today - timedelta(days=days - 1)

        return (
            self.db.query(CampaignMetricsHistory)
            .filter(
                CampaignMetricsHistory.campaign_id == campaign_id,
                CampaignMetricsHistory.fecha >= start_date,
                CampaignMetricsHistory.fecha <= today
            )
            .order_by(CampaignMetricsHistory.fecha.asc())
            .all()
        )

    def create(self, history: CampaignMetricsHistory):
        """
        Guarda un registro diario de métricas.
        """

        self.db.add(history)
        self.db.commit()
        self.db.refresh(history)

        return history