import uuid
from typing import Optional
from pydantic import BaseModel


class ApartmentRead(BaseModel):
    id: int
    address: str
    area: float
    rooms_count: int
    price: str
    owner_id: Optional[uuid.UUID]


class ApartmentReadOwner(ApartmentRead):
    owner: dict


class ApartmentCreate(BaseModel):
    address: str
    area: float
    rooms_count: int
    price: str


class ApartmentUpdate(BaseModel):
    id: int
    address: str
    area: float
    rooms_count: int
    price: str


class ApartmentBuy(BaseModel):
    id: int
