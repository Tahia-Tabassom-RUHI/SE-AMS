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
