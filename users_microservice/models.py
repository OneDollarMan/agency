from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, relationship
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTableUUID


class Base(DeclarativeBase):
    ...


class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    alias = Column(String, nullable=False)
    name = Column(String, nullable=False)

    users = relationship('User', back_populates='role', lazy='selectin')


class User(SQLAlchemyBaseUserTableUUID, Base):
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    passport_number = Column(String, nullable=False)
    passport_info = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey('roles.id'))

    role = relationship('Role', back_populates='users', lazy='joined')
