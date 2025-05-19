import json
import logging

from sqlalchemy.exc import IntegrityError

from src.core.database.models.models import *
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository


class DatabaseDataImporter:
    """Класс для загрузки данных для сущностей-характеристик в БД."""

    @classmethod
    async def insert_all_data(cls):

        await cls.insert_table_data(BloodComponent, "data/blood_components.json")
        await cls.insert_table_data(BloodGroup, "data/blood_groups.json")
        await cls.insert_table_data(BloodRhesus, "data/blood_rhesuses.json")

        await cls.insert_table_data(PetType, "data/pet_types.json")
        await cls.insert_table_data(BreedType, "data/breed_types.json")

        await cls.insert_table_data(Region, "data/regions.json")
        await cls.insert_table_data(City, "data/cities.json")

        await cls.insert_table_data(DonorStatus, "data/donor_statuses.json")

        await cls.insert_table_data(UserRole, "data/user_roles.json")
    @staticmethod
    async def insert_table_data(model: BaseDatabaseModel, initial_data_file: str):
        try:
            with open(initial_data_file, "r", encoding="utf-8") as file:
                objects_data = json.load(file)

            for data in objects_data:
                try:
                    await SqlAlchemyRepository(db_manager.get_session, model=model).create(data)
                except IntegrityError as e:
                    pass
                except Exception as e:
                    logging.exception(f"Невозможно загрузить данные для {model} из файла {initial_data_file}: {e}")

        except Exception as e:
            logging.error(f"Невозможно загрузить данные для {model} из файла {initial_data_file}: {e}")
