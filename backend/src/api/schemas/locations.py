from src.api.schemas.base import CharacteristicsSchemaModel


class Region(CharacteristicsSchemaModel):
    pass


class City(CharacteristicsSchemaModel):
    region: Region
