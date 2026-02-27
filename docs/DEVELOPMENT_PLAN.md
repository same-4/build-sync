# DEVELOPMENT PLAN

## 1. Week 1:
- Requirement analysis
- DB schema design

## 2. Week 2:
- Backend APIs

## 3. Week 3:
- Calculation engine

## 4. Week 4:
- Frontend UI

## 5. Week 5:
- Workflow + approvals

## 6. Week 6:
- Testing + documentation

---

## 📅 Roadmap Agile Evolution & SDLC Methodologies

### From Waterfall to Vertical Delivery
While the academic 6-week breakdown appears highly structured, it is fundamentally a Waterfall delivery model. A seasoned architect converts this into an Agile/Scrum delivery sequence to minimize risk. Rather than building the "Backend APIs" entirely in Week 2 followed by the "Calculation Engine" in Week 3, a more robust strategy is building **Vertical Slices**.
1. **Slice 1 (Core Entity):** Deliver Project Creation and Data Display end-to-end (DB -> API -> React) in the first sprint.
2. **Slice 2 (The Heart):** Deliver the specialized Calculation Engine logic and state integrations in subsequent iterations. This exposes logic flaws early. If Integration Hell occurs, it occurs on a small, contained feature rather than an aggregate codebase.

### Risk Distribution
Dedicating an entire week exclusively to "Testing + Documentation" at the very end is an anti-pattern known as "Testing Phase Bias." In mature CI/CD pipelines, testing is distributed continuously across every single PR. The `Calculation engine` development sprint inherently dictates writing its associated determinating **Unit Tests**. Week 6 should consist primarily of User Acceptance Testing (UAT), Load Profiling, and final environment configurations, not baseline application debugging.
