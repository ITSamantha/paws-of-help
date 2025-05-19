from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/components"
)


@router.get("",
            response_model=List[schemas.BloodComponent])
async def get_blood_components():
    try:
        model = models.BloodComponent

        types: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                        model=model).get_multi()
        return types
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
