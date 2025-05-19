from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/groups"
)


@router.get("",
            response_model=List[schemas.PetTypeBloodGroup])
async def get_blood_groups(pet_type_id: int = None):
    try:
        model = models.PetTypeBloodGroup

        filters = {}

        if pet_type_id is not None:
            filters["pet_type_id"] = pet_type_id

        types: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                        model=model).get_multi(**filters)
        return types
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("")
async def post_blood_components():
    pass
