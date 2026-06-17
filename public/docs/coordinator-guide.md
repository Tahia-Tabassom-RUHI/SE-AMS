# Coordinator Guide

Log in with `coordinator@utm.my` / `utm123` to access the coordinator interface. The persistent sidebar (or mobile drawer) exposes the full administration suite.

---

## Dashboard

The coordinator dashboard shows a department-level overview:

- **Unassigned Sections** — count of sections with no lecturer assigned
- **Pending Lecturer Responses** — assignments sent but not yet accepted or declined
- **Staff Over Credit Limit** — staff members who have exceeded 15 credits

The **Priority Alerts** panel lists issues that require immediate attention (e.g. over-capacity labs, overloaded lecturers, unmoderated sections) with direct links to the relevant tool.

The **Department Snapshot** card shows staff allocation status (optimal, under-allocated, over-allocated) and lists urgent unassigned courses.

A monthly calendar at the bottom displays upcoming deadlines, leave periods, and service activities.

---

## My Queue

The coordinator's queue shows incoming assignment requests. From here you can:

- Review incoming requests from lecturers who have declined an assignment
- Manage your own assignment inbox

---

## My Courses

A personal view of the coordinator's own teaching and moderator assignments for the current semester.

---

## My Activity Tracker

Log and manage your own scholarly activities (Research, Grant, Service). Activities can be added, viewed, and deleted. A confirmation dialog is shown before deletion.

---

## Course & Moderator Manager

A table of all current course-section assignments showing:

- Course code and name
- Section number
- Credit value
- Assigned lecturer and their acceptance status (Accepted / Pending / Rejected)
- Moderator 1 and Moderator 2 slots

You can reassign moderators inline. Business rules enforced:

- The assigned lecturer cannot be selected as a moderator for their own section
- The same person cannot fill both moderator slots
- Each section supports a maximum of two moderators

---

## Student Segmentation

A demographic breakdown of enrolled students per course, showing:

- Local (Tempatan) count
- International (Antarabangsa) count
- Total enrollment
- Normal intake vs. direct intake split
- Local and international percentages

An intake filter (All / Normal / Direct) switches the table to show only the selected intake type. Summary cards at the top show department-wide totals.

---

## Lab Resource Planner

The Lab Resource Planner has three tabs:

### Assignment tab
A grid mapping course sections to laboratory spaces. For each section, select a lab from the dropdown. The system checks whether the section's enrollment exceeds the lab's stated capacity and flags over-capacity allocations with a warning indicator.

### Validation tab
A summary of all section-lab pairings showing enrollment vs. capacity and a status (Valid / Over Capacity / No Lab Assigned).

### Configuration tab
Manage the list of available laboratories (name and capacity). Labs can be added, edited, or removed.

---

## Course Catalog

A table of all course sections with:

- Course code, section, course name
- Credit value, year level, enrollment
- Assignment status (Assigned / Unassigned)

You can:

- Filter by status (All / Unassigned / Assigned)
- Add a new section via the Add Course button
- Click a row to view section details and navigate to the Assignment Tool

---

## Assignment Tool

The primary workflow for sending teaching assignments to lecturers.

1. Select a course section from the course selector on the left
2. Choose a lecturer from the right panel (their live credit load is shown)
3. Optionally assign up to two moderators (respecting the moderator rules)
4. Click Send Assignment

The system enforces that:

- The projected load of accepting this assignment does not exceed 15 credits (shown in real time)
- The selected moderators are not the same as the assigned lecturer
- Both moderator slots are not filled with the same person

After sending, an audit record is written and the assignment appears in the lecturer's queue.

An exemption management section allows the coordinator to record special circumstances (Maternity Leave, Hired from outside the university, Borrowed from another department) for individual lecturers. An active exemption lifts the 12-credit rejection floor for that lecturer but never raises the 15-credit cap.

---

## System Audit

The System Audit page shows a full, timestamped log of all significant actions taken during the current browser session. Entries include:

- Action type (Assignment Sent, Assignment Accepted, Staff Status Updated, Export Generated, etc.)
- Actor name
- Status (Success / Warning / Blocked)
- Details

The audit log resets when the page is reloaded. A persistent database-backed audit log is planned for a future phase.

---

## Export Reports

Generate MJIIT ESE Excel workbooks or CSV files from the current frontend data.

See the [Report Export](report-export.md) guide for full details on scope selection, format options, filename conventions, and known limitations.
