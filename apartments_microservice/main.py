from typing import Annotated, List

from fastapi import FastAPI, Depends, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
import service
from db import create_db_and_tables, get_async_session
from schemas import *

app = FastAPI(docs_url="/api_apartments/docs", openapi_url="/api_apartments/openapi.json")


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()


@app.get('/api_apartments/apartments', response_model=List[ApartmentRead])
async def get_apartments(fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.get_apartments(s)


@app.post('/api_apartments/apartments', response_model=ApartmentRead)
async def post_apartments(apartment: ApartmentCreate, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.add_apartment(apartment, user, s)


@app.get('/api_apartments/apartments/{id}', response_model=ApartmentRead)
async def get_apartment(id: int, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.get_apartment(id, user, s)


@app.patch('/api_apartments/apartments', response_model=ApartmentRead)
async def patch_apartment(apartment: ApartmentUpdate, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.patch_apartment(apartment, user, s)


@app.delete('/api_apartments/apartments/{id}')
async def delete_apartment(id: int, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.delete_apartment(id, user, s)


@app.get('/api_apartments/free_apartments', response_model=List[ApartmentRead])
async def get_free_apartments(fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.get_free_apartments(s)


@app.get('/api_apartments/sold_apartments', response_model=List[ApartmentReadOwner])
async def get_sold_apartments(fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.get_sold_apartments(fastapiusersauth, s)


@app.post('/api_apartments/buy_apartment', response_model=ApartmentRead)
async def buy_apartment(apartment: ApartmentBuy, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.buy_apartment(apartment, user, s)


@app.post('/api_apartments/sell_apartment', response_model=ApartmentRead)
async def sell_apartment(apartment: ApartmentBuy, fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.sell_apartment(apartment, user, s)


@app.get('/api_apartments/my_apartments', response_model=List[ApartmentRead])
async def my_apartments(fastapiusersauth: Annotated[str | None, Cookie()] = None, s: AsyncSession = Depends(get_async_session)):
    user = service.get_user(fastapiusersauth)
    return await service.get_user_apartments(user, s)
