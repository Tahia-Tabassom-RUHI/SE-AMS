import * as XLSX from 'xlsx';
import { mockStaff, mockCourses } from '../data/mockData';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ExportScopeId =
  | 'course-offerings'
  | 'staff-workload'
  | 'student-segmentation'
  | 'lab-schedule'
  | 'staff-activity';

// ── Scope configuration ───────────────────────────────────────────────────────

export const SCOPE_META: Record<ExportScopeId, { sheetName: string; filenamePart: string }> = {
  'course-offerings':     { sheetName: 'Teaching Load',       filenamePart: 'Teaching-Load' },
  'staff-workload':       { sheetName: 'Workload Summary',     filenamePart: 'Workload-Summary' },
  'student-segmentation': { sheetName: 'Student Segmentation', filenamePart: 'Student-Segmentation' },
  'lab-schedule':         { sheetName: 'Lab Schedule',         filenamePart: 'Lab-Schedule' },
  'staff-activity':       { sheetName: 'Activity Log',         filenamePart: 'Activity-Log' },
};

// ── Source: CourseModeratorManager.mockAssignments ────────────────────────────
// Authoritative: src/app/components/CourseModeratorManager.tsx (component-local)

const cmAssignments = [
  { courseCode: 'SCSE2243', courseName: 'Software Engineering',       section: '01', credits: 3.0, yearLevel: 2, lecturerName: 'Dr. Aisyah Rahman',  lecturerStatus: 'accepted', mod1: 'Prof. Muhammad Ali',  mod2: null as string | null },
  { courseCode: 'CS101',    courseName: 'Introduction to Programming', section: '01', credits: 3.0, yearLevel: 1, lecturerName: 'Dr. Aisyah Rahman',  lecturerStatus: 'pending',  mod1: null as string | null, mod2: null as string | null },
  { courseCode: 'CS202',    courseName: 'Data Structures',             section: '01', credits: 3.0, yearLevel: 2, lecturerName: 'Prof. Muhammad Ali',  lecturerStatus: 'accepted', mod1: 'Dr. Aisyah Rahman',  mod2: 'Dr. Fatimah Zahra' },
  { courseCode: 'CS303',    courseName: 'Database Systems',            section: '01', credits: 3.0, yearLevel: 3, lecturerName: 'Dr. Siti Aminah',     lecturerStatus: 'accepted', mod1: 'Prof. Ibrahim Malik', mod2: null as string | null },
  { courseCode: 'CS404',    courseName: 'Software Engineering',        section: '01', credits: 3.0, yearLevel: 4, lecturerName: 'Dr. Noor Hayati',     lecturerStatus: 'rejected', mod1: null as string | null, mod2: null as string | null },
  { courseCode: 'MA101',    courseName: 'Calculus I',                  section: '02', credits: 4.0, yearLevel: 1, lecturerName: 'Dr. Fatimah Zahra',   lecturerStatus: 'accepted', mod1: null as string | null, mod2: null as string | null },
];

// ── Source: StudentSegmentation.allData ───────────────────────────────────────
// Authoritative: src/app/components/StudentSegmentation.tsx (component-local)

const segmentationData = [
  { courseCode: 'CS101', courseName: 'Introduction to Programming', international: 15, local: 30, total: 45, normal: 35, direct: 10, localPct: 67, intlPct: 33 },
  { courseCode: 'CS202', courseName: 'Data Structures',             international: 12, local: 26, total: 38, normal: 30, direct: 8,  localPct: 68, intlPct: 32 },
  { courseCode: 'CS303', courseName: 'Database Systems',            international: 10, local: 25, total: 35, normal: 28, direct: 7,  localPct: 71, intlPct: 29 },
  { courseCode: 'CS404', courseName: 'Software Engineering',        international: 8,  local: 20, total: 28, normal: 22, direct: 6,  localPct: 71, intlPct: 29 },
  { courseCode: 'MA101', courseName: 'Calculus I',                  international: 18, local: 32, total: 50, normal: 40, direct: 10, localPct: 64, intlPct: 36 },
  { courseCode: 'CS205', courseName: 'Algorithms',                  international: 10, local: 22, total: 32, normal: 26, direct: 6,  localPct: 69, intlPct: 31 },
];

// ── Source: LabResourcePlanner mock data ──────────────────────────────────────
// Authoritative: src/app/components/LabResourcePlanner.tsx (component-local)

