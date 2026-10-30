import os
from pathlib import Path
from dotenv import load_dotenv


# Buscamos el archivo .env en la raíz del proyecto
BASE_DIR = Path(__file__).resolve().parents[3]
load_dotenv(BASE_DIR / ".env")


class Settings:
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: int = int(os.getenv("DB_PORT", "5433"))
    DB_USER: str = os.getenv("DB_USER", "")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    DB_NAME: str = os.getenv("DB_NAME", "")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")


settings = Settings()