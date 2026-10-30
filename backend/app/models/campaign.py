from sqlalchemy import Integer, String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id_campaign: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    usuario_id: Mapped[int] = mapped_column( Integer,ForeignKey("usuarios.id_user"),nullable=False)
    meta_campaign_id: Mapped[str] = mapped_column(String(100), nullable=False)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    presupuesto: Mapped[float] = mapped_column(Float, nullable=False)
    gasto: Mapped[float] = mapped_column(Float, default=0)
    impresiones: Mapped[int] = mapped_column(Integer, default=0)
    clics: Mapped[int] = mapped_column(Integer, default=0)
    estado: Mapped[str] = mapped_column(String(20), default="activa")