# System Architecture: Carbon Compass

Carbon Compass is engineered as a comprehensive sustainability lifecycle platform. This architecture document outlines how data flows through the system to guarantee that users can continuously **Understand**, **Track**, and **Reduce** their environmental footprint.

---

## 1. The Sustainability Data Lifecycle

The platform architecture is designed around a continuous, closed-loop sustainability journey.

### Step 1: User Assessment (Understand)
The journey begins at the **Carbon Assessment Engine**. This module aggregates user-specific lifestyle data across multiple vectors (transportation, diet, energy usage) and processes these inputs through standardized sustainability models to establish a highly accurate baseline carbon footprint.

### Step 2: Carbon Analysis & Context (Understand)
Once a baseline is established, the data flows into the **Analysis Layer**. Here, raw emissions (kg CO₂e) are contextualized. The system breaks down the footprint into distinct categories (e.g., Home Energy vs. Food) so the user can immediately identify their largest sources of emissions.

### Step 3: Tracking Persistence (Track)
To ensure long-term engagement, the architecture utilizes a dedicated **Tracking Service**. Assessment scores are securely persisted. This historical data retention allows the platform to build a continuous timeline of the user's carbon journey, ensuring no progress is lost between sessions.

### Step 4: Trend Analysis (Track)
The **Sustainability Dashboard** continuously polls the Tracking Service to perform Trend Analysis. It calculates percentage improvements, graphs historical data over time, and compares the user's latest footprint against their initial baseline to visually prove progress.

### Step 5: Recommendations (Reduce)
Data from the Assessment and Tracking layers is fed into the **AI Coaching Layer** and **Decision Assistant**. These components provide hyper-personalized, context-aware suggestions (e.g., specific dietary shifts or energy transition plans) that align with the user's current behavioral patterns.

### Step 6: Reduction Planning (Reduce)
Finally, users engage with the **Impact Simulation Engine**. This predictive modeling layer calculates long-term environmental outcomes. Users can manipulate lifestyle variables (e.g., "What if I switch to public transit 3 days a week?") and instantly visualize the projected cumulative emissions savings over months or years, completing the cycle and motivating future assessments.

---

## 2. Universal Accessibility Framework

Sustainability tools must be universally accessible. The Accessibility Framework is baked directly into the architectural foundation.

* **Auditory Assistance:** Native Text-to-Speech (TTS) capabilities interface directly with browser APIs.
* **Voice Input Navigation:** Enables hands-free interaction with the platform.
* **Visual Adaptability:** Global state management seamlessly toggles High Contrast modes, Dyslexic-friendly typography, and Reduced Motion states.

---

## 3. High-Level Technical Structure

While the focus of Carbon Compass is behavioral change, it is supported by a robust modern technical stack:

* **Frontend Intelligence:** React 18 drives the reactive user interface, state management, and the core simulation engines.
* **Tracking & Persistence Layer:** A dedicated service layer manages the secure storage and retrieval of longitudinal footprint data.
* **UI/UX System:** Tailwind CSS provides a responsive, accessible, and inclusive design framework ensuring smooth performance across all devices.
