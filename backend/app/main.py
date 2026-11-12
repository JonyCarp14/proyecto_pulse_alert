from fastapi import FastAPI

from app.core.database import engine
from app.models.base import Base
from app.models import User, Campaign, Alert
from app.models.report import Report

# Tus rutas
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router

# Rutas de Jony
from app.routes.campaigns import router as campaigns_router
from app.routes.alerts import router as alerts_router
from app.routes.reports import router as reports_router


app = FastAPI(title="Pulse Alert API")

# Autenticación y administración
app.include_router(auth_router)
app.include_router(users_router)

# Campañas, alertas y reportes
app.include_router(campaigns_router)
app.include_router(alerts_router)
app.include_router(reports_router)


Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"mensaje": "Pulse Alert API funcionando"}