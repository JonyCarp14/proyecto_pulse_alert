from sqlalchemy import Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

from app.models.base import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id_campaign: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    usuario_id: Mapped[int] = mapped_column( Integer,ForeignKey("usuarios.id_user"),nullable=False)
    meta_campaign_id: Mapped[str] = mapped_column(String(100), nullable=True)
    cuenta_publicitaria: Mapped[str | None] = mapped_column(String(100), nullable=True)
    resultados: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    fecha_actualizacion: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
        )
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    presupuesto: Mapped[float] = mapped_column(Float, nullable=False)
    gasto: Mapped[float] = mapped_column(Float, default=0, nullable=False)
    impresiones: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    clics: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    estado: Mapped[str] = mapped_column(String(20), default="activa", nullable=False)
