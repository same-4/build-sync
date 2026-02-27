# USE CASES

## 1. Create Project Plan
**Actor:** PM
**Action:** Inputs schedule + quantity
**Outcome:** System calculates required resources

## 2. Generate Material Plan
**Actor:** System
**Action:** Applies coefficients
**Outcome:** Total material requirement displayed

## 3. Approve Material Request
**Actor:** PM
**Action:** Approves calculated MR
**Outcome:** Procurement notified

## 4. Generate Purchase Order
**Actor:** Procurement
**Action:** Creates PO from approved MR
**Outcome:** Vendor order created

---

## 🚦 Systems Integration and API Boundaries

### Analyzing Use Cases as API Contracts
From a systems architecture viewpoint, these use cases dictate the primary operational boundaries and shape the API schema. They define what payloads the front-end clients must transmit and how the backend controllers should respond.

### Use Case 1 & 2: The Computational Core
The first two use cases are the 'heavy lifters'. 
- **Use Case 1:** We implement a standard `POST /api/projects/:id/plan` endpoint. Performance is crucial here. The database query to resolve the dependency tree of activities, retrieve the coefficients, and construct the plan must be heavily optimized utilizing parameterized joins or materialized queries to prevent N+1 select bottlenecks.
- **Use Case 2:** Represents pure calculation, acting almost like an internal microservice or helper function in the domain layer. The System acts as an autonomous actor, executing deterministic logic.

### Use Case 3 & 4: State Mutations & Concurrency
These interactions represent hard state changes and involve significant concurrency risks. 
- When an MR is approved (via `PATCH /api/material-requests/:id/approve`), what happens if two PMs try to approve it simultaneously? A seasoned engineering approach implements Optimistic Concurrency Control (OCC)—for instance using a database `version` column or SQL `ETags`—to ensure only one state transition succeeds. 
- **Notification Mechanisms:** The "Outcome: Procurement notified" requires a decoupling event mechanism. Rather than blocking the PM's HTTP request to physically send an email, a Pub/Sub model (or simple RabbitMQ/Redis event queue) should quietly dispatch these alerts asynchronously, keeping the application highly responsive.
