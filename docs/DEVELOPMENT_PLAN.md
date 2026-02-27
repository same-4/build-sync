# DEVELOPMENT PLAN

## 1. Week 1:
- Requirement analysis
- System architecture design
- Database schema modeling
- Role & access control design
- Environment setup (Repo, Node, DB, CI basics)

## 2. Week 2:
- Core Backend Setup (Express + DB connection)
- Authentication (JWT)
- Project entity APIs
- Work Item entity APIs
- Initial RBAC middleware implementation

## 3. Week 3:
- Calculation engine module development
- Coefficient integration logic
- Resource aggregation logic
- Unit testing for calculation module
- API integration for resource generation

## 4. Week 4:
- Frontend setup (React structure)
- Authentication UI
- Project creation flow (end-to-end)
- Work item entry UI
- Calculation results dashboard
- API integration with backend

## 5. Week 5:
- Task management module
- Material Request (MR) workflow
- Approval system logic
- Inventory integration structure
- Role-based UI rendering validation

## 6. Week 6:
- End-to-end integration testing
- UAT (User Acceptance Testing)
- Performance profiling (API response timing)
- Security validation (RBAC edge cases)
- Documentation finalization
- Production deployment configuration

---

## 📅 Roadmap – Agile Evolution & SDLC Methodologies

### From Linear Planning to Vertical Slices

Although the 6-week schedule appears sequential, a production-grade system should not be developed in strict waterfall isolation.

A mature delivery model focuses on **Vertical Slice Architecture**, where each sprint delivers a fully working feature across all layers:

1. **Slice 1 – Core Project Entity**
   - DB schema
   - API endpoints
   - Frontend form
   - Data persistence validation

2. **Slice 2 – Calculation Engine**
   - Coefficient retrieval
   - Resource calculation logic
   - Backend validation
   - Frontend result rendering

3. **Slice 3 – Workflow Control**
   - MR creation
   - Approval routing
   - Role enforcement
   - State transitions

This minimizes integration risk and prevents late-stage architectural refactoring.

---

### Continuous Testing Model (Avoiding Testing Phase Bias)

A dedicated final testing week is not sufficient in modern SDLC practice.

Testing should be integrated into every sprint:

- Unit tests for calculation engine
- Middleware authorization tests
- API contract validation
- Integration testing between services

Week 6 should focus on:
- User Acceptance Testing (UAT)
- Load simulation (basic stress testing)
- Security edge-case validation
- Deployment verification

Not core debugging.

---

### Risk Mitigation Strategy

- Implement RBAC early (Week 2) to avoid access logic refactoring.
- Modularize calculation engine to prevent business logic scattering.
- Keep coefficient data version-controlled.
- Freeze MVP feature scope after Week 3.

---

### Definition of Sprint Success

A sprint is considered complete only when:
- Feature works end-to-end (DB → API → UI)
- Role access is enforced
- No console or server errors
- Basic validation rules are implemented
- Code is committed with meaningful version history

---

End of Development Plan.
