BuildSync – Use Cases
1. Overview

BuildSync is a web-based construction planning application that allows project stakeholders to estimate materials, manpower, and manage execution workflows efficiently.

This document defines all system use cases for the MVP and extended version.

2. Actors

Admin

Project Manager (PM)

Project Engineer (PE)

Store Keeper

Procurement Officer

HR / Workforce Manager

System (Calculation Engine)

3. MVP Use Cases (Phase 1)
UC-01: User Login

Actor: Project Manager
Description: User logs into the system using email and password.
Precondition: User account exists.
Main Flow:

User enters email and password.

System validates credentials.

System grants dashboard access.

Postcondition: User is authenticated and redirected to dashboard.

UC-02: Create Project

Actor: Project Manager
Description: PM creates a new project.
Precondition: User is logged in.
Main Flow:

PM enters project name.

PM selects start date and end date.

PM saves project.

System stores project details.

Postcondition: Project is created in database.

UC-03: Add Work Items

Actor: Project Manager
Description: PM adds work items with quantities.
Main Flow:

Select project.

Enter work type (Concrete, Brickwork, etc.).

Enter quantity.

Save work item.

Postcondition: Work item linked to project.

UC-04: Generate Resource Plan

Actor: Project Manager
Description: System calculates materials and manpower.
Main Flow:

PM clicks "Generate Plan".

System retrieves work quantities.

System fetches material & labor coefficients.

System calculates:

Material Required = Quantity × Material Coefficient

Manpower Required = Quantity × Labor Coefficient

System displays results.

Postcondition: Resource estimation is shown.

UC-05: View Dashboard

Actor: Project Manager
Description: View summary of project resources.
Main Flow:

Open dashboard.

View total materials.

View total manpower.

View project duration.

Postcondition: PM has overview of project resources.

4. Extended Use Cases (Phase 2 & Beyond)
UC-06: Task Assignment

Actor: Project Engineer
Description: Break project into tasks.
Main Flow:

Select project.

Create task.

Assign manpower.

Set deadline.

Postcondition: Task added to task list.

UC-07: Material Request (Indent)

Actor: Project Engineer
Description: Request materials for execution.
Main Flow:

Select project.

Enter material name and quantity.

Submit request.

Postcondition: Material request sent to Store Keeper.

UC-08: Inventory Check

Actor: Store Keeper
Description: Check available stock.
Main Flow:

View material request.

Check stock level.

Approve and issue material OR escalate.

Postcondition: Stock updated or request forwarded.

UC-09: Create Purchase Order

Actor: Procurement Officer
Description: Create PO if stock insufficient.
Main Flow:

Review material request.

Select vendor.

Generate PO.

Save PO.

Postcondition: PO stored in system.

UC-10: Daily Progress Update

Actor: Project Engineer
Description: Update daily progress.
Main Flow:

Select task.

Enter % completion.

Enter materials consumed.

Save update.

Postcondition: Project progress updated.

UC-11: View Reports

Actor: Project Manager
Description: View performance reports.
Main Flow:

Open reports page.

View:

Completion percentage

Resource usage

Labor efficiency

Postcondition: PM can monitor performance.

5. System Use Cases
UC-S01: Automatic Resource Validation

Actor: System
Description: Validate if manpower matches timeline.
Flow:

Compare productivity rates.

Check project duration.

Flag mismatch if required.

UC-S02: Low Stock Alert

Actor: System
Description: Alert when inventory falls below threshold.

UC-S03: Data Storage & Retrieval

Actor: System
Description: Store and retrieve project data securely.

6. Future Advanced Use Cases

AI delay prediction

Cost overrun forecasting

Multi-project portfolio dashboard

Vendor performance analysis

Mobile site engineer app

7. MVP Scope Summary

Included:

Login

Project Creation

Work Items

Auto Calculation

Dashboard

Excluded:

Inventory

PO Management

Advanced Reporting

AI Predictions
