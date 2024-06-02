import uuid
from typing import Optional

from fastapi_users import schemas
from pydantic import BaseModel, ConfigDict


class RoleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    alias: str
    name: str


class UserRead(schemas.BaseUser[uuid.UUID]):
    model_config = ConfigDict(from_attributes=True)
    first_name: str
    last_name: str
    passport_number: str
    passport_info: str
    phone_number: str
    role: RoleRead


class UserCreate(schemas.BaseUserCreate):
    first_name: str
    last_name: str
    passport_number: str
    passport_info: str
    phone_number: str


class UserUpdate(schemas.BaseUserUpdate):
    first_name: str
    last_name: str
    passport_number: str
    passport_info: str
    phone_number: str


class UserRoleUpdate(schemas.BaseUserUpdate):
    role_id: int
    is_superuser: bool
