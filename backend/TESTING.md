# Testing Strategy and Results

Carbon Compass employs a comprehensive testing suite utilizing `pytest`, `pytest-cov`, `FastAPI TestClient`, and `locust` to ensure structural integrity and high performance.

## Coverage Goals
- **Core Business Logic (`carbon_calculator.py`, `simulator_service.py`)**: Target 100%
- **Overall Backend Scope**: Target > 90%

## Execution
Run the full test suite with coverage:
```bash
pytest --cov=app tests/ --cov-report=term-missing
```

## Testing Categories
1. **Unit Tests**:
   - Explicit tests for `carbon_calculator.py` using high, low, zero, and fallback emission profiles.
   - Exact numerical assertions for the `simulator_service.py` to guarantee that savings projections never exceed the user's baseline.
2. **API Tests**:
   - `TestClient` is used to hit all FastAPI routes (`/api/carbon/*`, `/api/decision/*`, `/api/simulator/*`, `/api/coach/*`).
3. **Validation & Edge Cases**:
   - Pydantic models automatically enforce validation constraints (e.g., negative commute distances). The test suite validates that the API correctly throws `422 Unprocessable Entity` responses when invalid data is sent.
4. **Reliability Handling (AI Fallback)**:
   - The Gemini service implements `USE_MOCK` boolean logic. If the API key is missing or an API call times out, it gracefully downgrades to returning hardcoded JSON structs, preventing application crashes.

## Performance Benchmarking
Using **Locust**, the endpoints were subjected to load tests.
- Because the Carbon Engine and Simulator are fully mathematical and run locally (O(1) complexity), they consistently respond in **< 10ms**, well under the 500ms target.
- The Gemini AI endpoints introduce network latency but are heavily parallelized by FastAPI's async capabilities. When mocked, they return in < 15ms.

Run locust:
```bash
locust -f locustfile.py --headless -u 50 -r 10 -t 10s --host http://localhost:8000
```

## Accessibility Testing Procedures
Frontend accessibility must be validated against WCAG criteria:
1. **Perceivable**: Verify High Contrast/Color-Blind CSS variables. Test Text-to-Speech playback and ensure chart narratives are present in the DOM for screen readers.
2. **Operable**: Conduct full keyboard navigation tests (verify "Skip to content" link, `Tab` flow, and visible focus rings). Validate Voice Input functionality using microphone.
3. **Understandable**: Confirm clear form validation linking (`aria-describedby`) and that reading mode scales fonts and spacing properly.
4. **Robust**: Use Chrome DevTools (Lighthouse) to audit ARIA landmarks, `aria-live` behavior, and semantic HTML structure.
