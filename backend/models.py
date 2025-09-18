from pydantic import BaseModel, Field
from typing import List #optional


class FeelingIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Guest's first and last name")
    desire: str = Field(..., min_length=1, max_length=5000, description="Massage or feeling")


class FeelingOut(BaseModel):
    id: int
    name: str
    desire: str


class DeleteResponse(BaseModel):
    id: int


class ErrorResponse(BaseModel):
    detail: str
