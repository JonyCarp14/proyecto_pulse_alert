from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import (
    get_user_by_id,
    get_all_users,
    update_user,
    delete_user
)


def get_user(db: Session, user_id: int):
    """
    Obtiene un usuario por su ID.
    """

    user = get_user_by_id(db, user_id)

    if user is None:
        raise ValueError("Usuario no encontrado")

    return user


def list_users(db: Session):
    """
    Obtiene todos los usuarios registrados.
    """

    return get_all_users(db)


def modify_user(
    db: Session,
    user_id: int,
    nombre: str | None = None,
    apellido: str | None = None,
    rol: str | None = None,
    plan: str | None = None
):
    """
    Modifica los datos de un usuario existente.
    """

    user = get_user(db, user_id)

    if nombre is not None:
        user.nombre = nombre

    if apellido is not None:
        user.apellido = apellido

    if rol is not None:
        if rol not in ("admin", "user"):
            raise ValueError("Rol inválido")
        user.rol = rol

    if plan is not None:
        if plan not in ("free", "premium"):
            raise ValueError("Plan inválido")
        user.plan = plan

    return update_user(db, user)


def remove_user(db: Session, user_id: int):
    """
    Elimina un usuario existente.
    """

    user = get_user(db, user_id)

    delete_user(db, user)

    return {"mensaje": "Usuario eliminado correctamente"}