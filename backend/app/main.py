from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import carbon, decision, simulator, coach

app = FastAPI(title="Carbon Compass API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(carbon.router, prefix="/api/carbon", tags=["Carbon Assessment"])
app.include_router(decision.router, prefix="/api/decision", tags=["Decision Assistant"])
app.include_router(simulator.router, prefix="/api/simulator", tags=["Impact Simulator"])
app.include_router(coach.router, prefix="/api/coach", tags=["AI Coach"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}
