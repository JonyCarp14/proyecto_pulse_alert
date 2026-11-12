from datetime import datetime
from typing import Literal, Optional

from app.models import campaign
from pydantic import BaseModel, ConfigDict, Field

EstadoCampana = Literal["activa", "pausada", "finalizada"]


class CampaignBase(BaseModel):
    """Campos comunes que el cliente puede enviar al crear una campaña."""

    meta_campaign_id: Optional[str] = Field(None, max_length=100, description="ID de la campaña en Meta (si corresponde)")
    nombre: str = Field(..., max_length=150, description="Nombre de la campaña")
    cuenta_publicitaria: Optional[str] = Field(None, max_length=100, description="Cuenta publicitaria asociada" )
    presupuesto: float = Field(..., ge=0, description="Presupuesto asignado a la campaña")
    gasto: float = Field(0, ge=0, description="Gasto acumulado en la campaña")
    impresiones: int = Field(0, ge=0, description="Número total de impresiones")
    clics: int = Field(0, ge=0, description="Número total de clics")
    resultados: int = Field(0, ge=0, description="Cantidad de resultados obtenidos")
    estado: EstadoCampana = Field("activa", description="Estado actual de la campaña")


class CampaignCreate(CampaignBase):
    """Datos para crear una campaña. El usuario se toma del token, no del body."""

    pass


class CampaignUpdate(BaseModel):
    """Actualización parcial: todos los campos son opcionales."""

    nombre: Optional[str] = Field(None, max_length=150)
    cuenta_publicitaria: Optional[str] = Field(None, max_length=100)
    presupuesto: Optional[float] = Field(None, ge=0)
    gasto: Optional[float] = Field(None, ge=0)
    impresiones: Optional[int] = Field(None, ge=0)
    clics: Optional[int] = Field(None, ge=0)
    resultados: Optional[int] = Field(None, ge=0)
    estado: Optional[EstadoCampana] = None


class CampaignResponse(CampaignBase):
    id_campaign: int
    usuario_id: int
    costo_por_resultado: Optional[float] = None
    fecha_actualizacion: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)
