import json
import logging
import functools
from app.core.config import settings
from app.schemas.carbon import FootprintExplanation, CarbonScoreResponse, TopActionsResponse, TopAction
from app.schemas.decision import DecisionRequest, DecisionResponse, DecisionOption

logger = logging.getLogger(__name__)

USE_MOCK = not bool(settings.GEMINI_API_KEY)
model = None

if not USE_MOCK:
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
    except Exception as e:
        logger.warning(f"Failed to initialize Gemini: {e}. Falling back to mock.")
        USE_MOCK = True

@functools.lru_cache(maxsize=128)
def _generate_content_cached(prompt: str) -> dict:
    if model is None:
        raise ValueError("Gemini model not initialized")
    response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
    return json.loads(response.text)

class GeminiService:
    @staticmethod
    def explain_my_footprint(score: CarbonScoreResponse) -> FootprintExplanation:
        if USE_MOCK:
            return FootprintExplanation(
                explanation="Your footprint is heavily influenced by your transportation choices and diet.",
                biggest_contributor="Transportation",
                smallest_contributor="Shopping",
                key_habits=["Driving a gasoline car", "Eating meat daily"],
                personalized_summary="Focus on reducing car trips and incorporating plant-based meals to see the biggest impact."
            )
        
        prompt = f"Analyze this carbon footprint: {score.model_dump_json()}. Return a JSON object with keys: 'explanation', 'biggest_contributor', 'smallest_contributor', 'key_habits' (list of strings), and 'personalized_summary'."
        try:
            data = _generate_content_cached(prompt)
            return FootprintExplanation(**data)
        except Exception as e:
            logger.error(f"Gemini error: {e}")
            return FootprintExplanation(
                explanation="Error generating explanation.",
                biggest_contributor="Unknown",
                smallest_contributor="Unknown",
                key_habits=[],
                personalized_summary="We couldn't analyze your footprint right now."
            )

    @staticmethod
    def analyze_assessment(score: CarbonScoreResponse) -> TopActionsResponse:
        if USE_MOCK:
            return TopActionsResponse(actions=[
                TopAction(id=1, title="Cycle to work", monthlySavings=15.0, annualSavings=180.0, difficulty="Medium", reason="Reduces car emissions"),
                TopAction(id=2, title="Go meatless twice a week", monthlySavings=20.0, annualSavings=240.0, difficulty="Easy", reason="Reduces diet emissions"),
                TopAction(id=3, title="Reduce AC usage", monthlySavings=10.0, annualSavings=120.0, difficulty="Easy", reason="Saves energy")
            ])
            
        prompt = f"Given this carbon score: {score.model_dump_json()}, suggest top 3 actions to reduce emissions. Return JSON with 'actions' list containing objects with: id, title, monthlySavings (float), annualSavings (float), difficulty (Easy/Medium/Hard), reason."
        try:
            data = _generate_content_cached(prompt)
            return TopActionsResponse(**data)
        except Exception as e:
            logger.error(f"Gemini error: {e}")
            return TopActionsResponse(actions=[])

    @staticmethod
    def decision_assistant(request: DecisionRequest) -> DecisionResponse:
        if USE_MOCK:
            return DecisionResponse(
                recommendation_title="Mocked Recommendation",
                recommendation_explanation="This is a fallback response because the Gemini API key is missing or failed.",
                confidence_level="High",
                options=[
                    DecisionOption(title="Option A", isRecommended=True, score=90, co2_impact_kg=10.0, key_factor="Low emissions", pros=["Good"], cons=["None"])
                ]
            )
            
        prompt = f"Help the user make a sustainable decision. Question: {request.question}. Context: {request.context}. Return strict JSON with 'recommendation_title', 'recommendation_explanation', 'confidence_level', and 'options' (list of 'title', 'isRecommended', 'score', 'co2_impact_kg', 'key_factor', 'pros', 'cons')."
        try:
            data = _generate_content_cached(prompt)
            return DecisionResponse(**data)
        except Exception as e:
            logger.error(f"Gemini error: {e}")
            return DecisionResponse(
                recommendation_title="Error",
                recommendation_explanation="Failed to contact AI service.",
                confidence_level="Low",
                options=[]
            )

    @staticmethod
    def sustainability_coach(message: str) -> dict:
        if USE_MOCK:
            return {"reply": "This is a mock coach response. Keep up the green habits!"}
            
        prompt = f"You are a sustainability coach. The user says: {message}. Reply in strict JSON with a single key 'reply'."
        try:
            data = _generate_content_cached(prompt)
            return data
        except Exception as e:
            logger.error(f"Gemini error: {e}")
            return {"reply": "I'm having trouble thinking right now. Please try again later."}
