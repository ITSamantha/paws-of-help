from datetime import datetime, date
from typing import List

from sqlalchemy import Integer, String, ForeignKey, Index, Float, Text, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.core.database.models.base import BaseDatabaseModel

"""CHARACTERISTICS"""


class PetType(BaseDatabaseModel):
    """ Тип животного."""

    __tablename__ = "pet_types"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)

    breeds: Mapped[List["BreedType"]] = relationship(uselist=True, lazy="selectin", back_populates="pet_type")


class BreedType(BaseDatabaseModel):
    """ Порода животного."""

    __tablename__ = "breed_types"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)

    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_types.id"), nullable=False)
    pet_type: Mapped["PetType"] = relationship(uselist=False, lazy="selectin", back_populates="breeds")


class BloodRhesus(BaseDatabaseModel):
    """ Резус крови DEA."""

    __tablename__ = "blood_rhesuses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class BloodGroup(BaseDatabaseModel):
    """Группа крови."""

    __tablename__ = "blood_groups"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class PetTypeBloodGroup(BaseDatabaseModel):
    """ Соотношение типа животного и группы крови."""

    __tablename__ = "pet_types__blood_groups"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)

    blood_group_id: Mapped[int] = mapped_column(ForeignKey("blood_groups.id"), index=True, nullable=False)
    blood_group: Mapped["BloodGroup"] = relationship(uselist=False, lazy="selectin")

    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_types.id"), nullable=False)
    pet_type: Mapped["PetType"] = relationship(uselist=False, lazy="selectin")

    __table_args__ = (
        Index(
            'blood_group_id_pet_type_id_unique_idx',
            'blood_group_id',
            'pet_type_id',
            postgresql_using='btree',
            unique=True
        ),
    )


class BloodComponent(BaseDatabaseModel):
    """Компонент крови для сдачи."""

    __tablename__ = "blood_components"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class Region(BaseDatabaseModel):
    """ Регион."""

    __tablename__ = "regions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class City(BaseDatabaseModel):
    """ Город."""

    __tablename__ = "cities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)

    region_id: Mapped[int] = mapped_column(ForeignKey("regions.id"), nullable=False)
    region: Mapped["Region"] = relationship(uselist=False, lazy="selectin")


"""PET"""


class Pet(BaseDatabaseModel):
    __tablename__ = "pets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(String(128), index=True, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    weight: Mapped[int] = mapped_column(Float, nullable=False)

    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_types.id"), nullable=False)
    pet_type: Mapped["PetType"] = relationship(uselist=False, lazy="selectin")

    breed_type_id: Mapped[int] = mapped_column(ForeignKey("breed_types.id"), nullable=False)
    breed_type: Mapped["BreedType"] = relationship(uselist=False, lazy="selectin")

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped["User"] = relationship(uselist=False, lazy="selectin")

    blood_group_id: Mapped[int] = mapped_column(ForeignKey("blood_groups.id"), nullable=False)
    blood_group: Mapped["BloodGroup"] = relationship(uselist=False, lazy="selectin")

    blood_rhesus_id: Mapped[int] = mapped_column(ForeignKey("blood_rhesuses.id"), nullable=False)
    blood_rhesus: Mapped["BloodRhesus"] = relationship(uselist=False, lazy="selectin")

    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.now(),
                                                 insert_default=datetime.now())

    deleted_at: Mapped[datetime] = mapped_column(nullable=True, default=None,
                                                 insert_default=None)

    __table_args__ = (
        Index(
            'pet_user_name_unique_idx',
            'user_id',
            'name',
            postgresql_using='btree',
            unique=True
        ),
    )


class Vaccination(BaseDatabaseModel):
    """Прививки."""
    __tablename__ = "vaccinations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class UserRole(BaseDatabaseModel):
    __tablename__ = "user_roles"

    ADMIN = 1
    USER = 2

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class User(BaseDatabaseModel):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)

    name: Mapped[str] = mapped_column(String(128), nullable=False)
    surname: Mapped[str] = mapped_column(String(128), nullable=False)
    patronymic: Mapped[str] = mapped_column(String(128), nullable=True)

    email: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    password: Mapped[str] = mapped_column(String(128), index=True, nullable=False)

    user_role_id: Mapped[int] = mapped_column(ForeignKey("user_roles.id"), nullable=False)
    user_role: Mapped["UserRole"] = relationship(uselist=False, lazy="selectin")

    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id"), nullable=False)
    city: Mapped["City"] = relationship(uselist=False, lazy="selectin")

    clinic_id: Mapped[int] = mapped_column(ForeignKey("clinics.id"), nullable=True)
    clinic: Mapped["Clinic"] = relationship(uselist=False, lazy="selectin")


class Clinic(BaseDatabaseModel):
    __tablename__ = "clinics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), index=True, nullable=False)

    city_id: Mapped[int] = mapped_column(ForeignKey("cities.id"), nullable=False)
    city: Mapped["City"] = relationship(uselist=False, lazy="selectin")

    address: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[str] = mapped_column(String(128), index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), index=True, nullable=False)

    url: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.now(),
                                                 insert_default=datetime.now())

    deleted_at: Mapped[datetime] = mapped_column(nullable=True, default=None,
                                                 insert_default=None)

    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    __table_args__ = (
        Index(
            'clinic_city_title_unique_idx',
            'city_id',
            'title',
            postgresql_using='btree',
            unique=True
        ),
        Index(
            'clinic_email_unique_idx',
            'email',
            postgresql_using='btree',
            unique=True
        ),
        Index(
            'clinic_phone_unique_idx',
            'phone',
            postgresql_using='btree',
            unique=True
        ),
    )


class Recipient(BaseDatabaseModel):
    __tablename__ = "recipients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)

    reason: Mapped[str] = mapped_column(Text, nullable=False)

    blood_component_id: Mapped[int] = mapped_column(ForeignKey("blood_components.id"), nullable=False)
    blood_component: Mapped["BloodComponent"] = relationship(uselist=False, lazy="selectin")

    pet_id: Mapped[int] = mapped_column(ForeignKey("pets.id"), nullable=False)
    pet: Mapped["Pet"] = relationship(uselist=False, lazy="selectin")

    due_date: Mapped[date] = mapped_column(nullable=False)

    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.now(),
                                                 insert_default=datetime.now())

    deleted_at: Mapped[datetime] = mapped_column(nullable=True, default=None,
                                                 insert_default=None)

    donor_amount: Mapped[int] = mapped_column(Integer, nullable=False)

    clinic_id: Mapped[int] = mapped_column(ForeignKey("clinics.id"), nullable=False)
    clinic: Mapped["Clinic"] = relationship(uselist=False, lazy="selectin")

    __table_args__ = (
        Index(
            'recipient_pet_blood_component_unique_idx',
            'pet_id',
            'blood_component_id',
            postgresql_using='btree',
            unique=True
        ),
    )


class DonorStatus(BaseDatabaseModel):
    __tablename__ = "donor_statuses"

    CREATED = 1
    APPROVED = 2
    DONE = 3
    REJECTED = 4

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)


class Donor(BaseDatabaseModel):
    __tablename__ = "donors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)

    pet_id: Mapped[int] = mapped_column(ForeignKey("pets.id"), nullable=False)
    pet: Mapped["Pet"] = relationship(uselist=False, lazy="selectin")

    recipient_id: Mapped[int] = mapped_column(ForeignKey("recipients.id"), nullable=False)
    recipient: Mapped["Recipient"] = relationship(uselist=False, lazy="selectin")

    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.now(),
                                                 insert_default=datetime.now())

    deleted_at: Mapped[datetime] = mapped_column(nullable=True, default=None,
                                                 insert_default=None)

    donor_status_id: Mapped[int] = mapped_column(ForeignKey("donor_statuses.id"), nullable=False)
    donor_status: Mapped["DonorStatus"] = relationship(uselist=False, lazy="selectin")

    donation_date: Mapped[datetime] = mapped_column(nullable=False, index=True)

    __table_args__ = (
        Index(
            'donor_pet_recipient_unique_idx',
            'pet_id',
            'recipient_id',
            'donation_date',
            postgresql_using='btree',
            unique=True
        ),
        Index(
            'donor_pet_date_status_idx',
            'pet_id',
            'donation_date',
            'donor_status_id',
            postgresql_using='btree'
        ),
    )


"""
class PetVaccination(BaseDatabaseModel):
    __tablename__ = "pet__vaccinations"

    pet_id: Mapped[int] = mapped_column(ForeignKey("pets.id"), nullable=False, primary_key=True)

    vaccination_id: Mapped[int] = mapped_column(ForeignKey("vaccinations.id"), nullable=False, primary_key=True)
    vaccination_date: Mapped[datetime.date] = mapped_column(nullable=False)
"""
