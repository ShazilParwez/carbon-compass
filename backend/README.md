# Carbon Compass Backend API

Carbon Compass is an intelligent sustainability coaching platform. This backend serves the React frontend via a high-performance FastAPI server, managing footprint calculations, impact simulations, and generative AI integrations to support a complete sustainability lifecycle.

## 🎯 Core Mission: Understand, Track, Reduce
The backend is explicitly engineered to fulfill the three pillars of carbon footprint management:

1. **Understand**: The `Carbon Calculator Service` uses Pydantic-validated mathematical models and authoritative emission factors to generate precise footprint breakdowns.
2. **Track**: The `Tracking Service` layer supports longitudinal progress measurement, ensuring users can visualize their historical sustainability journey.
3. **Reduce**: The `Impact Simulator` and `Gemini AI Coach` translate raw data into actionable behavioral changes, predicting future carbon savings and providing personalized recommendations.

## ⚙️ Features
- **Carbon Calculation Engine**: Processes user lifestyle inputs into deterministic category-wise emissions.
- **Impact Simulator**: Estimates long-term carbon savings based on proposed behavioral shifts.
- **Decision Assistant**: Evaluates the environmental trade-offs of daily choices.
- **Gemini AI Service**: Provides plain-language explanations, contextualizes emission sources, and acts as an interactive sustainability coach.

## 🚀 Setup Instructions
1. Ensure Python 3.9+ is installed.
2. Navigate to the `backend` directory.
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `.\venv\Scripts\Activate.ps1`
   - Unix: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt` 
6. Copy `.env.example` to `.env` and insert your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
7. Start the server: `uvicorn app.main:app --reload`

## 🔐 Environment Variables
- `GEMINI_API_KEY`: Key for the Google Generative AI API. To ensure absolute reliability across network conditions, the backend includes robust localized fallback models that guarantee seamless execution even if external AI APIs are temporarily unavailable.

## ♿ Accessibility Support
Carbon Compass employs a frontend-first native accessibility approach, supported intimately by the backend:
- **Understandable AI Outputs**: The Gemini AI Service is prompted to return plain-language, structured responses easily parsed by screen readers.
- **Semantic Structure**: Error handling avoids complex technical codes, returning localized, user-friendly strings.
- **Determinism**: Calculations and APIs respond predictably, ensuring assistive technologies do not encounter race conditions or unexpected DOM shifts.
