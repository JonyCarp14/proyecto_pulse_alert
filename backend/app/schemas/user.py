from pydantic import BaseModel, ConfigDict, Field


class UserCreate(BaseModel):
    nombre: str
    apellido: str
    email: str
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_user: int
    nombre: str
    apellido: str
    email: str
    rol: str