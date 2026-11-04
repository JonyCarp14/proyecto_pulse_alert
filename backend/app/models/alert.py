from sqlalchemy import Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, timezone

from app.models.base import Base


class Alert(Base):
    __tablename__ = "alerts"

    id_alert: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    campaign_id: Mapped[int] = mapped_column( Integer,ForeignKey("campaigns.id_campaign"),nullable=False)
    tipo: Mapped[str] = mapped_column(String(50), nullable=False)
    mensaje: Mapped[str] = mapped_column(String(255), nullable=False)
    fecha: Mapped[datetime] = mapped_column(DateTime(timezone=True),default=lambda: datetime.now(timezone.utc))
    leida: Mapped[bool] = mapped_column(Boolean, default=False)
    metrica: Mapped[str] = mapped_column(String(50), nullable=False)
    valor_detectado: Mapped[float] = mapped_column(Float, nullable=False)
    limite: Mapped[float] = mapped_column(Float, nullable=False)
    estado_envio: Mapped[str] = mapped_column(String(20), default="pendiente", nullable=False)
    regla_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
