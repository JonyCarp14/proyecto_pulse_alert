from pydantic import BaseModel, ConfigDict, Field
from typing import Literal


class UserCreate(BaseModel):
    """
    Datos necesarios para registrar un usuario.
    """
    nombre: str
    apellido: str
    email: str
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    """
    Datos necesarios para iniciar sesión.
    """
    email: str
    password: str


class UserResponse(BaseModel):
    """
    Datos del usuario que devuelve la API.
    No incluye la contraseña.
    """
    model_config = ConfigDict(from_attributes=True)

    id_user: int
    nombre: str
    apellido: str
    email: str
    rol: str
    plan: str

class UserUpdate(BaseModel):
    """
    Datos que el administrador puede modificar.
    """

    nombre: str | None = None
    apellido: str | None = None
    rol: Literal["admin", "user"] | None = None
    plan: Literal["free", "premium"] | None = None 