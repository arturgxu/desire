from fastapi import FastAPI
import uvicorn

from models import DeleteResponse
from data.db_init import delete_feeling_by_id
from data.db_init import insert_feeling
from models import FeelingIn

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"  # Или укажите конкретные домены, например: "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


@app.get("/",
         summary="Head endpoint for check server",
         tags=["main endpoints"]
         )
def root():
    return {"message": "Server is up and running"}


@app.get("/get_feelings",
         summary="Get all feelings",
         tags=["get feelings"]
         )
def list_feelings():
    pass


@app.get("/get_feelings/{name}",
         summary="Get feeling",
         tags=["get feelings"]
         )
def get_feelings(name: str):
    pass


@app.post("/add_feeling",
          summary="Add new feeling",
          tags=["add feeling"]
          )
def add_feeling(feeling: FeelingIn):
    return insert_feeling(feeling.name, feeling.desire)

@app.delete("/delete_feeling/{id}",
            summary="Delete feeling",
            tags=["delete feeling"]
            )
def delete_feeling(feeling: DeleteResponse):
    return delete_feeling_by_id(feeling.id)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
