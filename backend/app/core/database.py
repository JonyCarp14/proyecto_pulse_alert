
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


# Construir la URL de conexión
DATABASE_URL = URL.create(
    drivername="postgresql+psycopg",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD,
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    database=settings.DB_NAME
)

# Crear el motor de conexión
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Crear el generador de sesiones
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


# Dependencia para utilizar la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
