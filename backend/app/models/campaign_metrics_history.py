
from datetime import date
from decimal import Decimal

from sqlalchemy import Date, ForeignKey, Integer, Numeric, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class CampaignMetricsHistory(Base):
    __tablename__ = "campaign_metrics_history"

    __table_args__ = (
        UniqueConstraint(
            "campaign_id",
            "fecha",
            name="uq_campaign_metrics_date"
        ),
    )

    id_history: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    campaign_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("campaigns.id_campaign", ondelete="CASCADE"),
        nullable=False
    )

    fecha: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    clics: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )

    impresiones: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )

    gasto: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0
    )

    resultados: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )
