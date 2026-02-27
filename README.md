# BuildSync

![BuildSync](https://img.shields.io/badge/Status-Active-brightgreen.svg) ![Version](https://img.shields.io/badge/Version-MVP-blue.svg)

BuildSync is an automated resource planning and management system tailored for small and mid-scale construction projects. It bridges the gap between project scheduling and material/manpower procurement, moving away from disconnected spreadsheets into a deterministic, data-driven calculation engine.

## 📖 Documentation Directory

The complete technical and architectural documentation has been professionally structured into individual modules. Please refer to the specific documents below for deep dives into particular architectural strategies, use cases, and technical alignment.

### 1. Vision & Strategy
*   [Idea Alignment](docs/IDEA_ALIGNMENT.md) - Core problem summaries and domain value.
*   [Problem Statement](docs/PROBLEM_STATEMENT.md) - Industry pain points and the gap current solutions leave.
*   [Objectives](docs/OBJECTIVES.md) - Quantifiable engineering and business goals.
*   [MVP Scope](docs/MVP_SCOPE.md) - Features included and strict architectural exclusions.
*   [Results & Outcomes](docs/RESULTS_AND_OUTCOMES.md) - Key performance indicators and metrics.

### 2. System Architecture & Design
*   [System Architecture](docs/SYSTEM_ARCHITECTURE.md) - 3-tier modular monolith layout and scaling strategy.
*   [Database Schema](docs/DATABASE_SCHEMA.md) - Third Normal Form (3NF) breakdown and integrity constraints.
*   [Tech Stack](docs/TECH_STACK.md) - Rationale for using Node.js, React, and PostgreSQL.
*   [Workflow](docs/WORKFLOW.md) - End-to-End Orchestration and event lifecycles.
*   [State Machine](docs/STATE_MACHINE.md) - Strict, decoupled workflow states for material requests.

### 3. Usage & Operations
*   [User Roles](docs/USER_ROLES.md) - Security, RBAC, and the Principle of Least Privilege.
*   [Use Cases](docs/USE_CASES.md) - API contracts and system interaction boundaries.
*   [Assumptions & Constraints](docs/ASSUMPTIONS_AND_LIMITATIONS.md) - System constraints, guardrails, and acceptable trade-offs.

### 4. Development & QA
*   [Development Plan](docs/DEVELOPMENT_PLAN.md) - Agile vertical slicing vs waterfall.
*   [Version Control](docs/VERSION_CONTROL.md) - Trunk-based development and CI pipeline hygiene.
*   [Testing Strategy](docs/TESTING_STRATEGY.md) - Implementing the Enterprise Test Pyramid (Unit -> Integration -> E2E).

### 5. Roadmap
*   [Future Enhancements](docs/FUTURE_ENHANCEMENTS.md) - SaaS integration, AI forecasting, and mobile application strategies.

---

> *"BuildSync is designed to replace heuristic estimation with deterministic algorithmic planning, ensuring Just-In-Time delivery, minimal material waste, and absolute operational auditability."*
