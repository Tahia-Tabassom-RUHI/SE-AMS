# SE-AMS — SE Academic Management System

A responsive, role-based web prototype for academic administration in the Software Engineering department at MJIIT, Universiti Teknologi Malaysia.

**Live demo:** https://tahia-tabassom-ruhi.github.io/SE-AMS/
**Documentation:** [docs/](public/docs/README.md)

---

## Project Status

| Item | Status |
|---|---|
| Frontend prototype | Complete |
| Responsive UI (desktop / tablet / mobile) | Complete |
| Mock data and demo authentication | Active |
| XLSX and CSV report generation | Complete |
| Express REST backend | Planned |
| MySQL database persistence | Planned |
| JWT authentication | Planned |
| AI coordinator assistant | Planned |
| Document extraction and import | Planned |

All data is currently held in frontend state. No changes persist across page reloads or browser sessions unless explicitly noted.

---

## Problem Addressed

Software Engineering departments at MJIIT manage lecturer teaching assignments, student demographics, laboratory allocations, and institutional Excel reports largely through fragmented spreadsheets and manual processes. SE-AMS centralises these workflows into a single web interface:

- Teaching load is validated in real time against the 12–15 credit policy
- Student segmentation by origin and intake type is visible at a glance
- Laboratory capacity conflicts are flagged before they cause compliance issues
- MJIIT ESE institutional Excel workbooks can be generated directly from the system

---

## Main Features

### Implemented

- **Role-based interface** — Coordinator and Lecturer views with protected routes
- **Teaching workload monitoring** — live credit gauge per lecturer
- **15-credit maximum enforcement** — unconditional; cannot be bypassed
- **12-credit rejection restriction** — lecturers below 12 accepted credits cannot decline assignments unless an active exemption applies
- **Pending assignment queue** — Coordinators send, Lecturers accept or decline with a reason
- **Course and moderator management** — up to two optional moderators per section; assigned lecturer cannot moderate their own section
- **Staff leave and administrative status** — On Leave, Hired from outside the university, Borrowed from another department
- **Activity tracking** — Research, Grant, and Service activity log with ORCID prototype workflow
- **Student segmentation** — local/international and normal/direct intake breakdowns per course
- **Lab resource planning** — allocation grid with over-capacity detection
- **Course catalog** — section management with assignment-status tracking
- **System audit log** — timestamped record of all significant actions in the session
- **XLSX and CSV report generation** — SheetJS-powered downloads from frontend data
- **Responsive navigation** — permanent sidebar on desktop, Sheet drawer on mobile/tablet

### Simulated (demo data, no real backend)

- Authentication (demo credentials, no real JWT verification)
- ORCID profile link (UI only; no real ORCID API calls)
- Audit persistence (session-only; resets on reload)

### Planned (not yet implemented)

- Express REST API
- MySQL database persistence
- Database-backed export
- AI coordinator assistant
- Controlled document extraction

---

## User Roles

### Coordinator

Access to the full administration suite:

| Sidebar Item | Route |
|---|---|
| Dashboard | `/dashboard` |
| My Queue | `/queue` |
| My Courses | `/my-courses` |
| My Activity Tracker | `/my-activity` |
| Course & Moderator Manager | `/course-moderator` |
| Student Segmentation | `/segmentation` |
| Lab Resource Planner | `/lab-planner` |
| Course Catalog | `/course-catalog` |
| Assignment Tool | `/assignment` |
| System Audit | `/system-audit` |
| Export Reports | `/export-reports` |

### Lecturer

Access to personal tools:

| Sidebar Item | Route |
|---|---|
| Dashboard | `/dashboard` |
| My Queue | `/queue` |
| My Courses | `/my-courses` |
| My Activity Tracker | `/my-activity` |

> **Note:** "On Leave" is a staff *status*, not a login role. A lecturer marked On Leave still logs in as a Lecturer.

---

## Core Business Rules

