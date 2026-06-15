# Carbon Compass 🌍

**Carbon Compass** is an intelligent sustainability platform designed to empower individuals to understand, track, and reduce their environmental impact. By combining deep data visualization, persistence-driven progress tracking, and personalized generative AI coaching, Carbon Compass guides users along their journey toward a net-zero lifestyle.

---

## 🎯 The Sustainability Problem
Global climate change demands individual action, but carbon footprints are complex, opaque, and difficult to manage. Individuals face critical barriers:
1. They do not know their current impact (**Understand**).
2. They have no way to measure progress over time (**Track**).
3. They lack actionable, personalized guidance to make changes (**Reduce**).

**Carbon Compass** solves this trilemma by providing an end-to-end sustainability lifecycle platform that translates complex environmental data into accessible, everyday actions.

---

## 🧭 Core Workflow & Feature Mapping

Carbon Compass is meticulously engineered to solve the three core pillars of sustainability management:

### 1. Understand Your Footprint
Users must first establish a baseline understanding of their environmental impact.
| Challenge Requirement | Platform Feature | User Benefit | Core Module |
| :--- | :--- | :--- | :--- |
| **Understand Footprint** | **Carbon Assessment** | Precisely identifies baseline emission sources across transport, diet, and energy. | `CarbonAssessment.jsx` |
| **Understand Footprint** | **Explain My Footprint** | Contextualizes raw data into accessible human language using AI. | `Dashboard.jsx` (Insights) |

### 2. Track Your Progress
Users must be able to visualize their journey and measure their improvements over time.
| Challenge Requirement | Platform Feature | User Benefit | Core Module |
| :--- | :--- | :--- | :--- |
| **Track Progress** | **Carbon Journey** | Persists historical assessments to measure long-term improvements. | `trackingService.js` |
| **Track Progress** | **Sustainability Dashboard**| Provides rich visualizations of emission trends and footprint reduction. | `Dashboard.jsx` |

### 3. Reduce Your Emissions
Users must be empowered with the tools and strategies to actively lower their footprint.
| Challenge Requirement | Platform Feature | User Benefit | Core Module |
| :--- | :--- | :--- | :--- |
| **Reduce Emissions** | **Impact Simulator** | Tests "what-if" reduction strategies before committing to behavioral changes. | `ImpactSimulator.jsx` |
| **Reduce Emissions** | **Decision Assistant** | Evaluates the environmental impact of daily choices to recommend optimal alternatives. | `DecisionAssistant.jsx` |
| **Reduce Emissions** | **AI Sustainability Coach** | Provides tailored, actionable advice to reduce emissions using advanced reasoning. | `AICoach.jsx` |

---

## ♿ Universal Accessibility

Sustainability tools must be usable by everyone. Carbon Compass integrates comprehensive accessibility features directly into its foundation, not as an afterthought:
* **Native Text-to-Speech:** Read-aloud functionality for users with visual impairments.
* **Voice Input Navigation:** Hands-free interaction with the AI coaching layer.
* **Visual Adaptability:** High Contrast modes, Dyslexic-friendly typography, and Reduced Motion states.

---

## 🚀 Getting Started

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```

For a detailed breakdown of the platform's data flow and tracking lifecycle, refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) document.
