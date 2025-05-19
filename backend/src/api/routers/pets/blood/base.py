from fastapi import APIRouter

from src.api.routers.pets.blood.components import router as components_router
from src.api.routers.pets.blood.groups import router as groups_router
from src.api.routers.pets.blood.rhesuses import router as rhesuses_router

router = APIRouter(
    prefix="/blood",
    tags=["blood"]
)

router.include_router(components_router)
router.include_router(groups_router)
router.include_router(rhesuses_router)
