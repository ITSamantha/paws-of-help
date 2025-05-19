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
    prefix="/recipients",
    tags=["recipients"]
)


@router.get("",
            response_model=List[schemas.Recipient])
async def get_recipients(limit: int = 100, offset: int = 0,
                         blood_component_id: int = None,
                         city_id: int = None,
                         clinic_id: int = None,
                         pet_id: int = None):
    try:
        model = models.Recipient

        filters = {}
        if blood_component_id is not None:
            filters["blood_component_id"] = blood_component_id
        if city_id is not None:
            # filters["city_id"] = city_id
            pass
        if clinic_id is not None:
            filters["clinic_id"] = clinic_id
        if pet_id is not None:
            filters["pet_id"] = pet_id

        recipients: List[model] = await SqlAlchemyRepository(db_manager.get_session,
                                                             model=model).get_multi(limit=limit,
                                                                                    offset=offset,
                                                                                    deleted_at=None,
                                                                                    **filters)
        return recipients
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.get('/{recipient_id}', response_model=schemas.Recipient)
async def get_recipient_by_id(recipient_id: int):
    try:
        model = models.Recipient

        recipient: model = await SqlAlchemyRepository(db_manager.get_session,
                                                      model=model).get_single(id=recipient_id)
        return recipient
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.post("",
             response_model=schemas.Recipient)
async def post_recipient(data: schemas.CreateRecipient):
    try:
        model = models.Recipient

        recipient_data = data.model_dump()

        recipient: model = await SqlAlchemyRepository(db_manager.get_session, model=model).create(recipient_data)
        return recipient
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))


@router.delete("/{recipient_id}",
               response_model=schemas.Recipient)
async def delete_recipient(recipient_id: int):
    try:
        model = models.Recipient

        data = {
            "deleted_at": datetime.datetime.now()
        }
        recipient: model = await SqlAlchemyRepository(db_manager.get_session, model=model).update(data, id=recipient_id)
        return recipient
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