| Rule | Detail |
|---|---|
| Normal workload range | 12–15 credits |
| Absolute maximum | 15 credits — blocked unconditionally; no exemption can raise this ceiling |
| Rejection restriction | A lecturer below 12 accepted credits cannot decline an assignment |
| Exemption scope | An active exemption lifts only the 12-credit rejection floor; it never raises the 15-credit cap |
| Moderator limit | Each section supports 0, 1, or 2 moderators |
| Moderator exclusion | The assigned lecturer cannot also be a moderator for the same section |
| Duplicate moderator | The same person cannot fill both moderator slots |
| Lab capacity | Allocation is blocked when section enrollment exceeds the lab's stated capacity |

---

## Screenshots

> Screenshots have not yet been captured. Replace the placeholders below with actual screenshots once available.

| Screen | Suggested filename |
|---|---|
| Coordinator Dashboard | `docs/img/coordinator-dashboard.png` |
| Lecturer Dashboard | `docs/img/lecturer-dashboard.png` |
| Assignment Tool | `docs/img/assignment-tool.png` |
| Mobile Navigation Drawer | `docs/img/mobile-nav.png` |
| Lab Resource Planner | `docs/img/lab-planner.png` |
| Export Reports | `docs/img/export-reports.png` |

---

## Demo Access

> These are demo-only credentials. There is no real authentication server.

| Role | Email | Password |
|---|---|---|
| Coordinator | `coordinator@utm.my` | `utm123` |
| Lecturer | `lecturer@utm.my` | `utm123` |

---

## Installation

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Commands

