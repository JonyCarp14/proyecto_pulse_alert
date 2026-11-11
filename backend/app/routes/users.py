from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import list_users, get_user, modify_user, remove_user
from app.security.dependencies import require_admin


# Configuración de las rutas de usuarios
router = APIRouter(
    prefix="/users",
    tags=["Usuarios"]
)


# Obtener todos los usuarios registrados
# Solo puede acceder un administrador
@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """
    Devuelve una lista de todos los usuarios registrados.
    """

    return list_users(db)


# Buscar un usuario por su ID
# Solo puede acceder un administrador
@router.get("/{user_id}", response_model=UserResponse)
def get_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """
    Busca un usuario utilizando su identificador.
    """

    try:
        return get_user(db, user_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error)
        ) from error

# Modificar los datos de un usuario
# Solo puede acceder un administrador

@router.patch("/{user_id}", response_model=UserResponse)
def update_user_route(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """
    Permite modificar el nombre, apellido, rol o plan
    de un usuario existente.
    """

    try:
        return modify_user(
            db,
            user_id,
            **user_data.model_dump(exclude_unset=True)
        )

    except ValueError as error:
        if str(error) == "Usuario no encontrado":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(error)
            ) from error

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        ) from error


# Eliminar un usuario por su ID
# Solo puede acceder un administrador

@router.delete("/{user_id}")
def delete_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """
    Elimina un usuario registrado en PulseAlert.
    """

    try:
        return remove_user(db, user_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error)
        ) from error