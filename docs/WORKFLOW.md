# Workflow

## 1. End-to-End Operational Workflow

The system follows a structured, schedule-driven workflow that connects planning, procurement, execution, and monitoring.

1. The Project Manager (PM) creates a project and defines the activity plan.
2. For each activity, the PM enters:
   - Activity type
   - Planned quantity
   - Start date and end date
3. The system retrieves predefined productivity coefficients and material consumption data for the selected activity.
4. Based on the schedule and coefficients, the system automatically calculates:
   - Total material requirement
   - Total manpower requirement
   - Daily execution targets
5. The PM reviews the calculated outputs.
6. Upon confirmation, the system generates material requests linked to the planned activities.
7. The procurement team processes the material requests and raises purchase orders.
8. Materials received at the site are verified and recorded against purchase orders.
9. Site execution progress is tracked against daily planned targets.
10. The system generates variance reports comparing planned versus actual execution.

---

## 2. Approval and Responsibility Flow

The workflow enforces clear role-based responsibility at each stage:

- Project Manager  
  - Defines activities and schedules  
  - Reviews and approves calculated plans  

- Procurement Team  
  - Converts approved material requests into purchase orders  

- Site Engineer / Storekeeper  
  - Confirms material receipt and availability  
  - Tracks execution progress  

Each transition between roles is governed by role-based access control.

---

## 3. Data Validation and Control Rules

To maintain accuracy and accountability, the system enforces the following rules:

- All calculations are performed using centrally maintained productivity and coefficient data.
- Once a plan or material request is approved, it becomes read-only.
- Any change to activity schedule or quantity after approval requires re-calculation and re-approval.
- Approved data is never silently modified; all changes result in a new revision.
- Execution tracking is always measured against the latest approved plan.

---

## 4. Execution Monitoring and Feedback

The system continuously compares actual execution data with planned targets to identify:

- Schedule deviations
- Material overuse or underuse
- Manpower inefficiencies

These variance reports provide visibility to project managers and form the basis for future planning improvements.

---

## 5. Workflow Characteristics

- Schedule-driven rather than request-driven
- Calculation-first, approval-controlled execution
- Clear separation of responsibilities
- Full traceability from planning to execution