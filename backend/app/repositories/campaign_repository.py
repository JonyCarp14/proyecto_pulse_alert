from typing import Optional

from sqlalchemy.orm import Session

from app.models.campaign import Campaign


class CampaignRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all_by_user(self, usuario_id: int) -> list[Campaign]:
        return (
            self.db.query(Campaign)
            .filter(Campaign.usuario_id == usuario_id)
            .all()
        )

    def get_by_id(self, id_campaign: int) -> Optional[Campaign]:
        return (
            self.db.query(Campaign)
            .filter(Campaign.id_campaign == id_campaign)
            .first()
        )

    def create(self, campaign: Campaign) -> Campaign:
        self.db.add(campaign)
        self.db.commit()
        self.db.refresh(campaign)  # carga el id y la fecha generados por la BD
        return campaign

    def update(self, campaign: Campaign) -> Campaign:
        # El objeto ya fue modificado en el servicio; aquí solo se guardan los cambios
        self.db.commit()
        self.db.refresh(campaign)
        return campaign

    def delete(self, campaign: Campaign) -> None:
        self.db.delete(campaign)
        self.db.commit()
