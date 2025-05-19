from pydantic import Field, EmailStr, validator, constr, HttpUrl, field_validator

from src.api.schemas import City
from src.api.schemas.base import BaseSchemaModel


class Clinic(BaseSchemaModel):
    id: int
    title: str
    email: EmailStr
    address: str
    phone: str
    url: HttpUrl
    city: City
    is_verified: bool


class CreateClinic(BaseSchemaModel):
    title: constr(min_length=3, max_length=100)
    email: str
    address: constr(min_length=5, max_length=200)
    phone: str
    url: str
    city_id: int
    is_verified: bool = Field(default=False)
