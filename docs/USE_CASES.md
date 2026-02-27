# BuildSync – Use Cases Document

## 1. Overview

BuildSync is a web-based construction planning application that helps estimate materials and manpower based on project quantities and predefined coefficients.

This document defines all system use cases for both MVP and extended versions.

---

## 2. Actors

- Admin
- Project Manager (PM)
- Project Engineer (PE)
- Store Keeper
- Procurement Officer
- HR / Workforce Manager
- System (Calculation Engine)

---

# 3. MVP Use Cases (Phase 1)

---

## UC-01: User Login

**Actor:** Project Manager  
**Precondition:** User account exists  

### Main Flow:
1. User enters email and password.
2. System validates credentials.
3. System grants access to dashboard.

### Postcondition:
- User is authenticated.

---

## UC-02: Create Project

**Actor:** Project Manager  
**Precondition:** User is logged in  

### Main Flow:
1. PM enters project name.
2. PM selects start date.
3. PM selects end date.
4. PM clicks Save.
5. System stores project in database.

### Postcondition:
- Project is successfully created.

---

## UC-03: Add Work Items

**Actor:** Project Manager  

### Main Flow:
1. Select project.
2. Enter work type (Concrete, Brickwork, etc.).
3. Enter quantity.
4. Save work item.

### Postcondition:
- Work item is linked to project.

---

## UC-04: Generate Resource Plan

**Actor:** Project Manager  
**System Actor:** Calculation Engine  

### Main Flow:
1. PM clicks "Generate Plan".
2. System retrieves work quantities.
3. System fetches material coefficients.
4. System fetches labor coefficients.
5. System calculates:

   - Material Required = Quantity × Material Coefficient
   - Manpower Required = Quantity × Labor Coefficient

6. System displays calculated results.

### Postcondition:
- Resource estimation is generated.

---

## UC-05: View Dashboard

**Actor:** Project Manager  

### Main Flow:
1. Open dashboard.
2. View total materials required.
3. View total manpower required.
4. View project duration.

### Postcondition:
- PM gets overall project summary.

---

# 4. Extended Use Cases (Phase 2+)

---

## UC-06: Task Assignment

**Actor:** Project Engineer  

### Main Flow:
1. Select project.
2. Create task.
3. Assign manpower.
4. Set deadline.
5. Save task.

### Postcondition:
- Task added to project task list.

---

## UC-07: Material Request (Indent)

**Actor:** Project Engineer  

### Main Flow:
1. Select project.
2. Enter material name.
3. Enter quantity required.
4. Submit request.

### Postcondition:
- Request sent to Store Keeper.

---

## UC-08: Inventory Check

**Actor:** Store Keeper  

### Main Flow:
1. View material request.
2. Check stock availability.
3. If stock available → Issue material.
4. If not available → Forward to Procurement.

### Postcondition:
- Stock updated OR request escalated.

---

## UC-09: Create Purchase Order

**Actor:** Procurement Officer  

### Main Flow:
1. Review material request.
2. Select vendor.
3. Enter quantity and price.
4. Generate PO.
5. Save PO.

### Postcondition:
- Purchase Order stored in system.

---

## UC-10: Daily Progress Update

**Actor:** Project Engineer  

### Main Flow:
1. Select task.
2. Enter percentage completion.
3. Enter materials consumed.
4. Save update.

### Postcondition:
- Project progress updated.

---

## UC-11: View Reports

**Actor:** Project Manager  

### Main Flow:
1. Open reports page.
2. View:
   - Completion percentage
   - Resource usage
   - Labor efficiency

### Postcondition:
- PM can monitor project performance.

---

# 5. System Use Cases

---

## UC-S01: Automatic Resource Validation

**Actor:** System  

### Flow:
1. Compare manpower against productivity rate.
2. Compare duration vs quantity.
3. Flag mismatch if detected.

---

## UC-S02: Low Stock Alert

**Actor:** System  

### Flow:
1. Monitor inventory levels.
2. Trigger alert if stock below threshold.

---

## UC-S03: Data Storage & Retrieval

**Actor:** System  

### Flow:
1. Store project data securely.
2. Retrieve data when requested.

---

# 6. MVP Scope Summary

## Included in MVP:
- User Login
- Project Creation
- Add Work Items
- Resource Calculation
- Dashboard View

## Excluded from MVP:
- Inventory Management
- Purchase Orders
- Advanced Reporting
- AI Predictions
- Multi-role workflow

---

End of Use Cases Document.
