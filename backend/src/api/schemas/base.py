from pydantic import BaseModel


class BaseSchemaModel(BaseModel):
    pass


class CharacteristicsSchemaModel(BaseSchemaModel):
    id: int
    title: str
