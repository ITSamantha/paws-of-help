from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/breeds",
    tags=["breeds"]
)


@router.get("/types",
            response_model=List[schemas.BreedType])
async def get_breed_types(pet_type_id: int = None):
    try:
        model = models.BreedType

        filters = {}

        if pet_type_id is not None:
            filters["pet_type_id"] = pet_type_id

        types: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                        model=model).get_multi(**filters)
        return types
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
