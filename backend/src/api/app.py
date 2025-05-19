from fastapi import FastAPI, Security

from src.api.dependencies.security import verify_api_key
from src.api.routers.base import include_routers_into_application
from src.config.base import config
from fastapi.middleware.cors import CORSMiddleware


def create_application() -> FastAPI:
    base_application = FastAPI(
        title=config.api.title,
        debug=config.api.debug,
        version=config.api.version,
        docs_url="/docs"
    )

    base_application.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    """Include routers."""
    application = include_routers_into_application(base_application)

    return application
