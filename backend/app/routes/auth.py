from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth_service import register_user, login_user


router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"]
)

@router.post("/register",response_model=UserResponse,status_code=status.HTTP_201_CREATED)
def register( user_data: UserCreate,db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario en PulseAlert.
    """

    try:
        return register_user(db, user_data)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        ) from error


@router.post("/login")
def login(
    user_data: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Autentica al usuario y devuelve un token JWT.
    """

    try:
        return login_user(
            db,
            user_data.email,
            user_data.password
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"}
        ) from error