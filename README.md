# CloudPulse

Cloud resource optimization, visualized.

CloudPulse is a frontend engineering challenge project inspired by the cloud-resource optimization workflow demonstrated in Atomity's product video.

The project recreates the idea of bringing multiple infrastructure environments into one visual analysis flow, identifying resource utilization signals, and surfacing an optimization opportunity.

## Live Demo

> Add the deployed Vercel URL here before submission.

## GitHub

> Add the public GitHub repository URL here before submission.

---

## Feature Chosen

**Option B — Multi-environment resource optimization**

I chose Option B because it communicates a clear product story:

**Multiple environments → unified resource analysis → detected inefficiency → optimization opportunity**

Rather than reproducing the reference video pixel-for-pixel, CloudPulse interprets the concept as a scroll-triggered interactive experience.

The section visualizes:

- AWS
- Microsoft Azure
- Google Cloud
- On-Premise infrastructure
- Resource analysis across CPU, RAM, GPU, Storage and Network
- Detection of the highest-utilized resource
- A contextual optimization recommendation
- Illustrative optimization headroom

---

## Tech Stack

- React
- TypeScript
- Vite
- Framer Motion
- TanStack Query
- Modern CSS

### Why these technologies?

**React + TypeScript**

Used to build the interface from reusable components while keeping data structures and component props type-safe.

**Framer Motion**

Used for scroll-triggered entrances, staged transitions, SVG connection animations, metric bar animations and subtle interactions.

**TanStack Query**

Used to handle asynchronous API data, caching and request lifecycle states.

**Modern CSS**

CSS custom properties provide the design-token layer, while features such as `clamp()`, container queries, `color-mix()` and responsive layouts are used where they provide a practical benefit.

---

## Animation Approach

The experience is structured as a visual story rather than a collection of unrelated animations.

### Stage 1 — Infrastructure Map

Cloud providers enter the viewport sequentially.

Animated connection lines then converge toward the central resource-analysis node.

### Stage 2 — Resource Intelligence

As the analysis section enters the viewport:

- The analysis panel reveals itself
- Resource metrics animate into view
- Utilization bars fill progressively
- The analysis progress indicator responds to scroll position

### Stage 3 — Optimization Opportunity

The highest-utilized resource is identified dynamically from the API-derived resource profile.

The interface then presents:

1. Detected signal
2. Recommended action
3. Optimization headroom

Animations use easing and restrained movement to keep the interface feeling like a product experience rather than an animation demo.

---

## Data Fetching

CloudPulse fetches data from the public DummyJSON REST API.

The API response is transformed into the application's cloud-resource model before being rendered.

The external API provides general product data, so the project maps those values into an illustrative resource profile containing:

- CPU
- RAM
- GPU
- Storage
- Network
- Efficiency
- Optimization headroom

This transformation is intentional for the challenge: the frontend demonstrates dynamic API-driven rendering without hardcoding the displayed resource values directly into the UI components.

**Important:** The optimization percentages are illustrative and are not presented as real cloud billing or infrastructure measurements.

---

## Caching

TanStack Query manages the resource request.

The resource query uses a five-minute `staleTime`, allowing the existing response to be reused while the data is considered fresh.

Unused cached data is retained for longer, and unnecessary refetching on browser focus is disabled.

This avoids repeatedly requesting the same public API data during normal navigation and interaction.

---

## Component Structure

The UI is split into focused components:

```text
src/
├── components/
│   ├── CloudNode.tsx
│   ├── ConnectionLines.tsx
│   ├── CloudOptimizationSection.tsx
│   ├── OptimizationResult.tsx
│   └── ResourcePanel.tsx
│
├── hooks/
│   └── useResourceData.ts
│
├── lib/
│   └── api.ts
│
├── types/
│   └── resource.ts
│
├── App.tsx
├── App.css
└── index.css