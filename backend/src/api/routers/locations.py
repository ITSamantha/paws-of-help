from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/locations",
    tags=["locations"]
)


@router.get("/cities",
            response_model=List[schemas.City])
async def get_cities():
    try:
        model = models.City

        cities: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                         model=model).get_multi()
        return cities
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get("/regions",
            response_model=List[schemas.Region])
async def get_regions():
    try:
        model = models.Region

        regions: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                          model=model).get_multi()
        return regions
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
