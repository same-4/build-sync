# DATABASE SCHEMA

## 1. Tables

### PROJECT
- `project_id` (PK)
- `name`
- `start_date`
- `end_date`

### ACTIVITY_MASTER
- `activity_id` (PK)
- `activity_name`
- `productivity_rate`

### MATERIAL_MASTER
- `material_id` (PK)
- `material_name`

### MATERIAL_COEFFICIENT
- `activity_id` (FK)
- `material_id` (FK)
- `quantity_per_unit`

### MANPOWER_COEFFICIENT
- `activity_id` (FK)
- `labor_type`
- `units_per_day`

### PROJECT_PLAN
- `plan_id` (PK)
- `project_id` (FK)
- `activity_id` (FK)
- `total_quantity`

### CALCULATED_PLAN
- `plan_id` (FK)
- `total_material`
- `total_manpower`
- `daily_target`

## 2. Relationships:
- **One** Project → **Many** Activities
- **One** Activity → **Many** Materials
- **One** Activity → **Many** Labor Types

---

## 🗄️ Relational Normalization & Data Integrity

### Third Normal Form (3NF) Validation
This database schema is a textbook application of rigorous Third Normal Form (3NF). Every non-key column is functionally dependent only on the primary key, eliminating data duplication. Instead of stuffing "Materials" locally under "Project Plans," breaking it into distinct Mapping Tables (`MATERIAL_COEFFICIENT`, `MANPOWER_COEFFICIENT`) enables massive relational flexibility. 

### Foreign Keys representing Business Logic
The use of Foreign Keys is not a mere technicality; it physically hardcodes the business rules. A `Calculated Plan` is directly constrained to a primary `Project Plan` row via its `plan_id` foreign key. This enforces Data Integrity across standard operations: If a Project Plan row is deleted, the cascade delete correctly expunges its correlated Calculated Plan data.

### Future High-Volume Indexing
For high-traffic calculation engines, we must heavily index these lookup constraints. Without explicit indexing on `project_id` and `activity_id`, operations querying project dashboards would scan the entire hardpan sequentially, causing application lock-ups under scale.

### Slowly Changing Dimensions (SCD)
An engineering gap in standard MVP schemas is historical integrity. If the `MATERIAL_COEFFICIENT` is fundamentally updated by Admin in 2026, we don't want a project stored in 2025 to magically recalculate its history. A professional solution is extending this schema with temporal bounds (e.g., SCD Type 2 tracking `effective_date` and `end_date`) down the line.
