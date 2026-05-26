from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.content_routes import router as content_router


app = FastAPI()

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(content_router)

@app.get("/")
def home():
    return {"message": "AI Creator Copilot backend running."}
