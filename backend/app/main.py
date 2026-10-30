from fastapi import FastAPI

from app.core.database import engine
from app.models.base import Base
from app.models import User, Campaign, Alert

app = FastAPI(title="Pulse Alert API")


Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"mensaje": "Pulse Alert API funcionando"}