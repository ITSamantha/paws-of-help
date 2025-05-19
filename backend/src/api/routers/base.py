from fastapi import FastAPI
from src.api.routers.pets.base import router as pets_router
from src.api.routers.locations import router as locations_router
from src.api.routers.clinics import router as clinics_router
from src.api.routers.recipients import router as recipients_router
from src.api.routers.donors import router as donors_router
from src.api.routers.auth import router as auth_router

def include_routers_into_application(application: FastAPI) -> FastAPI:
    application.include_router(pets_router)
    application.include_router(locations_router)
    application.include_router(clinics_router)
    application.include_router(recipients_router)
    application.include_router(donors_router)
    application.include_router(auth_router)

    return application
