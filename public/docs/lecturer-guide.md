# Lecturer Guide

Log in with `lecturer@utm.my` / `utm123` to access the lecturer interface. The sidebar shows four items: Dashboard, My Queue, My Courses, and My Activity Tracker.

---

## Dashboard

The lecturer dashboard shows a personal workload summary:

- Current credit load and a visual gauge against the 15-credit maximum
- Colour indicator: green (below 12), amber (12–14), red (15 or above)
- Pending assignment requests
- Quick links to the queue and course list

---

## My Queue

My Queue is the primary action page for a lecturer. When a Coordinator sends a teaching or moderator assignment, it appears here.

### Accepting an assignment

Click **Accept** on a request. The system adds the course credits to your running total. If the addition would take your load above 15 credits, the Accept button is disabled and a tooltip explains why.

### Declining an assignment

Click **Decline** on a request. The system shows a reason-selection dialog. Selecting a reason and confirming sends the decline back to the Coordinator.

**Rejection restriction:** If your current accepted load is below 12 credits and you do not have an active exemption, the Decline button is disabled. A tooltip or banner explains this restriction. See [Business Rules](business-rules.md) for details.

### Request statuses

| Status | Meaning |
|---|---|
| New | Recently received, within the normal response window |
| Expiring | Approaching the Coordinator's deadline |

---

## My Courses

A personal list of courses you have accepted for the current semester, showing:

- Course code, name, and section
- Role (Teaching or Moderator)
- Credit value
- Student count
- Semester

Moderator assignments show 0.5 credits. The list updates when you accept assignments from My Queue.

---

## My Activity Tracker

Log your scholarly activities (Research, Grant, Service) for the semester.

### Adding an activity

Click **Add Activity** and fill in:

- Activity title
- Type (Research / Grant / Service)
- Hours spent
- Mode (Hybrid)
- Date

The activity is added to your personal log immediately. No backend submission occurs in the current version.

### Deleting an activity

Click the delete icon next to any activity. A confirmation dialog asks you to confirm before the record is removed.

### Clearing all activities

The **Clear All** link at the top of the list removes all activities after confirmation. Use with care; this action cannot be undone within the same session.

---

## Profile and ORCID Setup

Accessible from your user avatar or the `/profile` route. The profile page allows you to:

- View your name, staff ID, and email
- Enter or update your ORCID ID in the format `0000-0000-0000-0000`
- Record publication details (title, journal, year)

> **Note:** The ORCID integration is currently a UI prototype only. No real ORCID API calls are made. Entered data is stored in browser state and does not persist after reloading the page.

---

## On Leave status

"On Leave" is a staff *status*, not a login role. If a Coordinator marks you as On Leave, your profile may reflect that status. You still log in as a Lecturer with the same credentials and access the same four sidebar items.

An On Leave status may trigger an exemption on the 12-credit rejection floor, depending on the exemption type the Coordinator configures. See [Business Rules](business-rules.md) for details.
