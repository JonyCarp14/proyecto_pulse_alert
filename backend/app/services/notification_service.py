
import os

import httpx
from dotenv import load_dotenv

load_dotenv()


def send_telegram_notification(message: str) -> bool:
    """
    Envía una notificación mediante Telegram.

    Devuelve True si Telegram confirma el envío.
    Devuelve False si falta configuración o falla el envío.
    """

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")

    # Todavía no tenemos un bot configurado.
    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"

    try:
        response = httpx.post(
            url,
            json={
                "chat_id": chat_id,
                "text": message,
            },
            timeout=10.0,
        )
        response.raise_for_status()
        return response.json().get("ok") is True

    except (httpx.HTTPError, ValueError):
        return False