const labsData = [
  { name: 'Lab A-101', capacity: 35, type: 'Computer Lab' },
  { name: 'Lab B-202', capacity: 35, type: 'Electronics Lab' },
  { name: 'Lab C-303', capacity: 50, type: 'Programming Lab' },
  { name: 'Lab D-101', capacity: 30, type: 'Networking Lab' },
  { name: 'Lab E-205', capacity: 45, type: 'Embedded Systems Lab' },
  { name: 'Lab F-110', capacity: 38, type: 'Software Engineering Lab' },
];

const sectionsData = [
  { courseCode: 'CS101', courseName: 'Introduction to Programming', section: '01', studentCount: 45, labType: 'Computer Lab',            schedule: 'Mon 8-10am' },
  { courseCode: 'CS101', courseName: 'Introduction to Programming', section: '02', studentCount: 42, labType: 'Computer Lab',            schedule: 'Mon 2-4pm' },
  { courseCode: 'CS202', courseName: 'Data Structures',             section: '01', studentCount: 38, labType: 'Programming Lab',         schedule: 'Tue 10am-12pm' },
  { courseCode: 'CS205', courseName: 'Algorithms',                  section: '01', studentCount: 32, labType: 'Computer Lab',            schedule: 'Wed 8-10am' },
  { courseCode: 'CS302', courseName: 'Operating Systems',           section: '01', studentCount: 48, labType: 'Computer Lab',            schedule: 'Thu 10am-12pm' },
  { courseCode: 'CS303', courseName: 'Database Systems',            section: '01', studentCount: 35, labType: 'Software Engineering Lab', schedule: 'Fri 8-10am' },
  { courseCode: 'CS401', courseName: 'Computer Networks',           section: '01', studentCount: 28, labType: 'Networking Lab',          schedule: 'Mon 10am-12pm' },
  { courseCode: 'CS404', courseName: 'Software Engineering',        section: '01', studentCount: 25, labType: 'Software Engineering Lab', schedule: 'Tue 2-4pm' },
  { courseCode: 'EE201', courseName: 'Circuit Theory',              section: '01', studentCount: 33, labType: 'Electronics Lab',         schedule: 'Wed 2-4pm' },
  { courseCode: 'EE301', courseName: 'Embedded Systems',            section: '01', studentCount: 29, labType: 'Embedded Systems Lab',    schedule: 'Thu 2-4pm' },
];

// ── Source: StaffActivityTracker.mockActivities ───────────────────────────────
// Authoritative: src/app/components/StaffActivityTracker.tsx (component-local)

const activitiesData = [
  { staffName: 'Dr. Aisyah Rahman',  title: 'MJIIT Robotics Seminar',                           type: 'Service',  hoursSpent: 40,  mode: 'Hybrid', date: '15 Apr 2026', source: 'Manual' },
  { staffName: 'Dr. Aisyah Rahman',  title: 'Machine Learning in Education Research',            type: 'Research', hoursSpent: 120, mode: 'Hybrid', date: '20 Mar 2026', source: 'ORCID'  },
  { staffName: 'Prof. Muhammad Ali', title: 'NSF Database Optimization Grant',                   type: 'Grant',    hoursSpent: 80,  mode: 'Hybrid', date: '10 Apr 2026', source: 'Manual' },
  { staffName: 'Dr. Siti Aminah',    title: 'AI Ethics Committee',                              type: 'Service',  hoursSpent: 20,  mode: 'Hybrid', date: '22 Apr 2026', source: 'Manual' },
  { staffName: 'Prof. Muhammad Ali', title: 'Distributed Systems Performance Analysis',          type: 'Research', hoursSpent: 150, mode: 'Hybrid', date: '28 Feb 2026', source: 'ORCID'  },
  { staffName: 'Dr. Fatimah Zahra',  title: 'Ministry of Education Curriculum Review',          type: 'Service',  hoursSpent: 60,  mode: 'Hybrid', date: '05 Apr 2026', source: 'Manual' },
  { staffName: 'Dr. Zatul Alwani',   title: 'Deep Learning for Software Engineering Research',  type: 'Research', hoursSpent: 120, mode: 'Hybrid', date: '15 Mar 2026', source: 'ORCID'  },
  { staffName: 'Dr. Zatul Alwani',   title: 'Ministry of Higher Education Grant Application',   type: 'Grant',    hoursSpent: 80,  mode: 'Hybrid', date: '10 Apr 2026', source: 'Manual' },
  { staffName: 'Dr. Zatul Alwani',   title: 'Kuala Lumpur Tech Outreach',                      type: 'Service',  hoursSpent: 15,  mode: 'Hybrid', date: '25 Apr 2026', source: 'Manual' },
];

