import datetime
import logging
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, HTTPException

from src.api import schemas
from src.core.database.models import models
from src.core.database.session_manager import db_manager
from src.core.repository.crud.base_crud_repository import SqlAlchemyRepository

router = APIRouter(
    prefix="/donors",
    tags=["donors"]
)


@router.get("",
            response_model=List[schemas.Donor])
async def get_donors(limit: int = 100, offset: int = 0, pet_id: int = None, clinic_id: int = None):
    try:
        model = models.Donor

        filters = {}

        if pet_id is not None:
            filters["pet_id"] = pet_id

        donors: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                         model=model).get_multi(order="donor_status_id",
                                                                                limit=limit,
                                                                                offset=offset,
                                                                                deleted_at=None,
                                                                                **filters)
        return donors
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("",
             response_model=schemas.Donor)
async def post_donor(data: schemas.CreateDonor):
    try:
        model = models.Donor

        data.donation_date = data.donation_date.replace(tzinfo=None)
        donor_data = data.model_dump()

        donor: model = await SqlAlchemyRepository(db_manager.get_session, model=model).create(donor_data)
        return donor
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.delete("/{donor_id}",
               response_model=schemas.Donor)
async def delete_donor(donor_id: int):
    try:
        model = models.Donor

        data = {
            "deleted_at": datetime.datetime.now()
        }
        donor: model = await SqlAlchemyRepository(db_manager.get_session, model=model).update(data, id=donor_id)
        return donor
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get("/statuses",
            response_model=List[schemas.DonorStatus])
async def get_donor_statuses():
    try:
        model = models.DonorStatus

        donor_statuses: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                                 model=model).get_multi()
        return donor_statuses
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.patch("/{donor_id}",
              response_model=schemas.Donor)
async def update_donor(donor_id: int, data: schemas.UpdateDonor):
    try:
        model = models.Donor

        donor_data = data.model_dump()
        donor: model = await SqlAlchemyRepository(db_manager.get_session, model=model).update(donor_data, id=donor_id)
        return donor
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
