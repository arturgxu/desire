from fastapi import FastAPI
import uvicorn

app = FastAPI()

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


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)