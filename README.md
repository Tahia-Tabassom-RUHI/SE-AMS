# SE-AMS — SE Academic Management System

A responsive, role-based web prototype for academic administration in the Software Engineering department at MJIIT, Universiti Teknologi Malaysia.

**Live demo:** https://tahia-tabassom-ruhi.github.io/SE-AMS/
**Documentation:** [docs/](public/docs/README.md)

---

## Subsystem Work Distribution

The approved proposal defines three main subsystems. In the implemented prototype, several high-level proposal modules are represented by separate pages and components. The distribution below therefore shows both the official subsystem ownership and the implementation-level modules and use cases currently documented for each member.

### Subsystem 1 — User & Teaching Load Management

**Primary owner:** Abdelrahman Hassan

**Implementation total:** 4 modules and 7 use cases

| Implementation Module | Associated Use Cases |
|---|---|
| User Authentication Module | UC-01 Log In; UC-02 Log Out |
| Coordinator Assignment Tool Module | UC-04 Assign Course Section to Lecturer; UC-05 Validate Projected Workload |
| Lecturer Pending Assignment Queue Module | UC-18 Accept Assignment; UC-19 Decline Assignment |
| My Courses Module | UC-20 View My Courses |

This subsystem covers authentication, teaching-assignment dispatch, workload validation, Lecturer responses, and confirmed teaching assignments. The My Courses module is included here because it displays confirmed course assignments, accumulated teaching credits, and remaining workload capacity.

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

This subsystem covers administrative dashboards, course planning, moderator management, status exemptions, assignment monitoring, institutional report export, and audit review. The Staff Leave and Status interface is currently implemented as a tab inside the Assignment Tool page, but its functional ownership remains under Reporting & Academic Planning because it implements the proposal's Status Exemption Override module.

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

This subsystem covers personal and Coordinator-facing activity records, the simulated ORCID workflow, profile and ORCID setup, laboratory-capacity validation, and student-intake segmentation.

### Distribution Summary

| Team Member | Primary Subsystem | Proposal-Level Modules | Implementation Modules | Use Cases |
|---|---|---:|---:|---:|
| Abdelrahman Hassan | User & Teaching Load Management | 3 | 4 | 7 |
| Tahia Tabassom Khan | Reporting & Academic Planning | 4 | 7 | 9 |
| Yibriw Binsama-ae | Activity Tracking & Resource Validation | 3 | 5 | 9 |
| **Total** | **3 subsystems** | **10** | **16** | **25** |

The proposal contains 10 high-level modules. The prototype expands several of those modules into separate implementation-level pages and components, resulting in 16 documented modules and 25 use cases. Module and use-case counts are not intended to measure effort by quantity alone: the subsystems differ in business-rule complexity, shared-state behaviour, validation requirements, and number of user interfaces.

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

The project follows a vertical-slicing approach. Each member owns one approved subsystem and contributes across its interface, application logic, data design, documentation, and testing. The proposal defines the primary subsystem ownership, while the implementation separates some proposal-level modules into multiple pages and components. The technical lead titles represent additional project-wide responsibilities and do not replace the approved subsystem ownership.

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

---

## Module Index

