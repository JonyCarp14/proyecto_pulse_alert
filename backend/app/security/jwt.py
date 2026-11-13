
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.core.config import settings



#Genera el token cuando el usuario inicia sesion

def create_access_token(data: dict):
    # Copiamos los datos que queremos incluir en el token.
    to_encode = data.copy()

    # Calculamos la fecha de vencimiento.
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Agregamos la fecha de expiración.
    to_encode.update({"exp": expire})

    # Generamos el token JWT.
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return encoded_jwt


#Comprueba que el token sea válido y no haya expirado

def verify_access_token(token: str):
    try:
        # Decodificamos y verificamos el token.
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        return payload

    except JWTError:
        return None
