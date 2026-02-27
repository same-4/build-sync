# SYSTEM ARCHITECTURE

## 1. Frontend
- React / Angular
- Dashboard
- Planning forms
- Reports

## 2. Backend
- Node.js / Django
- Business logic layer
- Calculation engine

## 3. Database
- PostgreSQL / MySQL
- Relational structure

## 4. Auth Flow
User Login → JWT/Auth token → Role-based access → API authorization

---

## 🏗️ Architecture Blueprint & Structural Integrity

### Pragmatic Modular Monolith
To reduce operational complexity, network latency, and CI/CD overhead during MVP phases, a **Modular Monolith** pattern is highly effective. 
This means deploying the backend as a single deployable unit but maintaining strict separation of concerns within the codebase, exactly as if they were microservices. 

### Separation of Concerns (3-Tier Infrastructure)
1.  **Presentation (React):** This layer handles user experience aggressively using Single Page Application (SPA) mechanics. By managing the UI state client-side (via tools like Redux, Zustand, or simple context), the user gets lightning-fast component rendering completely detached from the slower backend calculations.
2.  **Domain/Application Network (Node.js):** 
    - The **Controllers Route** receives sanitized requests.
    - The **Service Layer** encapsulates all business intelligence (the calculation engine). The Service Layer never executes raw SQL; doing so couples it to the database.
    - The **Repository/Data Access Layer** abstracts interactions with the core PostgreSQL database.
3.  **Data Persistance (PostgreSQL/MySQL):** Acting as the definitive system of record. Relational structural modeling is used because our data (Projects having Activities, Activities having Materials) represents fundamentally rigid, interrelated entities.

### Scalable Stateless Authentication
The choice of JSON Web Tokens (JWT) allows our application to be entirely stateless. Our backend servers do not need to persist a "session table" loaded with real-time logged-in users. When scaling horizontally, any request from any client can hit any Node.js container behind a load balancer, and the container only needs to cryptographically verify the token’s signature. This represents enterprise-grade scalability.