> Component map linking each use case to its actual source file. FrontEnd links are relative paths — click to open on GitHub. BackEnd and Database columns are planned (not yet implemented).

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?logo=tailwindcss) ![SheetJS](https://img.shields.io/badge/SheetJS-xlsx_0.18.5-green)

---

<h4>SUBSYSTEM 1 — USER &amp; TEACHING LOAD MANAGEMENT</h4>
<strong>Developer: ABDELRAHMAN HASSAN</strong>

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #999; padding: 8px;">Sprint</th>
<th style="border: 1px solid #999; padding: 8px;">Module</th>
<th style="border: 1px solid #999; padding: 8px;">FrontEnd</th>
<th style="border: 1px solid #999; padding: 8px;">BackEnd (Planned)</th>
<th style="border: 1px solid #999; padding: 8px;">Database (Planned)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #999; padding: 8px;">1</td>
<td style="border: 1px solid #999; padding: 8px;">User Login Module (UC-01)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/Login.tsx">Login.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• authRoutes.js<br>• authController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• academic_staff<br>• auth_tokens</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">1</td>
<td style="border: 1px solid #999; padding: 8px;">User Logout &amp; Session (UC-02)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/contexts/AuthContext.tsx">AuthContext.tsx</a> (logout logic)</li><li><a href="./src/app/components/ProtectedRoute.tsx">ProtectedRoute.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• authRoutes.js (logout endpoint)</td>
<td style="border: 1px solid #999; padding: 8px;">• auth_tokens</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Coordinator Assignment Tool (UC-04)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/pages/AssignmentTool.tsx">AssignmentTool.tsx</a></li><li><a href="./src/app/components/LecturerSelector.tsx">LecturerSelector.tsx</a></li><li><a href="./src/app/components/StaffContextCard.tsx">StaffContextCard.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• assignmentRoutes.js<br>• assignmentController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• assignment_requests<br>• course_sections</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Workload Validator Module (UC-05)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/WorkloadGauge.tsx">WorkloadGauge.tsx</a></li><li><a href="./src/app/components/WorkloadMonitor.tsx">WorkloadMonitor.tsx</a></li><li><a href="./src/app/components/LecturerWorkloadGauge.tsx">LecturerWorkloadGauge.tsx</a></li><li><a href="./src/app/components/ValidationFlowDiagram.tsx">ValidationFlowDiagram.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• workloadValidator.js (middleware)</td>
<td style="border: 1px solid #999; padding: 8px;">• course_sections<br>• academic_staff</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Staff Leave &amp; Exemption (UC-06)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/AdministrativeStatusModal.tsx">AdministrativeStatusModal.tsx</a></li><li><a href="./src/app/components/LecturerOnLeaveQueue.tsx">LecturerOnLeaveQueue.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• exemptionRoutes.js<br>• exemptionController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• staff_exemptions</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Pending Assignment Queue (UC-18)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/LecturerQueue.tsx">LecturerQueue.tsx</a></li><li><a href="./src/app/components/LecturerQueueContent.tsx">LecturerQueueContent.tsx</a></li><li><a href="./src/app/components/QueueTable.tsx">QueueTable.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• queueRoutes.js<br>• queueController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• assignment_requests<br>• my_courses</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Decline Assignment Module (UC-19)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/DeclineModal.tsx">DeclineModal.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• declineRoutes.js<br>• declineController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• assignment_requests<br>• audit_logs</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">4</td>
<td style="border: 1px solid #999; padding: 8px;">System Audit Backend (UC-16)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/SystemAuditLog.tsx">SystemAuditLog.tsx</a></li><li><a href="./src/app/pages/SystemAudit.tsx">SystemAudit.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• auditRoutes.js<br>• auditController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• audit_logs</td>
</tr>
</tbody>
</table>

---

<h4>SUBSYSTEM 2 — REPORTING &amp; ACADEMIC PLANNING</h4>
<strong>Developer: TAHIA TABASSOM KHAN</strong>

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #999; padding: 8px;">Sprint</th>
<th style="border: 1px solid #999; padding: 8px;">Module</th>
<th style="border: 1px solid #999; padding: 8px;">FrontEnd</th>
<th style="border: 1px solid #999; padding: 8px;">BackEnd (Planned)</th>
<th style="border: 1px solid #999; padding: 8px;">Database (Planned)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #999; padding: 8px;">1</td>
<td style="border: 1px solid #999; padding: 8px;">Coordinator Dashboard (UC-03)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/pages/CoordinatorDashboard.tsx">CoordinatorDashboard.tsx (page)</a></li><li><a href="./src/app/components/CoordinatorDashboard.tsx">CoordinatorDashboard.tsx (component)</a></li><li><a href="./src/app/components/SummaryBar.tsx">SummaryBar.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• dashboardRoutes.js<br>• dashboardController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• assignment_requests<br>• academic_staff</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">1</td>
<td style="border: 1px solid #999; padding: 8px;">Lecturer Dashboard (UC-17)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/pages/LecturerDashboard.tsx">LecturerDashboard.tsx</a></li><li><a href="./src/app/pages/RoleDashboard.tsx">RoleDashboard.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• dashboardRoutes.js (lecturer view)</td>
<td style="border: 1px solid #999; padding: 8px;">• my_courses<br>• assignment_requests</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Assignment Status Board (UC-07)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/AssignmentStatusBoard.tsx">AssignmentStatusBoard.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• statusRoutes.js<br>• statusController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• assignment_requests</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Course &amp; Moderator Manager (UC-08)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/CourseModeratorManager.tsx">CourseModeratorManager.tsx</a></li><li><a href="./src/app/components/ModeratorSection.tsx">ModeratorSection.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• moderatorRoutes.js<br>• moderatorController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• moderator_assignments<br>• course_sections</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Course Catalog Viewer (UC-09)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/pages/CourseCatalog.tsx">CourseCatalog.tsx</a></li><li><a href="./src/app/components/CourseSelector.tsx">CourseSelector.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• catalogRoutes.js<br>• catalogController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• course_sections</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Add Section Module (UC-10)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/SectionDetailsModal.tsx">SectionDetailsModal.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• catalogRoutes.js (POST /sections)</td>
<td style="border: 1px solid #999; padding: 8px;">• course_sections</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">4</td>
<td style="border: 1px solid #999; padding: 8px;">My Courses Module (UC-20)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/MyCourses.tsx">MyCourses.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• courseRoutes.js<br>• courseController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• my_courses</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">4</td>
<td style="border: 1px solid #999; padding: 8px;">Legacy Excel Export (UC-15)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/ExportReports.tsx">ExportReports.tsx</a></li><li><a href="./src/app/utils/reportExport.ts">reportExport.ts</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• exportRoutes.js<br>• exportController.js (SheetJS)</td>
<td style="border: 1px solid #999; padding: 8px;">• all tables (read-only)</td>
</tr>
</tbody>
</table>

---

<h4>SUBSYSTEM 3 — ACTIVITY TRACKING &amp; RESOURCE VALIDATION</h4>
<strong>Developer: YIBRIW BINSAMA-AE</strong>

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #999; padding: 8px;">Sprint</th>
<th style="border: 1px solid #999; padding: 8px;">Module</th>
<th style="border: 1px solid #999; padding: 8px;">FrontEnd</th>
<th style="border: 1px solid #999; padding: 8px;">BackEnd (Planned)</th>
<th style="border: 1px solid #999; padding: 8px;">Database (Planned)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Add Activity Module (UC-21)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/MyActivityTracker.tsx">MyActivityTracker.tsx</a></li><li><a href="./src/app/components/AddActivityModal.tsx">AddActivityModal.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• activityRoutes.js<br>• activityController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• staff_activities</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">ORCID Fetch Integration (UC-22)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/ProfileORCIDSetup.tsx">ProfileORCIDSetup.tsx</a></li><li><a href="./src/app/components/ResearchDrawer.tsx">ResearchDrawer.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• orcidService.js (external API call)</td>
<td style="border: 1px solid #999; padding: 8px;">• academic_staff (orcid_id field)</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Edit &amp; Delete Activity (UC-23, UC-24)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/MyActivityTracker.tsx">MyActivityTracker.tsx</a></li><li><a href="./src/app/components/ActivityTracker.tsx">ActivityTracker.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• activityRoutes.js (PUT, DELETE)</td>
<td style="border: 1px solid #999; padding: 8px;">• staff_activities</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">2</td>
<td style="border: 1px solid #999; padding: 8px;">Profile &amp; ORCID Setup (UC-25)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/ProfileORCIDSetup.tsx">ProfileORCIDSetup.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• profileRoutes.js<br>• profileController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• academic_staff</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Staff Activity Tracker (UC-14)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/StaffActivityTracker.tsx">StaffActivityTracker.tsx</a></li><li><a href="./src/app/components/ActivityLogPortal.tsx">ActivityLogPortal.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• activityRoutes.js (coordinator view)</td>
<td style="border: 1px solid #999; padding: 8px;">• staff_activities</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Lab Resource Planner (UC-11, UC-12)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/LabResourcePlanner.tsx">LabResourcePlanner.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• labRoutes.js<br>• labController.js</td>
<td style="border: 1px solid #999; padding: 8px;">• laboratories<br>• lab_allocations</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">3</td>
<td style="border: 1px solid #999; padding: 8px;">Student Segmentation (UC-13)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/StudentSegmentation.tsx">StudentSegmentation.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• segmentationRoutes.js</td>
<td style="border: 1px solid #999; padding: 8px;">• student_enrollments</td>
</tr>
<tr>
<td style="border: 1px solid #999; padding: 8px;">4</td>
<td style="border: 1px solid #999; padding: 8px;">System Audit Frontend (UC-16)</td>
<td style="border: 1px solid #999; padding: 8px;"><ul><li><a href="./src/app/components/SystemAuditLog.tsx">SystemAuditLog.tsx</a></li><li><a href="./src/app/pages/SystemAudit.tsx">SystemAudit.tsx</a></li></ul></td>
<td style="border: 1px solid #999; padding: 8px;">• reads from auditRoutes.js (GET only)</td>
<td style="border: 1px solid #999; padding: 8px;">• audit_logs (read-only)</td>
</tr>
</tbody>
</table>

---

### Shared / Supporting Files

These files are shared across all subsystems and do not belong to a single module.

- <a href="./src/app/contexts/AppDataContext.tsx">AppDataContext.tsx</a> — Central state for staff, courses, assignments, and audit log
- <a href="./src/app/contexts/AuthContext.tsx">AuthContext.tsx</a> — Login state, logout, role checking, localStorage auth persistence
- <a href="./src/app/contexts/ActivityContext.tsx">ActivityContext.tsx</a> — Activity records (Research / Grant / Service) for all staff
- <a href="./src/app/data/mockData.ts">mockData.ts</a> — Demo staff (8 records) and course/section fixtures (9 courses)
- <a href="./src/app/utils/reportExport.ts">reportExport.ts</a> — SheetJS XLSX and CSV generation from frontend state
- <a href="./src/app/components/ProtectedRoute.tsx">ProtectedRoute.tsx</a> — Route guard; redirects unauthenticated users to login
