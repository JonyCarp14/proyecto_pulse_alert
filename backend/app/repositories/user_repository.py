
from sqlalchemy.orm import Session

# Importamos el modelo User, que representa la tabla usuarios
from app.models.user import User


def get_user_by_email(db: Session, email: str):
    """
    Busca un usuario en la base de datos utilizando su email.

    db: sesión de conexión con PostgreSQL.
    email: correo electrónico que queremos buscar.

    Devuelve el usuario encontrado o None si no existe.
    """

    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: User):
    """
    Guarda un nuevo usuario en la base de datos.

    db: sesión de conexión.
    user: objeto User que queremos guardar.

    Primero agrega el objeto a la sesión,
    después confirma la operación en PostgreSQL.
    """

    db.add(user)       # Agrega el usuario a la sesión.
    db.commit()        # Confirma y guarda los cambios.
    db.refresh(user)   # Actualiza el objeto con los datos generados por la BD.

    return user
