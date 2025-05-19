from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/clinics",
    tags=["clinics"]
)


@router.get("",
            response_model=List[schemas.Clinic])
async def get_clinics(is_verified: bool = True):
    try:
        model = models.Clinic

        clinics: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                          model=model).get_multi(is_verified=is_verified)
        return clinics
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("",
             response_model=schemas.Clinic)
async def post_clinic(data: schemas.CreateClinic):
    try:
        model = models.Clinic

        clinic_data = data.model_dump()

        clinic: model = await SqlAlchemyRepository(db_manager.get_session, model=model).create(clinic_data)
        return clinic
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("/{clinic_id}/approve",
             response_model=schemas.Clinic)
async def post_clinic(clinic_id: int):
    try:
        model = models.Clinic
        data = {
            "is_verified": True
        }
        clinic: model = await SqlAlchemyRepository(db_manager.get_session, model=model).update(data, id=clinic_id)
        return clinic
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
