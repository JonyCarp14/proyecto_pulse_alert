from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class CampaignMetricsHistoryResponse(BaseModel):
    """
    Define las métricas históricas que
    devolvemos al frontend.
    """

    id_history: int
    campaign_id: int
    fecha: date
    clics: int
    impresiones: int
    gasto: Decimal
    resultados: int

    model_config = ConfigDict(from_attributes=True)


class CampaignMetricsHistoryCreate(BaseModel):
    """
    Define los datos necesarios para
    crear un registro histórico.
    """

    fecha: date
    clics: int = Field(ge=0)
    impresiones: int = Field(ge=0)
    gasto: Decimal = Field(ge=0, max_digits=12, decimal_places=2)
    resultados: int = Field(ge=0)