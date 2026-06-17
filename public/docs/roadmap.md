# Roadmap

---

## Completed

- [x] React + Vite + Tailwind CSS v4 frontend scaffold
- [x] Hash-based routing with React Router v7
- [x] Role-based authenticated routes (Coordinator, Lecturer)
- [x] Demo authentication with localStorage session persistence
- [x] Coordinator dashboard with priority alerts and department snapshot
- [x] Lecturer dashboard with workload gauge
- [x] Assignment queue (send, accept, decline with reason)
- [x] 15-credit cap enforcement — unconditional, no bypass
- [x] 12-credit rejection restriction with exemption override
- [x] Course and moderator manager (up to two moderators per section)
- [x] Moderator exclusion rules (no self-moderation, no duplicate slots)
- [x] Staff administrative status management (On Leave, Hired externally, Borrowed)
- [x] Student segmentation by intake type (normal / direct) and origin (local / international)
- [x] Lab resource planner with capacity validation
- [x] Course catalog with section management
- [x] Personal activity tracker (Research, Grant, Service)
- [x] Staff activity tracker (Coordinator view)
- [x] ORCID profile UI prototype
- [x] System audit log (session-scoped)
- [x] XLSX export via SheetJS (multi-sheet workbook)
- [x] CSV export via SheetJS (one file per scope, UTF-8 BOM)
- [x] Responsive layout — permanent sidebar desktop, Sheet drawer mobile/tablet
- [x] Accessible components via Radix UI
- [x] Docsify documentation site
- [x] GitHub Pages deployment

---

## In progress

- [ ] Centralising component-local mock data into shared context/data modules to reduce duplication between UI components and the export utility

---

## Planned

### Phase 2 — Express REST API

- [ ] Project scaffolding (separate `server/` directory or monorepo workspace)
- [ ] REST endpoints for staff, courses, sections, assignments, labs, activities
- [ ] Input validation (zod or express-validator)
- [ ] Structured error responses
- [ ] CORS configuration for the React frontend

### Phase 3 — MySQL database persistence

- [ ] Database schema and migration scripts
- [ ] ORM or query builder (e.g. Prisma or Knex)
- [ ] Seed scripts for initial department data
- [ ] Persistent audit log table

### Phase 4 — JWT authentication

- [ ] `POST /auth/login` with bcrypt password verification
- [ ] Access token issuance and verification middleware
- [ ] Token refresh or expiry handling
- [ ] Remove `localStorage`-based mock token from the frontend

### Phase 5 — Database-backed report export

- [ ] Replace frontend dummy data in `reportExport.ts` with API-fetched records
- [ ] Server-side SheetJS generation for large datasets
- [ ] Streaming download response to avoid memory issues

### Phase 6 — Controlled document import

- [ ] Upload existing MJIIT Excel workbooks via a secure file input
- [ ] Extract structured records (staff, courses, sections) from the workbook
- [ ] Validation and conflict detection before committing extracted records
- [ ] Audit trail for imported data

### Phase 7 — Coordinator AI assistant (six approved actions only)

The assistant is strictly limited to six predefined safe actions:

1. **Find and update a lab capacity** — locate a lab by name and change its capacity value
2. **Create a new lab** — add a new lab record with name, building, room, and capacity
3. **Find and update ordinary course information** — update course name, credits, or year level
4. **Update section enrollment** — set the student count for a specific section
5. **Show workload or unassigned-section summaries** — read-only display on request
6. **Generate XLSX or CSV reports** — trigger file generation for selected scopes

The assistant **will not:**

- Assign lecturers to sections
- Assign or remove moderators
- Delete academic records
- Modify staff statuses, exemption flags, or leave dates
- Perform any action not in the approved list above

---

## Not planned

- Multi-department support (SE-AMS is scoped to the SE department at MJIIT)
- Student-facing portal
- Mobile native app
- Real-time collaboration or WebSocket updates
