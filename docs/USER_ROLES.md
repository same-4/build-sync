# USER ROLES

## 1. Project Manager (PM)
**Responsibilities:**
- Create project plans
- Define project schedule (start & end date)
- Add work items and quantities
- Generate material & manpower estimation
- Review system calculations
- Approve Material Requests (MR)
- Approve Purchase Orders (PO)
- Monitor overall project progress

**Permissions:**
- Create / Edit / Delete projects
- Add / Modify work items
- Trigger resource calculation engine
- View dashboards & reports
- Approve MR
- Approve PO


## 2. Project Engineer (PE)
**Responsibilities:**
- Break project into executable tasks
- Assign manpower to tasks
- Raise Material Requests (MR)
- Update daily progress
- Report material consumption

**Permissions:**
- Create / Update tasks
- Submit MR
- Update progress data
- View assigned project details


## 3. Store Keeper
**Responsibilities:**
- Monitor inventory levels
- Validate material availability
- Issue materials to site
- Maintain stock records

**Permissions:**
- View MR
- Approve / Reject MR based on stock
- Update inventory quantities
- View stock alerts


## 4. Procurement Officer
**Responsibilities:**
- Generate Purchase Orders (PO)
- Manage vendor data
- Track delivery schedules
- Update material procurement status

**Permissions:**
- Create PO
- Edit PO before approval
- Update material delivery status
- View vendor records


## 5. Admin
**Responsibilities:**
- Maintain activity master data
- Manage material & labor coefficients
- Manage users & roles
- Oversee system configuration

**Permissions:**
- Add / Edit coefficients
- Manage users
- Access all projects (read access)
- Configure system-level settings

---

## 🔒 Security Posture & Role Based Access Control (RBAC)

### The Principle of Least Privilege
The architecture strictly enforces the "Principle of Least Privilege" at the service boundary. 

- **Authorization Middlewares:** User roles are embedded in securely signed tokens (JWT or HTTP-only session cookies).  
- Every protected API route (POST / PUT / DELETE) validates role permissions before executing business logic.  
- Unauthorized access returns a `403 Forbidden` response.

---

### Segregation of Duties
To prevent operational and financial risk, role segregation is enforced:

- The Project Manager defines scope and approves execution.
- The Project Engineer executes site-level operations.
- The Store Keeper manages physical inventory.
- The Procurement Officer handles vendor-facing PO execution.
- The Admin governs master data and calculation logic.

No single role can both manipulate estimation logic and execute procurement actions without oversight.

---

### Dynamic Scoping Context (Advanced RBAC)

Access validation is not limited to checking role identity (e.g., "Is user a PM?").  

The system validates contextual ownership:

- "Is this user the assigned PM for this specific project?"
- "Is this PE mapped to this project?"

This follows an **Attribute Based Access Control (ABAC)** pattern inside backend logic, ensuring:

- Secure multi-project isolation
- Tenant-level data segregation
- Prevention of unauthorized cross-project access

---

End of User Roles Document.
