# Report Export

The Export Reports page is accessible to Coordinators via the sidebar. It generates real downloadable files using SheetJS (xlsx) from the current frontend mock data.

---

## Configuration

Before generating, select:

| Setting | Options |
|---|---|
| Template | MJIIT ESE Legacy Format (2025/2026) or (2024/2025) |
| Semester | Semester 1 or Semester 2 |
| Session | 2024/2025 or 2025/2026 |
| Data scopes | One or more checkboxes (see below) |
| File format | .xlsx or .csv |

---

## Data scopes

Five scopes are available. Each scope corresponds to one worksheet (XLSX) or one file (CSV):

| Scope label | Sheet name in XLSX | Data source |
|---|---|---|
| Course Offerings & Teaching Load | Teaching Load | CourseModeratorManager assignments + mockCourses |
| Staff Workload Summary | Workload Summary | mockStaff (all 8 staff members) |
| Student Segmentation (Year/Origin/Intake) | Student Segmentation | StudentSegmentation.allData (6 courses) |
| Lab Resource Schedule | Lab Schedule | LabResourcePlanner sections and labs (10 rows) |
| Staff Activity Log (Hybrid) | Activity Log | StaffActivityTracker.mockActivities (9 activities) |

You may select any combination of scopes. If no scope is selected, the Generate Report button triggers a validation message and no file is downloaded.

---

## XLSX format

When you select `.xlsx` and click **Generate Full Report**:

1. SheetJS creates a new workbook
2. One worksheet is appended for each selected scope, in the order shown in the UI
3. Column widths are auto-sized based on content
4. Numeric values (credits, hours, student counts, capacities, percentages) are stored as numbers, not text
5. The workbook is downloaded immediately

**Filename format:**

```
SE-AMS_MJIIT-ESE_Semester-1_2024-2025.xlsx
```

The semester and session values come from your selections.

---

## CSV format

CSV cannot contain multiple worksheets. When you select `.csv`:

- One `.csv` file is generated and downloaded for each selected scope
- Each file is independent
- Files download sequentially

**UTF-8 BOM:** Each CSV file includes a UTF-8 BOM (`﻿`) at the start so that Microsoft Excel opens the file with correct encoding without requiring a manual import step.

**Filename format (one file per scope):**

```
SE-AMS_Teaching-Load_Semester-1_2024-2025.csv
SE-AMS_Workload-Summary_Semester-1_2024-2025.csv
SE-AMS_Student-Segmentation_Semester-1_2024-2025.csv
SE-AMS_Lab-Schedule_Semester-1_2024-2025.csv
SE-AMS_Activity-Log_Semester-1_2024-2025.csv
```

---

## Progress indicator

During generation, the progress bar shows four states:

| State | Progress |
|---|---|
| Validating selections | 10% |
| Preparing data | 35% |
| Generating file | 65% |
| Download complete | 100% |

The Generate Report button is disabled while generation is in progress to prevent duplicate downloads.

---

## Audit record

An audit entry is written to the session audit log **only after** a successful download. If an error occurs during file generation, no audit record is created and the button re-enables so you can try again.

---

## Header preview

Below the configuration card, a Header Preview section shows example column headers and sample rows for each sheet. Use the tab switcher to preview each scope. This preview reflects the MJIIT ESE legacy column structure.

---

## Column reference

### Teaching Load (31 columns)

Category, Year, Course Code, Course Name, Section, Pre-requisite, Lecturer's Name, Credit, Final Exam, Lecture (hrs), Combined Lecture?, Tutorial (hrs), Lab (hrs), No. of Students, Course Coordinator, Coordinator's Dept, Lab Name, Lab Capacity, Lab Used For, Lab Used During, Y1 Normal, Y1 Direct, Y2 Normal, Y2 Direct, Y3 Normal, Y3 Direct, Y4 Normal, Y4 Direct, Moderator 1, Moderator 2, Notes

### Workload Summary (5 columns)

No., Name of Lecturer, No. of Classes, No. of Sections, No. of Subjects

### Student Segmentation (9 columns)

Course Code, Course Name, Local (Tempatan), International (Antarabangsa), Total, Normal Intake, Direct Intake, Local %, Int'l %

### Lab Schedule (9 columns)

Course Code, Course Name, Section, Enrollment, Lab Name, Lab Capacity, Lab Used For, Lab Used During, Status

### Activity Log (7 columns)

Staff Name, Activity Title, Type, Hours Spent, Mode, Date Submitted, Source

---

## Known limitations

- All exported data comes from static frontend mock datasets. It does not reflect live database records.
- Changes made during the session (e.g. lab allocations you configure) are **not** included in the exported data, because the export utility reads from the fixed mock data arrays.
- The export cannot be triggered from outside the browser; no server-side generation is available.

---

## Planned: database-backed export

In a future phase, the export utility (`src/app/utils/reportExport.ts`) is designed so that the data source can be replaced with API-fetched records without changing the SheetJS generation logic or the ExportReports component. The row-builder functions will accept injected data arrays instead of reading from local constants.