```bash
git clone https://github.com/Tahia-Tabassom-RUHI/SE-AMS.git
cd SE-AMS
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build into `dist/` |
| `npm run deploy` | Build and publish to GitHub Pages via gh-pages |

---

## Report Generation

The Export Reports page (Coordinator only) generates real files from current frontend dummy data using SheetJS.

### XLSX

- Downloads a single `.xlsx` workbook
- Each selected scope becomes one worksheet tab
- Only selected scopes are included
- Filename format: `SE-AMS_MJIIT-ESE_Semester-1_2024-2025.xlsx`

### CSV

- Downloads one `.csv` file per selected scope (CSV cannot contain multiple sheets)
- UTF-8 BOM prepended for correct opening in Microsoft Excel
- Filename format: `SE-AMS_Teaching-Load_Semester-1_2024-2025.csv`

### Available scopes

1. Course Offerings & Teaching Load
2. Staff Workload Summary
3. Student Segmentation (Year/Origin/Intake)
4. Lab Resource Schedule
5. Staff Activity Log (Hybrid)

> MySQL-backed export using live database records is planned for a future phase.

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 6.3.5 | Build tool and dev server |
| TypeScript | — | Type safety |
| React Router | 7.13.0 | Hash-based client routing |
| Tailwind CSS | 4.1.12 | Utility-first styling |
| Radix UI | various | Accessible headless components |
| Lucide React | 0.487.0 | Icon set |
| Recharts | 2.15.2 | Charts |
| SheetJS (xlsx) | 0.18.5 | XLSX and CSV generation |
| Sonner | 2.0.3 | Toast notifications |
| React Hook Form | 7.55.0 | Form management |
| React Day Picker | 8.10.1 | Date picker |

---

## Project Structure

```
SE-AMS/
├── public/
│   └── docs/               ← Docsify documentation site
├── src/
│   ├── app/
│   │   ├── components/     ← UI components (sidebar, forms, modals, tables)
│   │   ├── contexts/       ← AuthContext, AppDataContext (mock state)
│   │   ├── data/           ← mockData.ts (Staff, Course fixtures)
│   │   ├── pages/          ← Top-level page components
│   │   ├── utils/          ← reportExport.ts and other helpers
│   │   ├── routes.tsx      ← createHashRouter definition
│   │   └── types.ts        ← Shared TypeScript interfaces
│   └── imports/            ← Static assets and Figma Make imports
├── scripts/
│   └── copy404.js          ← Copies index.html → 404.html for GitHub Pages SPA routing
├── guidelines/
│   └── Guidelines.md
├── index.html
├── vite.config.ts
└── package.json
```

---

## Responsive Support

SE-AMS is designed to be usable on a range of screen sizes:

| Breakpoint | Sidebar behaviour |
|---|---|
| Desktop (`lg` and above) | Permanent sidebar always visible |
| Tablet and mobile (below `lg`) | Hamburger button opens a Sheet drawer |

Data-heavy tables switch to card layouts on small screens. Modals and forms use fluid widths with `calc(100vw - 2rem)` constraints to avoid overflow on narrow viewports. No specific device certification has been performed.

---

## Known Limitations

- All data is frontend mock state; nothing is stored in a database
- Changes (assignments accepted, activities added, labs configured) reset on page reload
- Authentication is demo-only; no real token validation occurs
- ORCID integration is a UI prototype; no real ORCID API is called
- Export data comes from static frontend dummy datasets, not a live database
- No automated test suite, no ESLint configuration, and full TypeScript strict checking is not configured
- Backend validation of business rules is not yet implemented

---

## Roadmap

### Phase 1 — Shared data layer
- Centralise component-local mock data into shared context modules to reduce duplication

### Phase 2 — Express REST API
- REST endpoints for staff, courses, sections, labs, activities, and assignments
- Input validation and error handling

### Phase 3 — MySQL database persistence
- Schema design and migrations
- ORM or query builder integration
- Persistent audit log

### Phase 4 — JWT authentication
- Real login endpoint with bcrypt password hashing
- Access tokens; route protection at the API level

### Phase 5 — Database-backed XLSX and CSV export
- Replace frontend dummy data with live database queries
- Server-side SheetJS generation with streaming download

### Phase 6 — Controlled document import
- Upload and extract structured data from existing MJIIT Excel workbooks
- Validation before committing extracted records

### Phase 7 — Coordinator AI assistant (six approved actions only)
The assistant will support only:
1. Find and update a lab capacity
2. Create a new lab
3. Find and update ordinary course information
4. Update section enrollment
5. Show workload or unassigned-section summaries
6. Generate XLSX or CSV reports

The assistant will **not** assign lecturers, assign moderators, delete academic records, or modify staff statuses automatically.

---

## Documentation

SE-AMS includes a Docsify documentation website containing setup instructions, user guides, business rules, architecture details, report-export guidance, and the development roadmap.

### Open the documentation locally

1. Install the project dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the documentation in your browser:

```text
http://localhost:5173/docs/
```

The main SE-AMS application remains available at:

```text
http://localhost:5173/
```

### Preview the production documentation

Build the project:

```bash
npm run build
```

Start the Vite preview server:

```bash
npx vite preview
```

Open the URL displayed in the terminal, usually:

```text
http://localhost:4173/docs/
```

### Browse the documentation files on GitHub

The Markdown documentation can also be viewed directly in the repository:

[Browse SE-AMS documentation files](public/docs/README.md)

### Deployed documentation

After deployment, the documentation is available under the `/docs/` path of the deployed SE-AMS website:

```text
https://tahia-tabassom-ruhi.github.io/SE-AMS/docs/
```

---

## Team Members

| Name | Project Role | Primary Subsystem |
|---|---|---|
| Tahia Tabassom Khan | Project Leader & UI Lead | Reporting & Academic Planning |
| Abdelrahman Hassan | Backend Lead | User & Teaching Load Management |
| Yibriw Binsama-ae | Database & Testing Lead | Activity Tracking & Resource Validation |

The project follows a vertical-slicing approach. Each member is assigned a primary subsystem and contributes across its interface, application logic, data design, documentation, and testing. The technical lead titles describe each member's additional project-wide area of responsibility.

---

## Academic Supervision

| Position | Name |
|---|---|
| Supervisor | Dr. Halinawati Bt Hirol |
| Advisor | Dr. Zatul Alwani Binti Shaffiei |

---

## Academic Context

- **Course:** SCSE2243 Application Development Project 1
- **Section:** 15
- **Semester:** Semester 2
- **Session:** 2025/2026
- **Group:** Group 4
- **Institution:** Malaysia-Japan International Institute of Technology (MJIIT), Universiti Teknologi Malaysia
- **Supervisor:** Dr. Halinawati Bt Hirol
- **Advisor:** Dr. Zatul Alwani Binti Shaffiei

---

## License

No open-source licence has currently been specified.

This project includes components from [shadcn/ui](https://ui.shadcn.com/) used under the MIT licence, and photos from [Unsplash](https://unsplash.com) used under the Unsplash licence. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for details.
