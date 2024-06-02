from fastapi import FastAPI
from user_manager import auth_backend, fastapi_users
import schemas

app = FastAPI(docs_url="/api_users/docs", openapi_url="/api_users/openapi.json")


app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/api_users/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(schemas.UserRead, schemas.UserCreate),
    prefix="/api_users/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/api_users/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(schemas.UserRead),
    prefix="/api_users/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(schemas.UserRead, schemas.UserUpdate),
    prefix="/api_users/users",
    tags=["users"],
)
