
from fastapi import FastAPI
from app.core.database import engine
from app.models.base import Base
from app.models import User, Campaign, Alert
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router

app = FastAPI(title="PulseAlert API")

app.include_router(auth_router)
app.include_router(users_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def inicio():
    return {"mensaje": "PulseAlert API funcionando"}

