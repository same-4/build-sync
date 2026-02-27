# TESTING STRATEGY

## 1. Unit Testing:
- Calculation formula validation
- Date duration validation

## 2. Manual Testing:
- Create project → verify calculation
- Approve MR → verify state change
- Invalid inputs handling

## 3. Edge Case Testing:
- Zero quantity
- End date before start date
- Missing coefficients

---

## 🧪 Quality Assurance & Test Pyramid Architecture

### Constructing the Test Pyramid
Enterprise application architecture dictates a rigorous hierarchy for automated validations, famously structured as a Test Pyramid:
- **Foundational Base (Unit Tests):** The `Calculation formula` and `Date duration validation` are strictly bound pure mathematical operations. We leverage Jest (frontend) and Mocha/Chai or Jest (backend) to write thousands of extremely fast, deterministic scenarios that cover all data matrix types (e.g., fractional quantities, leap-year dates, NaN handling).
- **Middle Layer (Integration Tests):** Connecting the Calculation Engine API directly to a lightweight disposable database container (e.g., Testcontainers for PostgreSQL). This validates that our schemas correctly reject anomalies like `null` foreign keys before they hit production data.
- **Apex (End-to-End Cypress Tests):** Abstracting the "Manual Testing" bullet points entirely. Critical business paths—creating a project and watching the Purchase Order trigger—should be scripted natively to run via a headless Chrome instance inside the CI pipeline, eliminating manual regression testing exhaustion.

### Edge Case Containment
Handling "Zero quantity" or "Missing coefficients" is accomplished cleanly by architecting **Fail-Fast** error structures inside the service tier. When a PM submits an end date before a start date, the Domain Layer instantaneously throws a typed `ValidationException` translating precisely to an HTTP 400 Bad Request payload with explicit diagnostic errors (`{"error": "Schedule Inverted", "field": "end_date"}`), rather than letting it cascade into a 500 Internal Server error at the database tier.
