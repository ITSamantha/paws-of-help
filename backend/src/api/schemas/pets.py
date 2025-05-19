import datetime
from typing import List, Optional
from datetime import date, timedelta
from sqlalchemy import select
from fastapi import HTTPException

from pydantic import Field, validator, EmailStr, constr, field_validator

from src.api.schemas.clinics import Clinic
from src.api.schemas.users import User
from src.api.schemas.base import CharacteristicsSchemaModel, BaseSchemaModel
from src.core.database.models import models
from src.core.database.session_manager import db_manager


class BloodComponent(CharacteristicsSchemaModel):
    pass


class BloodRhesus(CharacteristicsSchemaModel):
    pass


class BloodGroup(CharacteristicsSchemaModel):
    pass


class BreedType(CharacteristicsSchemaModel):
    pet_type: "PetType"


class PetType(CharacteristicsSchemaModel):
    pass


class Pet(BaseSchemaModel):
    id: int
    name: str
    age: int
    weight: float
    pet_type: PetType
    breed_type: BreedType
    user: User
    blood_group: BloodGroup
    blood_rhesus: BloodRhesus

    created_at: datetime.datetime
    deleted_at: Optional[datetime.datetime]


class CreatePet(BaseSchemaModel):
    name: str = Field(..., min_length=1, max_length=50)
    age: int = Field(..., ge=0, le=30)
    weight: float = Field(..., gt=0, le=200)
    pet_type_id: int
    breed_type_id: int
    user_id: int
    blood_group_id: int
    blood_rhesus_id: int

    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty or just whitespace')
        return v.strip()


class PetTypeBloodGroup(BaseSchemaModel):
    pet_type: PetType
    blood_group: BloodGroup
    id: int


class Recipient(BaseSchemaModel):
    id: int
    reason: str
    blood_component: BloodComponent

    pet: Pet

    due_date: datetime.date
    created_at: datetime.datetime
    deleted_at: Optional[datetime.datetime]
    donor_amount: int
    clinic: Clinic


class CreateRecipient(BaseSchemaModel):
    reason: str = Field(..., min_length=10, max_length=1000)
    blood_component_id: int
    pet_id: int
    clinic_id: int
    donor_amount: int = Field(..., ge=1, le=10)
    due_date: datetime.date




class DonorStatus(CharacteristicsSchemaModel):
    pass


class Donor(BaseSchemaModel):
    id: int

    pet: Pet
    recipient: Recipient

    created_at: datetime.datetime
    deleted_at: Optional[datetime.datetime]

    donor_status: DonorStatus

    donation_date: datetime.datetime


class CreateDonor(BaseSchemaModel):
    pet_id: int
    recipient_id: int
    donor_status_id: int = Field(default=models.DonorStatus.CREATED)
    donation_date: datetime.datetime

    @field_validator('donation_date')
    def validate_donation_date(cls, v):
        if v.replace(tzinfo=datetime.timezone.utc) < datetime.datetime.now(datetime.timezone.utc):
            raise ValueError('Donation date cannot be in the past')
        return v


class UpdateDonor(BaseSchemaModel):
    donor_status_id: int
