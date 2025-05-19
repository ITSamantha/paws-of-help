from typing import Optional

from pydantic import Field, EmailStr, validator, constr

from src.api.schemas.clinics import Clinic
from src.api.schemas.locations import City
from src.api.schemas.base import BaseSchemaModel, CharacteristicsSchemaModel
from src.core.database.models import models


class UserRole(CharacteristicsSchemaModel):
    pass


class User(BaseSchemaModel):
    id: int
    name: str
    email: EmailStr
    surname: str
    patronymic: Optional[str]
    city: City
    user_role: UserRole
    clinic: Optional[Clinic]


class UserCreate(BaseSchemaModel):
    email: str
    password: str = Field(..., min_length=8, max_length=50)
    name: constr(min_length=2, max_length=50)
    surname: constr(min_length=2, max_length=50)
    patronymic: Optional[constr(min_length=2, max_length=50)]
    user_role_id: int = Field(default=models.UserRole.USER)
    city_id: int



class UserLogin(BaseSchemaModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=50)


class UserOut(BaseSchemaModel):
    id: int
    email: str
    name: str

    class Config:
        from_attributes = True


class Token(BaseSchemaModel):
    access_token: str
    token_type: str
