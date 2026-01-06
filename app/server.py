from fastapi import APIRouter,FastAPI
app = FastAPI(title="CI-CD PIPELINE TEST")

@app.get("/")
def home():
    return {"response":"Yahoo!!!!"}