from fastapi import HTTPException, status, Security

from fastapi.security import APIKeyHeader

from src.config.base import config

"""Security."""
api_key_header = APIKeyHeader(name="X-Api-Key")


class AuthenticationType:
    AUTHORIZED = "Authorized"
    UNAUTHORIZED = "Unauthorized"


async def verify_api_key(x_api_key: str = Security(api_key_header)) -> str:
    if x_api_key != config.api.key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=AuthenticationType.UNAUTHORIZED
        )
    return x_api_key
