# ASSUMPTIONS AND CONSTRAINTS

## 1. Assumptions:
- Accurate coefficient data
- Correct schedule input
- Single-project planning (MVP)

---

## ⚓ Architectural Guardrails & Capacity Planning

### Validating Fundamental Input Vectors
An enterprise application must distinguish between **Guaranteed Assertions** and **User Data Inputs**.
- **Accurate Coefficient Data:** The assumption that master tracking metrics are correct places high operational stress on the internal logic that manages Admin entries. Since wrong inputs trigger incorrect material orders, Admin endpoints managing coefficients require a robust, immutable audit log pattern (e.g., 'SCD Type 2' tracking) to review precisely who modified the steel coefficient and when.
- **Fault-Tolerant Inputs:** We must architect the frontend application with defensive programming mechanisms (e.g. strict schema validation via Zod or Yup) to aggressively check 'correct schedule input' on the client *before* transmitting network payloads, minimizing unnecessary backend computation and error logging noise.

### Intentional Constraints and Application Boundaries
- **Single-Project Topology Boundaries:** Decoupling multi-project sharing drastically reduces database lock contention. An application calculating a site in Texas does not block a database transaction occurring for a site in California. By isolating the data partition to `project_id`, we simplify potential database sharding and performance tuning.
- **Handling Delayed Integrity:** In high-fidelity architectures, prioritizing system availability and calculation performance globally often pushes us towards **Eventual Consistency**. We intentionally engineer the current phase to prioritize flawless math over cross-site live distribution, a pattern heavily utilized in modern cloud scaling.
