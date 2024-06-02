from sqlalchemy import Column, Integer, String, Float, UUID
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    ...


class Apartment(Base):
    __tablename__ = 'apartments'

    id = Column(Integer, primary_key=True)
    address = Column(String, nullable=False)
    area = Column(Float, nullable=False)
    rooms_count = Column(Integer, nullable=False)
    price = Column(String, nullable=False)
    owner_id = Column(UUID(as_uuid=True), nullable=True)
