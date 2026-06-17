# Business Rules

This page documents the academic policy rules that SE-AMS enforces. All rules are implemented in the frontend prototype. Backend enforcement is planned for a future phase.

---

## Teaching workload

### Normal range

The expected teaching load for a lecturer in any given semester is between **12 and 15 credits**.

### 15-credit maximum (unconditional)

A lecturer's total accepted credit load must not exceed **15 credits**. This ceiling is enforced unconditionally.

- Accepting a request that would take the total above 15 credits is blocked.
- The Accept button is disabled with a tooltip.
- No exemption, override, or special status can raise this ceiling.

**Implementation:** `LecturerQueueContent.tsx` — `if (newLoad > 15)` — no exemption check wraps this condition.

### 12-credit rejection floor

A lecturer who has accepted fewer than **12 credits** cannot decline an assignment unless an active exemption is in place.

- The Decline button is disabled below 12 credits with no active exemption.
- On small screens, an amber banner replaces the tooltip.

**Implementation:** `LecturerQueueContent.tsx` — `isDeclineBlocked = user?.role === 'lecturer' && currentLoad < 12 && !isExemptionActive`

---

## Exemptions

A Coordinator can record a special administrative status for a lecturer, which may affect the rejection floor.

### Exemption types

| Type | Internal value |
|---|---|
| Maternity Leave | `Maternity Leave` |
| Hired from outside the university | `Adjunct Status` |
| Borrowed from another department | `Borrowed Staff` |

> The display labels ("Hired from outside the university" and "Borrowed from another department") are shown throughout the UI. The internal values are used only for logic.

### Exemption date range

An exemption has a start date and an expiry date. The exemption is only considered active if today falls within that date range. Outside the range, it has no effect.

### What an exemption changes

| Rule | Without exemption | With active exemption |
|---|---|---|
| 15-credit maximum | Blocked | Still blocked (no change) |
| 12-credit rejection floor | Cannot decline below 12 | Can decline below 12 |

An exemption only lifts the rejection floor. It never raises or removes the 15-credit cap.

---

## Moderators

### Slot limit

Each course section supports a maximum of **two moderator slots** (Moderator 1 and Moderator 2). Both slots are optional; a section may have zero, one, or two moderators.

### Exclusion: assigned lecturer

The lecturer assigned to teach a section cannot also be a moderator for that same section. Selecting the assigned lecturer in a moderator slot is blocked.

### Exclusion: duplicate selection

The same person cannot fill both Moderator 1 and Moderator 2 slots simultaneously.

---

## Lab allocation

### Capacity check

When a Coordinator assigns a laboratory to a course section, the system compares:

```
section.studentCount > lab.capacity
```

If enrollment exceeds capacity, the allocation is flagged as **Over Capacity** and the row is highlighted with a warning indicator.

### Over-capacity behaviour

Over-capacity allocations are flagged visually but are not hard-blocked in the current prototype. A future enforcement mode may prevent saving over-capacity allocations.

---

## Staff statuses

Staff status is a metadata attribute on a staff record, separate from the login role.

| Status label | Internal value |
|---|---|
| On Leave | `onleave` |
| Hired from outside the university | `adjunct` |
| Borrowed from another department | `seconded` |

A staff member marked On Leave still logs in as a Lecturer. Their status may be visible on their profile and in coordinator views, but it does not change their access level.
