from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.schemas.alert import EstadoEnvio  # mismos estados que las alertas

CanalReporte = Literal["telegram", "whatsapp"]


class ReportBase(BaseModel):
    #Campos que describen un reporte

    campaign_id: int = Field(..., description="ID de la campaña a reportar")
    period_start: date = Field(..., description="Inicio del período (YYYY-MM-DD)")
    period_end: date = Field(..., description="Fin del período (YYYY-MM-DD)")
    channel: CanalReporte = Field(..., description="Canal por el que se envía el reporte")

    @model_validator(mode="after")
    def check_period(self):
        #pydantic devuelve un error 422 si el período no tiene sentido
        if self.period_end < self.period_start:
            raise ValueError("period_end no puede ser anterior a period_start")
        return self


class ReportCreate(ReportBase):
    #Datos para generar un reporte, el usuario se toma del token

    pass


class ReportResponse(ReportBase):
    #Lo que devuelve la API, incluye datos generados por el servidor

    id_report: int
    created_at: datetime
    message_status: EstadoEnvio

    model_config = ConfigDict(from_attributes=True)