// ── Row builders ──────────────────────────────────────────────────────────────

function buildTeachingRows() {
  return cmAssignments.map(a => {
    const course = mockCourses.find(c => c.code === a.courseCode && c.section === a.section)
      ?? mockCourses.find(c => c.code === a.courseCode);
    const labHrs = course?.labHours ?? 0;
    const tutHrs = course?.tutorialHours ?? 0;
    const lectureHrs = Math.max(1, a.credits - labHrs - tutHrs);
    const students = course?.studentCount ?? 0;
    let notes = '';
    if (a.lecturerStatus === 'rejected') notes = 'Assignment Rejected - Needs Reassignment';
    if (a.lecturerStatus === 'pending')  notes = 'Pending Acceptance';

    return {
      'Category':              'SE Subject',
      'Year':                  `Tahun ${a.yearLevel} Sept 2025`,
      'Course Code':           a.courseCode,
      'Course Name':           a.courseName,
      'Section':               a.section,
      'Pre-requisite':         '—',
      "Lecturer's Name":       a.lecturerName,
      'Credit':                a.credits,
      'Final Exam':            'YES',
      'Lecture (hrs)':         lectureHrs,
      'Combined Lecture?':     'NO',
      'Tutorial (hrs)':        tutHrs,
      'Lab (hrs)':             labHrs,
      'No. of Students':       students,
      'Course Coordinator':    'Dr. Zatul Alwani',
      "Coordinator's Dept":    'Software Engineering',
      'Lab Name':              labHrs > 0 ? 'Lab C-303' : '—',
      'Lab Capacity':          labHrs > 0 ? 50 : '—',
      'Lab Used For':          labHrs > 0 ? 'Programming Lab' : '—',
      'Lab Used During':       labHrs > 0 ? 'Whole Semester' : '—',
      'Y1 Normal':             '—',
      'Y1 Direct':             '—',
      'Y2 Normal':             '—',
      'Y2 Direct':             '—',
      'Y3 Normal':             '—',
      'Y3 Direct':             '—',
      'Y4 Normal':             '—',
      'Y4 Direct':             '—',
      'Moderator 1':           a.mod1 ?? '—',
      'Moderator 2':           a.mod2 ?? '—',
      'Notes':                 notes,
    };
  });
}

function buildWorkloadRows() {
  // Count teaching sections per lecturer from cmAssignments
  const lecturerSections: Record<string, { sections: number; subjects: Set<string> }> = {};
  for (const a of cmAssignments) {
    const key = a.lecturerName;
    if (!lecturerSections[key]) lecturerSections[key] = { sections: 0, subjects: new Set() };
    lecturerSections[key].sections++;
    lecturerSections[key].subjects.add(a.courseCode);
  }

  return mockStaff.map((s, i) => {
    const cleanName = s.name.replace(' (Me)', '');
    const entry = lecturerSections[cleanName];
    // Fallback: estimate from current load if not in assignments
    const sections = entry?.sections ?? (s.currentLoad > 0 ? Math.round(s.currentLoad / 3) : 0);
    const subjects = entry?.subjects.size ?? (s.currentLoad > 0 ? Math.ceil(s.currentLoad / 3) : 0);

    return {
      'No.':                 i + 1,
      'Name of Lecturer':    cleanName,
      'No. of Classes':      sections,
      'No. of Sections':     sections,
      'No. of Subjects':     subjects,
    };
  });
}

function buildSegmentationRows() {
  return segmentationData.map(r => ({
    'Course Code':                   r.courseCode,
    'Course Name':                   r.courseName,
    'Local (Tempatan)':              r.local,
    'International (Antarabangsa)':  r.international,
    'Total':                         r.total,
    'Normal Intake':                 r.normal,
    'Direct Intake':                 r.direct,
    'Local %':                       r.localPct,
    "Int'l %":                       r.intlPct,
  }));
}

