# USER ROLES

## 1. Project Manager (PM)
**Responsibilities:**
- Create project plans
- Define schedule
- Review system calculations

**Permissions:**
- Create / Edit project
- View reports
- Approve MR (Material Request)


## 2. Procurement Officer
**Responsibilities:**
- Generate Purchase Orders
- Manage vendor data

**Permissions:**
- Create PO
- Update material status


## 3. Admin
**Responsibilities:**
- Maintain activity master
- Manage coefficients

**Permissions:**
- Add/edit coefficients
- Manage users

---

## 🔒 Security Posture & Role Based Access Control (RBAC)

### The Principle of Least Privilege
The architecture of this application strictly enforces the cyber-security "Principle of Least Privilege" at the service boundary. In backend engineering, this means:
- **Authorization Midddlewares:** Roles are embedded in securely signed claims (using JWTs or HTTP-only session cookies). Every single POST/PUT/DELETE API route implements middleware to reject actions taken by unauthorized users with a `403 Forbidden`.

### Segregation of Duties
A common vulnerability in legacy ERPs is allowing a single user to both generate an estimation and create a purchase order. By segregating the PM and Procurement roles, we inherently create an approval checkpoint. 
- The Procurement Officer strictly focuses on external vendor PO execution based on approved Data.
- The Admin acts as a global gatekeeper for the calculation logic across all active projects by managing the underlying Master Coefficients.

### Dynamic Scoping Context
A senior-level implementation of this RBAC does not simply check "Is User A PM?". It checks "Is User A the PM of Project B?". This requires an **Attribute Based Access Control (ABAC)** pattern inside the backend logic layer, ensuring robust multi-tenant security architecture that isolates discrete project datasets even within a single monolithic instance.
