from sqlalchemy.orm import declarative_base

Base = declarative_base()


class BaseDatabaseModel(Base):
    __abstract__ = True

    extend_existing = True