function buildLabRows() {
  return sectionsData.map(s => {
    const lab = labsData.find(l => l.type === s.labType);
    const capacity = lab?.capacity ?? 0;
    const status = !lab ? 'No Lab Assigned' : s.studentCount > capacity ? 'Over Capacity' : 'Valid';

    return {
      'Course Code':     s.courseCode,
      'Course Name':     s.courseName,
      'Section':         s.section,
      'Enrollment':      s.studentCount,
      'Lab Name':        lab?.name ?? '—',
      'Lab Capacity':    lab?.capacity ?? '—',
      'Lab Used For':    s.labType,
      'Lab Used During': 'Whole Semester',
      'Status':          status,
    };
  });
}

function buildActivityRows() {
  return activitiesData.map(a => ({
    'Staff Name':      a.staffName,
    'Activity Title':  a.title,
    'Type':            a.type,
    'Hours Spent':     a.hoursSpent,
    'Mode':            a.mode,
    'Date Submitted':  a.date,
    'Source':          a.source,
  }));
}

// ── Scope dispatcher ──────────────────────────────────────────────────────────

function scopeToRows(scopeId: ExportScopeId): Record<string, unknown>[] {
  switch (scopeId) {
    case 'course-offerings':     return buildTeachingRows();
    case 'staff-workload':       return buildWorkloadRows();
    case 'student-segmentation': return buildSegmentationRows();
    case 'lab-schedule':         return buildLabRows();
    case 'staff-activity':       return buildActivityRows();
  }
}

// ── Column widths ─────────────────────────────────────────────────────────────

function applyColWidths(ws: XLSX.WorkSheet, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const cols = Object.keys(rows[0]);
  ws['!cols'] = cols.map(col => {
    const maxContentLen = Math.max(
      col.length,
      ...rows.map(r => String(r[col] ?? '').length),
    );
    return { wch: Math.min(Math.max(maxContentLen + 2, 10), 52) };
  });
}

// ── Filename helpers ──────────────────────────────────────────────────────────

function sanitize(s: string) {
  return s.replace(/[/\\:*?"<>|]/g, '-').replace(/\s+/g, '-');
}

function fmtSemester(s: string) {
  // 'semester-1' → 'Semester-1'
  return s.replace(/^semester-/i, 'Semester-');
}

function fmtSession(s: string) {
  // '2024-2025' → '2024-2025' (already safe for filenames)
  return s;
}

function buildFilename(parts: string[], ext: string) {
  return parts.map(sanitize).join('_') + '.' + ext;
}

// ── XLSX generation ───────────────────────────────────────────────────────────

export function generateXlsx(
  selectedScopeIds: string[],
  semester: string,
  session: string,
): void {
  const wb = XLSX.utils.book_new();

  for (const id of selectedScopeIds) {
    const scopeId = id as ExportScopeId;
    if (!(scopeId in SCOPE_META)) {
      console.warn('[reportExport] Unknown scope ID, skipping:', id);
      continue;
    }
    const rows = scopeToRows(scopeId);
    const ws = XLSX.utils.json_to_sheet(rows);
    applyColWidths(ws, rows);
    XLSX.utils.book_append_sheet(wb, ws, SCOPE_META[scopeId].sheetName);
  }

  const filename = buildFilename(
    ['SE-AMS_MJIIT-ESE', fmtSemester(semester), fmtSession(session)],
    'xlsx',
  );
  XLSX.writeFile(wb, filename);
}

// ── CSV generation ────────────────────────────────────────────────────────────

export function generateCsvFiles(
  selectedScopeIds: string[],
  semester: string,
  session: string,
): number {
  const UTF8_BOM = '﻿';
  let downloadCount = 0;

  for (const id of selectedScopeIds) {
    const scopeId = id as ExportScopeId;
    if (!(scopeId in SCOPE_META)) {
      console.warn('[reportExport] Unknown scope ID, skipping:', id);
      continue;
    }

    const rows = scopeToRows(scopeId);
    const ws = XLSX.utils.json_to_sheet(rows);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([UTF8_BOM + csv], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = buildFilename(
      ['SE-AMS', SCOPE_META[scopeId].filenamePart, fmtSemester(semester), fmtSession(session)],
      'csv',
    );
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    downloadCount++;
  }

  return downloadCount;
}
