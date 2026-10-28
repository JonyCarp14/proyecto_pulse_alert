from fastapi import FastAPI

app = FastAPI(title="PulseAlert API")


@app.get("/")
def inicio():
    return {"mensaje": "PulseAlert API funcionando"}