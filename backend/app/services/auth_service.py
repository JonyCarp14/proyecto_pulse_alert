from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.repositories.user_repository import get_user_by_email, create_user
from app.security.password import hash_password, verify_password


def register_user(db: Session, user_data: UserCreate):
    # Verificamos si ya existe un usuario con ese email.
    existing_user = get_user_by_email(db, user_data.email)

    if existing_user:
        raise ValueError("El email ya está registrado")

    # Convertimos la contraseña original en un hash seguro.
    hashed_password = hash_password(user_data.password)

    # Creamos el objeto usuario que se guardará en PostgreSQL.
    new_user = User(
        nombre=user_data.nombre,
        apellido=user_data.apellido,
        email=user_data.email,
        password_hash=hashed_password
    )

    # Guardamos el usuario utilizando el repositorio.
    return create_user(db, new_user)

def login_user(db: Session, email: str, password: str):
    # Buscamos al usuario por su email.
    user = get_user_by_email(db, email)

    # Verificamos que el usuario exista.
    if not user:
        raise ValueError("Credenciales inválidas")

    # Verificamos que la contraseña coincida con el hash.
    if not verify_password(password, user.password_hash):
        raise ValueError("Credenciales inválidas")

    # Si todo es correcto, devolvemos el usuario.
    return user