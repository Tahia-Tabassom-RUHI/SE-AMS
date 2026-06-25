# Development Guide

---

## Prerequisites

- Node.js v18 or later
- npm

---

## Folder structure

```
SE-AMS/
├── public/
│   └── docs/                   ← Docsify documentation site
│       ├── index.html
│       ├── README.md
│       ├── _sidebar.md
│       ├── _coverpage.md
│       └── *.md
│
├── src/
│   ├── app/
│   │   ├── components/         ← Shared and page-level UI components
│   │   │   ├── ui/             ← shadcn-style Radix primitives
│   │   │   ├── ExportReports.tsx
│   │   │   ├── LabResourcePlanner.tsx
│   │   │   ├── StudentSegmentation.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── UnifiedSystemSidebar.tsx
│   │   │   ├── UnifiedTopNav.tsx
│   │   │   └── …
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx      ← User session, login, logout
│   │   │   └── AppDataContext.tsx   ← Staff, courses, assignments, audit log
│   │   │
│   │   ├── data/
│   │   │   └── mockData.ts          ← mockStaff, mockCourses (imported throughout)
│   │   │
│   │   ├── pages/
│   │   │   ├── AssignmentTool.tsx
│   │   │   ├── CourseCatalog.tsx
│   │   │   ├── RoleDashboard.tsx
│   │   │   ├── SystemAudit.tsx
│   │   │   └── …
│   │   │
│   │   ├── utils/
│   │   │   └── reportExport.ts     ← SheetJS XLSX/CSV generation utility
│   │   │
│   │   ├── routes.tsx              ← createHashRouter definition
│   │   └── types.ts                ← Shared TypeScript interfaces
│   │
│   ├── imports/
│   │   └── logo-512x512-1-1.jpg    ← UTM emblem
│   │
│   └── styles/
│       └── theme.css               ← CSS custom properties (maroon palette)
│
├── scripts/
│   └── copy404.js          ← Postbuild: copies index.html → dist/404.html
│
├── index.html              ← Vite root HTML template
├── vite.config.ts
└── package.json
```

---

## Key contexts

### AuthContext (`src/app/contexts/AuthContext.tsx`)

Manages the logged-in user. Exposes `user`, `login`, `logout`, `updateProfile`, `isAuthenticated`, `hasRole`.

Demo credentials are hardcoded in the `MOCK_USERS` record. The `login` function simulates an 800 ms network delay, then validates against this record. The password `utm123` is hardcoded and applies to both demo accounts.

Session persistence uses `localStorage` (`auth_user`, `auth_token`). Tokens are random strings; they are not real JWTs.

### AppDataContext (`src/app/contexts/AppDataContext.tsx`)

Holds all live application data:

- `staff` — array of `Staff` records (initialised from `mockStaff`)
- `assignmentRequests` — pending incoming requests for the lecturer
- `myCourses` — accepted course assignments per user
- `auditLogs` — session-only audit entries

Methods:

| Method | Effect |
|---|---|
| `updateStaffStatus` | Mutates a staff record, writes audit entry |
| `sendAssignment` | Adds to `assignmentRequests`, writes audit entry |
| `acceptAssignment` | Removes from queue, updates load, adds to `myCourses` |
| `declineAssignment` | Removes from queue, writes audit entry |
| `recordAudit` | Appends an audit entry |

---

## Routing

Routes are defined in `src/app/routes.tsx` using `createHashRouter`. Hash-based routing is used so the application works on GitHub Pages without server configuration.

Protected routes use the `ProtectedRoute` component, which redirects unauthenticated users to `/login` and enforces role restrictions.

---

## Responsive shell

`DashboardLayout.tsx` controls the application shell:

- Desktop (`lg` and above): permanent sidebar rendered by `UnifiedSystemSidebar`
- Below `lg`: the sidebar is hidden; a hamburger button in `UnifiedTopNav` opens a Radix Sheet drawer

The `drawerOpen` state and `onDrawerClose` handler are defined in `DashboardLayout` and passed as props to `UnifiedSystemSidebar`.

Main content padding: `p-4 sm:p-6 lg:p-8`.

---

## Export utility (`src/app/utils/reportExport.ts`)

Two exported functions:

```typescript
generateXlsx(selectedScopeIds: string[], semester: string, session: string): void
generateCsvFiles(selectedScopeIds: string[], semester: string, session: string): number
```

`generateXlsx` builds one workbook with one worksheet per selected scope, then calls `XLSX.writeFile`.

`generateCsvFiles` builds one worksheet per selected scope, converts each to CSV with a UTF-8 BOM, and triggers a browser download for each. Returns the number of files downloaded.

Each scope has a row builder:

| Function | Scope |
|---|---|
| `buildTeachingRows()` | Course Offerings & Teaching Load |
| `buildWorkloadRows()` | Staff Workload Summary |
| `buildSegmentationRows()` | Student Segmentation |
| `buildLabRows()` | Lab Resource Schedule |
| `buildActivityRows()` | Staff Activity Log |

`mockStaff` and `mockCourses` are imported from `src/app/data/mockData.ts`. The remaining data sources (student segmentation, lab sections, activity records, course-moderator assignments) are replicated as constants inside the utility because they are component-local in their source files.

---

## Build and deploy

```bash
# Development server
npm run dev

# Production build
npm run build
# Vite builds to dist/
# postbuild copies dist/index.html → dist/404.html (for GitHub Pages SPA routing)
# Vite also copies public/ → dist/ automatically, so dist/docs/ is populated

# Deploy to GitHub Pages
npm run deploy
# runs build first (predeploy), then publishes dist/ via gh-pages
```

