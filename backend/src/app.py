import asyncio

import uvicorn
from fastapi import FastAPI


from src.api.app import create_application
from src.config.base import config
from src.core.database.importer import DatabaseDataImporter

app: FastAPI = create_application()

if __name__ == "__main__":
    asyncio.run(DatabaseDataImporter.insert_all_data())
    """Start app."""
    uvicorn.run(
        app="app:app",
        host=config.api.host,
        port=config.api.port,
        reload=config.api.reload
    )
