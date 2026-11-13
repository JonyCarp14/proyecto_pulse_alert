from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field

# Métricas que una alerta puede controlar
MetricaAlerta = Literal[
    "gasto",
    "impresiones",
    "clics",
    "resultados",
    "costo_por_resultado",
    "estado",
]

# Estado del envío de la notificación (distinto de generar la alerta)
EstadoEnvio = Literal["pendiente", "simulada", "enviada", "fallida"]

class AlertBase(BaseModel):

    campaign_id: int = Field(..., description="ID de la campaña que originó la alerta")
    regla_id: Optional[int] = Field(None, description="ID de la regla que la originó")
    tipo: str = Field(..., max_length=50, description="Tipo de alerta, ej: limite_superado")
    mensaje: str = Field(..., max_length=255, description="Mensaje descriptivo de la alerta")
    metrica: MetricaAlerta = Field(..., description="Métrica evaluada")
    valor_detectado: float = Field(..., description="Valor que se detectó de la métrica")
    limite: float = Field(..., description="Límite configurado en la regla")


class AlertCreate(AlertBase):
    pass


#Lo que devuelve la API
class AlertResponse(AlertBase):

    id_alert: int
    fecha: datetime
    leida: bool
    estado_envio: EstadoEnvio

    model_config = ConfigDict(from_attributes=True)
