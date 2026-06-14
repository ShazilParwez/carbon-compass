from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini_service import GeminiService

class ChatMessage(BaseModel):
    message: str

router = APIRouter()

@router.post("/chat")
def chat_with_coach(msg: ChatMessage):
    try:
        return GeminiService.sustainability_coach(msg.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
