from http import HTTPStatus

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from src.api import schemas
from src.config.base import config
from src.core.database.models import models
from src.core.database.models.models import User
from src.api.schemas import UserCreate, Token, UserOut, UserLogin
from passlib.hash import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta

from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=config.api.token_expire_time)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.api.key, algorithm=config.api.algorithm)


@router.post("/register", response_model=schemas.UserOut)
async def register(user: schemas.UserCreate):
    try:
        model = models.User

        db_user: model = await SqlAlchemyRepository(db_manager.get_session,
                                                    model=model).get_single(email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = bcrypt.hash(user.password)
        user.password = hashed_password

        user_data = user.model_dump()

        new_user: model = await SqlAlchemyRepository(db_manager.get_session, model=model).create(user_data)
        return new_user
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserLogin):
    try:
        model = models.User
        db_user: model = await SqlAlchemyRepository(db_manager.get_session,
                                                    model=model).get_single(email=user.email)
        if not db_user or not bcrypt.verify(user.password, db_user.password):
            raise HTTPException(status_code=400, detail="Invalid credentials")

        token = await create_access_token({"sub": db_user.email})
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get("/me", response_model=schemas.User)
async def get_me(token: str = Depends(oauth2_scheme)):
    try:
        model = models.User
        payload = jwt.decode(token, config.api.key, algorithms=[config.api.algorithm])
        email = payload.get("sub")
        user: model = await SqlAlchemyRepository(db_manager.get_session,
                                                 model=model).get_single(email=email)
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

