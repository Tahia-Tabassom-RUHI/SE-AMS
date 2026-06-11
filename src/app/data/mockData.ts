import type { Course, Staff } from '../types';

export const mockCourses: Course[] = [
  { id: 'CS101-01', code: 'CS101', name: 'Introduction to Programming', section: '01', credits: 3.0, year: 1, studentCount: 45, labHours: 2, tutorialHours: 1 },
  { id: 'CS101-02', code: 'CS101', name: 'Introduction to Programming', section: '02', credits: 3.0, year: 1, studentCount: 42, labHours: 2, tutorialHours: 1 },
  { id: 'CS202-01', code: 'CS202', name: 'Data Structures', section: '01', credits: 3.0, year: 2, studentCount: 38, labHours: 2, tutorialHours: 0 },
  { id: 'CS303-01', code: 'CS303', name: 'Database Systems', section: '01', credits: 3.0, year: 3, studentCount: 35, labHours: 1, tutorialHours: 1 },
  { id: 'CS404-01', code: 'CS404', name: 'Software Engineering', section: '01', credits: 3.0, year: 4, studentCount: 28, labHours: 0, tutorialHours: 2 },
  { id: 'MA101-01', code: 'MA101', name: 'Calculus I', section: '01', credits: 4.0, year: 1, studentCount: 50, labHours: 0, tutorialHours: 2 },
  { id: 'CS205-01', code: 'CS205', name: 'Algorithms', section: '01', credits: 3.0, year: 2, studentCount: 32, labHours: 1, tutorialHours: 1 },
  { id: 'CS301-01', code: 'CS301', name: 'Operating Systems', section: '01', credits: 3.0, year: 3, studentCount: 48, labHours: 1, tutorialHours: 1 },
  { id: 'MA202-01', code: 'MA202', name: 'Linear Algebra', section: '01', credits: 4.0, year: 2, studentCount: 42, labHours: 0, tutorialHours: 2 },
];

export const mockStaff: Staff[] = [
  { id: 'staff-1', name: 'Dr. Aisyah Rahman', currentLoad: 9.0, status: 'available' },
  { id: 'staff-2', name: 'Prof. Muhammad Ali', currentLoad: 12.0, status: 'available' },
  { id: 'staff-3', name: 'Dr. Siti Aminah', currentLoad: 13.0, status: 'warning' },
  { id: 'staff-4', name: 'Dr. Ahmad Hassan', currentLoad: 15.0, status: 'full', exemptionFlag: true, exemptionType: 'Maternity Leave', exemptionStartDate: new Date('2026-01-01'), exemptionExpiryDate: new Date('2026-12-31') },
  { id: 'staff-5', name: 'Dr. Fatimah Zahra', currentLoad: 6.0, status: 'available' },
  { id: 'staff-6', name: 'Prof. Ibrahim Malik', currentLoad: 0, status: 'available' },
  { id: 'staff-7', name: 'Dr. Noor Hayati', currentLoad: 14.0, status: 'warning' },
  { id: 'staff-coordinator', name: 'Dr. Zatul Alwani (Me)', currentLoad: 6.0, status: 'available' },
];
