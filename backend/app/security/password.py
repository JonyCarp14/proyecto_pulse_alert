
from pwdlib import PasswordHash

# Creamos el objeto encargado de gestionar los hashes.
password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    """
    Recibe una contraseña original y genera un hash seguro.
    Este hash será almacenado en PostgreSQL.
    """
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Comprueba si la contraseña ingresada coincide
    con el hash almacenado en la base de datos.
    """
    return password_hash.verify(password, hashed_password)
