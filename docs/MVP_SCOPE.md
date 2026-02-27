# MVP Scope

## 1. Features Included in MVP

The MVP focuses on schedule-driven planning, validation, and controlled execution of construction resources. The following features are included:

- Activity master with defined productivity coefficients
- Project schedule input (activity start date, end date, and planned quantity)
- Automatic material quantity calculation based on scheduled activities
- Automatic manpower requirement calculation based on productivity data
- Daily execution target calculation
- Material request creation and tracking
- Basic, role-based approval workflow
- Role-based access control
- Basic operational reports (planning vs actual)

---

## 2. Scope Containment Strategy

The MVP is intentionally limited to the core domain of **schedule-linked planning and resource validation**. This scope ensures that the system delivers immediate operational value without introducing unnecessary complexity during the initial phase.

Key design decisions include:

- Focusing on planning and calculation logic rather than external integrations.
- Avoiding financial accounting, billing, and compliance-heavy modules.
- Limiting automation to deterministic, data-driven calculations.
- Prioritizing correctness, traceability, and usability over advanced optimization.

This controlled scope reduces development risk, simplifies validation, and allows faster iteration based on real project usage.

---

## 3. Foundation for Future Extension

While the MVP is tightly scoped, the system is designed to support future extensions without disrupting core functionality.

Design considerations include:

- Clear separation between calculation logic and workflow orchestration.
- Modular structure allowing new inputs (e.g., external factors or advanced analytics) to be introduced later.
- Ability to refine productivity coefficients over time using historical project data.

Advanced capabilities such as predictive planning, external data integration, or intelligent optimization are explicitly deferred to future phases and are not part of the MVP.

---

## 4. Explicit Exclusions from MVP

The following features are intentionally excluded from the MVP:

- Financial accounting and payment processing
- Vendor billing and compliance workflows
- AI-based prediction or optimization
- IoT or sensor-based data inputs
- Multi-organization SaaS tenancy
- Mobile applications

These exclusions ensure the MVP remains focused, stable, and achievable within the defined development timeline.