# Carbon Compass Backend API

Carbon Compass is an AI-powered sustainability coaching application. This backend serves the React frontend via a high-performance FastAPI server, managing carbon footprint calculations, impact simulations, and Google Gemini AI integrations.

## Features
- **Carbon Calculation Engine**: Pydantic-validated mathematical model applying modular emission factors to generate footprint breakdowns and sustainability scores.
- **Impact Simulator**: Estimates future monthly and annual carbon savings based on proposed habit changes.
- **Gemini AI Service**: Provides detailed "Explain My Footprint" logic, Top 3 Actions generation, an AI coach conversational interface, and a Decision Assistant that breaks down the sustainability impact of user choices.

## Setup Instructions
1. Ensure Python 3.9+ is installed.
2. Navigate to the `backend` directory.
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `.\venv\Scripts\Activate.ps1`
   - Unix: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt` (or manually run `pip install fastapi uvicorn pydantic pydantic-settings google-generativeai python-dotenv pytest pytest-cov httpx locust`)
6. Copy `.env.example` to `.env` and insert your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
7. Start the server: `uvicorn app.main:app --reload`

## Environment Variables
- `GEMINI_API_KEY`: Key for the Google Generative AI API. If empty, the backend safely falls back to offline mocked responses, ensuring the app never crashes.

## WCAG 2.1 AA Compliance Mapping
Carbon Compass employs a frontend-first native accessibility approach mapping to core WCAG principles:
- **Perceivable**: Dyslexia-friendly reading mode, high contrast, and color-blind themes. Native TTS for screen readers and accessible chart narratives.
- **Operable**: Full keyboard navigation (skip-to-content links, visible focus indicators). Web Speech API for voice input control.
- **Understandable**: Clear form validations, plain-language chart summaries, and consistent navigation.
- **Robust**: ARIA live regions for dynamic AI content and proper semantic HTML5 landmarks (`<main>`, `<nav>`, `<section>`).

## Future Improvements
- Database Integration: Store user sessions and historical footprint data in Firebase Firestore.
- Advanced AI Prompting: Further restrict Gemini outputs using JSON-Schema function calling for zero-failure parsing.
- Localization: Support global emission factors outside of generic standard averages.
