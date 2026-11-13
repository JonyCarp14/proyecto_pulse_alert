from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.models.base import Base
from app.models import User, Campaign, Alert
from app.models.report import Report

# Mis rutas
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes import campaign_metrics_history

# Rutas de Jony
from app.routes.campaigns import router as campaigns_router
from app.routes.alerts import router as alerts_router
from app.routes.reports import router as reports_router



app = FastAPI(title="Pulse Alert API")

# Permitir la comunicación entre React y FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Autenticación y administración
app.include_router(auth_router)
app.include_router(users_router)

# Campañas, alertas y reportes
app.include_router(campaigns_router)
app.include_router(alerts_router)
app.include_router(reports_router)
app.include_router(campaign_metrics_history.router)


Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"mensaje": "Pulse Alert API funcionando"}