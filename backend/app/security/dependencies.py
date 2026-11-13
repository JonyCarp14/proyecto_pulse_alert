from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.repositories.user_repository import get_user_by_id
from app.security.jwt import verify_access_token

# Dependencias de seguridad para proteger las rutas de la API.
# get_current_user: valida el JWT e identifica al usuario autenticado.
# require_admin: verifica que el usuario tenga permisos de administrador.

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:

    # Verificamos el token JWT
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )

    # Obtenemos el ID del usuario desde el token
    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token sin identificador de usuario"
        )

    # Comprobamos que el ID tenga un formato válido
    try:
        user_id = int(user_id)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identificador de usuario inválido"
        ) from None

    # Buscamos al usuario en PostgreSQL
    user = get_user_by_id(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado"
        )

    return user

def require_admin(
    current_user: User = Depends(get_current_user)
) -> User:

    """
    Verifica que el usuario autenticado sea administrador.
    """

    if current_user.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador"
        )

    return current_user

def require_regular_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Permite acceder a usuarios con rol 'user'.
    Incluye planes Free y Premium.
    """

    if current_user.rol != "user":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para acceder a esta función"
        )

    return current_user