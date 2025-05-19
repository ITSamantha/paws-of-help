import logging
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/types"
)


@router.get("",
            response_model=List[schemas.PetType])
async def get_pet_types():
    try:
        model = models.PetType

        types: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                        model=model).get_multi()
        return types
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get("/{pet_type_id}",
            response_model=List[schemas.BreedType])
async def get_pet_types(pet_type_id: int):
    try:
        model = models.BreedType

        type: model = await SqlAlchemyRepository(db_manager.get_session,
                                                 model=model).get_multi(pet_type_id=pet_type_id)
        return type
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))

