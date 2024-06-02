import logging

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import Apartment
from schemas import *
import requests

users_url = 'http://ag-users:8000/api_users'


def get_user(token):
    user = requests.get(f'{users_url}/users/me', cookies={'fastapiusersauth': token})
    if user.status_code != 200:
        raise HTTPException(status_code=400, detail="Access denied")
    return user.json()


def get_apartment_owner(token, id):
    user = requests.get(f'{users_url}/users/{id}', cookies={'fastapiusersauth': token})
    if user.status_code != 200:
        return {}
        #raise HTTPException(status_code=400, detail="Access denied")
    return user.json()


async def is_user_admin(user: dict):
    role = user.get('role')
    if role is None:
        raise HTTPException(status_code=400, detail="No role")
    if role.get('alias') != 'admin':
        return False
    return True


async def get_apartments(s: AsyncSession):
    res = []
    apartments = await s.execute(select(Apartment))
    for apartment in apartments:
        res.append(apartment[0])
    return res


async def get_free_apartments(s: AsyncSession):
    res = []
    apartments = await s.execute(select(Apartment).where(Apartment.owner_id == None))
    for apartment in apartments:
        res.append(apartment[0])
    return res


async def get_sold_apartments(token, s):
    res = []
    apartments = await s.execute(select(Apartment).where(Apartment.owner_id != None))
    for apartment in apartments:
        apartment = apartment[0]
        apartment.owner = get_apartment_owner(token, apartment.owner_id)
        res.append(apartment)
    return res


async def add_apartment(apartment: ApartmentCreate, user: dict, s: AsyncSession):
    if not is_user_admin(user):
        raise HTTPException(status_code=400, detail="Access denied")
    a = Apartment(address=apartment.address, area=apartment.area, rooms_count=apartment.rooms_count, price=apartment.price)
    s.add(a)
    await s.commit()
    await s.refresh(a)
    return a


async def get_apartment(id: int, user, s: AsyncSession):
    a = await s.get(Apartment, id)
    if a is None:
        raise HTTPException(status_code=404, detail="Not found")
    return a


async def patch_apartment(apartment: ApartmentUpdate, user, s: AsyncSession):
    a = await s.get(Apartment, apartment.id)
    if a is None:
        raise HTTPException(status_code=404, detail="Not found")

    if not is_user_admin(user) and str(a.owner_id) != user.get('id'):
        raise HTTPException(status_code=400, detail="Access denied")

    a.address = apartment.address
    a.area = apartment.area
    a.rooms_count = apartment.rooms_count
    a.price = apartment.price
    s.add(a)
    await s.commit()
    await s.refresh(a)
    return a


async def delete_apartment(id: int, user, s: AsyncSession):
    if not is_user_admin(user):
        raise HTTPException(status_code=400, detail="Access denied")

    a = await s.get(Apartment, id)
    if a is None:
        raise HTTPException(status_code=404, detail="Not found")
    if a.owner_id is not None:
        raise HTTPException(status_code=404, detail="Sell apartment first!")

    await s.delete(a)
    await s.commit()
    return True


async def buy_apartment(apartment: ApartmentBuy, user, s: AsyncSession):
    a = await s.get(Apartment, apartment.id)
    if a is None:
        raise HTTPException(status_code=404, detail="Not found")
    a.owner_id = user.get('id')
    s.add(a)
    await s.commit()
    await s.refresh(a)
    return a


async def sell_apartment(apartment: ApartmentBuy, user, s: AsyncSession):
    a = await s.get(Apartment, apartment.id)
    if a is None:
        raise HTTPException(status_code=404, detail="Not found")
    logging.warning(a.owner_id != user.get('id'))
    if str(a.owner_id) != user.get('id'):
        raise HTTPException(status_code=400, detail="Access denied")

    a.owner_id = None
    s.add(a)
    await s.commit()
    await s.refresh(a)
    return a


async def get_user_apartments(user, s: AsyncSession):
    apartments = await s.execute(select(Apartment).where(Apartment.owner_id == user.get('id')))
    res = []
    for apartment in apartments:
        res.append(apartment[0])
    return res
