from pathlib import Path
from typing import Optional, Dict, List

import yaml
from pydantic import PostgresDsn, Field
from pydantic_settings import BaseSettings


class DatabaseConfig(BaseSettings):
    """Database configuration."""

    user: str
    password: str
    host: str
    port: str
    name: str
    echo: bool

    @property
    def database_url(self) -> Optional[PostgresDsn]:
        return (
            f"postgresql+asyncpg://{self.user}:{self.password}@"
            f"{self.host}:{self.port}/{self.name}"
        )

    class Config:
        extra = "ignore"


class ApiConfig(BaseSettings):
    host: str = Field(default="localhost")
    port: int = Field(default=7000)
    key: str
    algorithm: str
    token_expire_time: int

    debug: bool
    version: str
    title: str
    reload: bool = Field(default=False)

    @property
    def url(self) -> Optional[PostgresDsn]:
        return (
            f"http://{self.host}:{self.port}"
        )

    class Config:
        extra = "ignore"


class Config(BaseSettings):
    database: DatabaseConfig
    api: ApiConfig

    @classmethod
    def load_config(cls, base_file="default.yaml", override_file="local.yaml") -> "Config":
        """Загружает конфигурации с учетом приоритетов, возвращая единственный экземпляр Config."""

        def load_yaml(file_path):
            if Path(file_path).is_file():
                with open(file_path, "r") as f:
                    return yaml.safe_load(f) or {}
            return {}

        base_config = load_yaml(base_file)
        override_config = load_yaml(override_file)

        combined_config = {**base_config, **override_config}

        cls._instance = cls.parse_obj(combined_config)
        return cls._instance


config = Config.load_config()
