from fastapi import FastAPI

import uvicorn

app = FastAPI()

@app.post("/", summary="Head endpoint for data", tags=["main endpoints"])
def root():
    return {"message": "Test"}

if __name__ == "__main__":
    uvicorn.run("main:app")