---

## Safe contribution rules

- Do not modify application logic, business rules, or UI components unless the change is specifically requested.
- Do not add backend code, database schemas, or `.env` files to this repository.
- Do not store secrets, real passwords, or API keys in source files or `VITE_` environment variables that will be committed.
- Run `npm run build` before submitting any changes to confirm the build passes.
- No automated test suite is currently configured; test manually using the demo credentials.
- There is no ESLint or Prettier configuration. Follow the existing code style.
- Do not push directly to `main` without review.

---

## TypeScript note

The project uses TypeScript through Vite's type-stripping pipeline. There is no `tsconfig.json` at the repository root, which means `tsc --noEmit` type-checking is not run as part of the build. Type errors are caught only at edit time (IDE) or may surface as Vite transform warnings.

---

## Team Responsibilities

Roles and subsystem assignments are taken from the approved SE-AMS Project Proposal and the implemented module structure documented in the SRS.

| Member | Technical Role | Primary Subsystem |
|---|---|---|
| Tahia Tabassom Khan | Project Leader & UI Lead | Reporting & Academic Planning |
| Abdelrahman Hassan | Backend Lead | User & Teaching Load Management |
| Yibriw Binsama-ae | Database & Testing Lead | Activity Tracking & Resource Validation |

The proposal determines the approved subsystem ownership. The implementation divides several proposal-level modules into separate pages and components, so the documentation below lists implementation-level modules and use cases without changing the approved ownership.

### Subsystem 1 — User & Teaching Load Management

**Primary owner:** Abdelrahman Hassan

**Implementation total:** 4 modules and 7 use cases

| Implementation Module | Associated Use Cases |
|---|---|
| User Authentication Module | UC-01 Log In; UC-02 Log Out |
| Coordinator Assignment Tool Module | UC-04 Assign Course Section to Lecturer; UC-05 Validate Projected Workload |
| Lecturer Pending Assignment Queue Module | UC-18 Accept Assignment; UC-19 Decline Assignment |
| My Courses Module | UC-20 View My Courses |

This subsystem covers authentication, teaching-assignment dispatch, workload validation, Lecturer responses, and confirmed teaching assignments.

The Backend Lead title describes Abdelrahman Hassan’s additional technical responsibility. The current `main` branch remains a frontend prototype and does not yet contain the planned Express backend.

### Subsystem 2 — Reporting & Academic Planning

**Primary owner:** Tahia Tabassom Khan

**Implementation total:** 7 modules and 9 use cases

| Implementation Module | Associated Use Cases |
|---|---|
| Role-Based Dashboard Module | UC-03 View Coordinator Dashboard; UC-17 View Lecturer Dashboard |
| Course Catalog Module | UC-09 View Course Catalog; UC-10 Add Course Section |
| Course and Moderator Manager Module | UC-08 Manage Course Moderators |
| Staff Leave and Status Module | UC-06 Manage Staff Leave and Status |
| Assignment Status Board Module | UC-07 View Assignment Status Board |
| Legacy SE Excel Export Module | UC-15 Export Reports |
| System Audit Module | UC-16 View System Audit Log |

This subsystem covers administrative dashboards, course planning, moderator management, staff-status exemptions, assignment monitoring, institutional report export, and audit review.

The Staff Leave and Status interface is implemented inside the Assignment Tool page, but its approved functional ownership remains under Reporting & Academic Planning because it represents the proposal’s Status Exemption Override module.

### Subsystem 3 — Activity Tracking & Resource Validation

**Primary owner:** Yibriw Binsama-ae

**Implementation total:** 5 modules and 9 use cases

| Implementation Module | Associated Use Cases |
|---|---|
| Lecturer Activity Tracker Module | UC-21 Add Activity Record; UC-22 Fetch ORCID Publications; UC-23 Edit Activity Record; UC-24 Delete Activity Record |
| Staff Activity Tracker Module | UC-14 View Staff Activity Tracker |
| Profile and ORCID Setup Module | UC-25 View and Update Profile and ORCID Setup |
| Laboratory Resource Planner Module | UC-11 View Lab Resource Planner and Assign Lab; UC-12 Configure Laboratory Records |
| Student Segmentation Module | UC-13 View Student Segmentation |

This subsystem covers personal and Coordinator-facing activity records, the simulated ORCID workflow, profile setup, laboratory-capacity validation, and student-intake segmentation.

The Database & Testing Lead title describes Yibriw Binsama-ae’s additional technical responsibility. The current `main` branch does not yet contain the planned MySQL persistence layer.

### Distribution Summary

| Team Member | Primary Subsystem | Proposal-Level Modules | Implementation Modules | Use Cases |
|---|---|---:|---:|---:|
| Abdelrahman Hassan | User & Teaching Load Management | 3 | 4 | 7 |
| Tahia Tabassom Khan | Reporting & Academic Planning | 4 | 7 | 9 |
| Yibriw Binsama-ae | Activity Tracking & Resource Validation | 3 | 5 | 9 |
| **Total** | **3 subsystems** | **10** | **16** | **25** |

The 10 proposal-level modules expand into 16 implementation-level modules and 25 documented use cases. These counts describe documentation structure, not effort by quantity alone. Each subsystem differs in business rules, validation complexity, state management, user-interface scope, and planned technical responsibilities.
