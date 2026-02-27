# STATE MACHINE

## Material Request States

1. Draft
   ↓
2. Calculated
   ↓
3. Pending Approval
   ↓
4. Approved
   ↓
5. PO Generated
   ↓
6. Received
   ↓
7. Closed

*Revision loops incorporated at approval stage.*

---

## 🚦 Decoupled Workflow State Mapping

### Formal Control Logic
When engineering complex workflows, ad-hoc procedural statements (`if/else` clusters dictating state) inherently result in severe regressions. We map out the State Machine to define deterministic, formalized state transitions. This prevents unhandled operational edge cases—for example, it prevents the system from generating a Purchase Order for a "Draft" request because that edge in the state graph quite literally does not exist.

### Implementing State Transitions
How should this translate to backend code?
- **State Transition Guards:** Every mutation on the underlying `MATERIAL_REQUEST` entity must pass an internal business logic 'Guard'. To move from 'Calculated' to 'Pending Approval', a Guard may verify that all calculation fields are mathematically non-negative and properly linked to an authorized user.
- **Side-Effects/Actions:** Successful transitions trigger decoupled system actions. When moving from 'Pending Approval' to 'Approved', a database hook or service layer listener dispatches a notification event to the Procurement service.

### Concurrency and Lineage
If a revision state is triggered, what happens to the entity? Professional implementation dictates we append state transitions into a dedicated `MATERIAL_REQUEST_HISTORY` audit table. This permits comprehensive timeline tracing, establishing accountability across departments and supporting detailed compliance metrics.
