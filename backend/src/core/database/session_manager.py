import contextlib
from typing import Optional

from sqlalchemy import exc
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from src.config.base import config


class DatabaseSessionManager:
    """Session manager to provide connection to database."""

    def __init__(self) -> None:
        self.engine: Optional[AsyncEngine] = None
        self.session_factory: Optional[AsyncSession] = None

    def initialize(self) -> None:

        self.engine = create_async_engine(
            url=config.database.database_url,
            pool_pre_ping=True,
            echo=config.database.echo
        )

        self.session_factory = async_sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
            expire_on_commit=False
        )

    async def close(self) -> None:
        if self.engine is None:
            return
        await self.engine.dispose()
        self.engine = None
        self.session_factory = None

    @contextlib.asynccontextmanager
    async def get_session(self) -> AsyncSession:
        if self.session_factory is None:
            raise IOError("DatabaseSessionManager is not initialized")
        session: AsyncSession = self.session_factory()
        try:
            yield session
        except exc.SQLAlchemyError as error:
            await session.rollback()
            raise
        finally:
            await session.close()


db_manager = DatabaseSessionManager()
db_manager.initialize()
