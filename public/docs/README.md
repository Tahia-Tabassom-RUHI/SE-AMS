# SE-AMS Documentation

SE-AMS (SE Academic Management System) is a responsive, role-based web prototype built for the Software Engineering department at MJIIT, Universiti Teknologi Malaysia.

> **This is a frontend prototype.** All data is currently held in in-memory mock state. Changes do not persist across page reloads. A MySQL backend and Express API are planned for a future phase.

---

## What SE-AMS does

SE-AMS replaces fragmented spreadsheets and manual workflows with a single, policy-aware interface for:

- Managing teaching-load assignments with automatic 12–15 credit validation
- Reviewing student demographic segmentation by origin and intake type
- Allocating laboratory spaces and detecting over-capacity conflicts
- Tracking staff research, grant, and service activities
- Generating MJIIT ESE Excel workbooks and CSV reports for institutional use

---

## Current status

| Capability | Status |
|---|---|
| Coordinator and Lecturer role-based UI | Implemented |
| Responsive layout (desktop / tablet / mobile) | Implemented |
| Teaching workload monitoring and enforcement | Implemented |
| Assignment queue (send / accept / decline) | Implemented |
| Course and moderator management | Implemented |
| Student segmentation | Implemented |
| Lab resource planning | Implemented |
| Course catalog | Implemented |
| System audit log | Implemented (session-only) |
| XLSX and CSV report generation | Implemented (frontend data) |
| Mock demo authentication | Active |
| Express REST backend | Planned |
| MySQL persistence | Planned |
| JWT authentication | Planned |
| Database-backed export | Planned |
| AI coordinator assistant | Planned |
| Document import and extraction | Planned |

---

## Quick navigation

| Document | Purpose |
|---|---|
| [Getting Started](getting-started.md) | Install, run, and log in |
| [Coordinator Guide](coordinator-guide.md) | Full walkthrough of coordinator tools |
| [Lecturer Guide](lecturer-guide.md) | Lecturer-specific workflows |
| [Business Rules](business-rules.md) | Workload, exemption, moderator, and lab rules |
| [Report Export](report-export.md) | XLSX and CSV generation reference |
| [System Architecture](system-architecture.md) | Current and planned technical architecture |
| [Development Guide](development.md) | Folder structure, contexts, build and deploy |
| [Roadmap](roadmap.md) | Completed, in-progress, and planned work |

---

## Live demo

**Application:** https://tahia-tabassom-ruhi.github.io/SE-AMS/

**Demo credentials:**

| Role | Email | Password |
|---|---|---|
| Coordinator | `coordinator@utm.my` | `utm123` |
| Lecturer | `lecturer@utm.my` | `utm123` |
