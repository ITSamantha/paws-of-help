import datetime
import logging
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Security, HTTPException

from src.api import schemas
from src.api.dependencies.security import verify_api_key

from src.api.routers.pets.blood.base import router as blood_router
from src.api.routers.pets.breed.base import router as breed_router
from src.api.routers.pets.type import router as type_router
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/pets",
    tags=["pets"],
    # dependencies=[Security(verify_api_key)]
)

router.include_router(blood_router)
router.include_router(type_router)
router.include_router(breed_router)


@router.post("",
             response_model=schemas.Pet)
async def post_pet(data: schemas.CreatePet):
    try:
        pet_data = data.model_dump()
        pet: models.Pet = await SqlAlchemyRepository(db_manager.get_session, model=models.Pet).create(pet_data)
        return pet
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get("",
            response_model=List[schemas.Pet])
async def get_pets(limit: int = 100, offset: int = 0, user_id: int = None):
    try:
        model = models.Pet

        filters = {}
        if user_id is not None:
            filters["user_id"] = user_id

        pets: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                       model=model).get_multi(limit=limit,
                                                                              offset=offset,
                                                                              deleted_at=None,
                                                                              **filters)
        return pets
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get('/{pet_id}', response_model=schemas.Pet)
async def get_pet_by_id(pet_id: int):
    try:
        model = models.Pet

        pet: model = await SqlAlchemyRepository(db_manager.get_session,
                                                model=model).get_single(id=pet_id)
        return pet
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.delete("/{pet_id}",
               response_model=schemas.Pet)
async def delete_pet(pet_id: int):
    try:
        model = models.Pet

        data = {
            "deleted_at": datetime.datetime.now()
        }
        pet: model = await SqlAlchemyRepository(db_manager.get_session, model=model).update(data, id=pet_id)
        return pet
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
