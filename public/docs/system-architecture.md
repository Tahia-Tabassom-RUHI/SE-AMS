# System Architecture

---

## Current architecture (frontend prototype)

SE-AMS is currently a pure client-side React application. There is no backend server or database.

```
Browser
└── React 18 + Vite
    ├── React Router (hash-based routing)
    │   ├── /login         → Login component
    │   ├── /dashboard     → Role-based dashboard
    │   ├── /queue         → Assignment queue
    │   ├── /my-courses    → Personal course list
    │   ├── /my-activity   → Personal activity tracker
    │   ├── /course-moderator  [Coordinator]
    │   ├── /segmentation      [Coordinator]
    │   ├── /lab-planner       [Coordinator]
    │   ├── /course-catalog    [Coordinator]
    │   ├── /assignment        [Coordinator]
    │   ├── /system-audit      [Coordinator]
    │   └── /export-reports    [Coordinator]
    │
    ├── React Contexts (in-memory state)
    │   ├── AuthContext     — demo login, user role, profile
    │   └── AppDataContext  — staff, courses, assignments, audit log
    │
    ├── Mock data (src/app/data/mockData.ts)
    │   ├── mockStaff       — 8 staff members
    │   └── mockCourses     — 9 course records
    │
    ├── Component-local data (replicated in export utility)
    │   ├── StudentSegmentation.allData
    │   ├── LabResourcePlanner.mockSections + mockLabs
    │   ├── StaffActivityTracker.mockActivities
    │   └── CourseModeratorManager.mockAssignments
    │
    └── Report export (src/app/utils/reportExport.ts)
        └── SheetJS (xlsx) → Blob → browser download
```

### Data flow

1. The user logs in with a hardcoded email/password pair.
2. The `AuthContext` stores the user object in `localStorage`.
3. All application data lives in `AppDataContext` (React `useState`).
4. Actions (accepting an assignment, updating a status) call context methods that update React state.
5. On page reload, context state is reset. `localStorage` only persists the logged-in user token.
6. The Export Reports page calls `generateXlsx` or `generateCsvFiles` from the report utility, which reads from hardcoded data arrays and triggers a browser download directly.

---

## Planned architecture

The diagram below represents the target state after backend integration. None of this exists yet.

```
Browser (React frontend)
│
│  HTTPS
▼
Express REST API (Node.js)
├── POST /auth/login         → bcrypt verify → JWT
├── GET  /staff              → list staff with loads
├── GET  /courses            → list sections
├── POST /assignments        → send assignment
├── PUT  /assignments/:id    → accept / decline
├── GET  /labs               → list labs
├── PUT  /labs/:id           → update lab config
├── GET  /activities         → list activities
├── POST /activities         → add activity
├── GET  /reports/xlsx       → generate and stream .xlsx
├── GET  /reports/csv/:scope → generate and stream .csv
└── GET  /audit              → paginated audit log
│
│  SQL
▼
MySQL database
├── users           (id, name, email, password_hash, role, staff_id)
├── staff_status    (staff_id, status, exemption_type, start_date, expiry_date)
├── courses         (id, code, name, section, credits, year, enrollment)
├── assignments     (id, course_id, lecturer_id, status, sent_at, responded_at)
├── moderators      (assignment_id, slot, staff_id)
├── labs            (id, name, building, room, capacity, type)
├── lab_allocations (course_id, lab_id, used_for, used_during)
├── activities      (id, staff_id, title, type, hours, mode, date, source)
└── audit_log       (id, timestamp, actor_id, action, status, details)
```

### Planned authentication flow

```
Client                  Express API             MySQL
  │                         │                     │
  │── POST /auth/login ────►│                     │
  │   { email, password }   │── SELECT user ─────►│
  │                         │◄─ user row ──────────│
  │                         │── bcrypt.compare()   │
  │◄── 200 { jwt } ─────────│                     │
  │                         │                     │
  │── GET /staff ──────────►│                     │
  │   Authorization: Bearer │── SELECT * FROM ────►│
  │                         │   staff …           │
  │◄── 200 [staff array] ───│◄─ rows ──────────────│
```

---

## Report export architecture

### Current

```
ExportReports.tsx
  └── reportExport.ts
        ├── reads fixed data arrays
        └── SheetJS → Blob → anchor.click()
```

### Planned

```
ExportReports.tsx
  └── reportExport.ts (or API call)
        ├── GET /reports/xlsx?scopes=…&semester=…&session=…
        │     └── Express: fetch from MySQL → SheetJS → stream
        └── browser receives streamed file → download
```

The `reportExport.ts` utility is written with separable data-source and generation concerns so that the data arrays can later be replaced with API responses without rewriting the SheetJS logic.

---

## Routing

SE-AMS uses `createHashRouter` (React Router v7). Hash-based routing (`#/login`, `#/dashboard`) avoids the need for server-side routing configuration, which is important for GitHub Pages deployment.

All routes are protected by `ProtectedRoute`. Routes marked `requiredRole="coordinator"` redirect Lecturers to the dashboard if accessed directly.

---

## Styling

Tailwind CSS v4 is loaded through the `@tailwindcss/vite` plugin. There is no `tailwind.config.ts` — configuration is done entirely through CSS custom properties in `src/styles/theme.css`:

| Variable | Value |
|---|---|
| `--primary` | `#900021` (MJIIT maroon) |
| `--secondary` | `#5C001F` (dark maroon) |

Radix UI primitives are used for all interactive components (dialogs, selects, sheets, checkboxes, tooltips, alerts) to ensure accessible keyboard and screen-reader behaviour.
