import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AssignmentRequest, AuditLog, Course, MyCourse, Staff } from '../types';
import { mockStaff } from '../data/mockData';
import type { User } from './AuthContext';

const initialRequests: AssignmentRequest[] = [
  {
    id: 'req-1',
    lecturerId: 'staff-3',
    lecturerName: 'Dr. Siti Aminah',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    section: '01',
    credits: 3.0,
    roleType: 'Teaching',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 36),
    studentCount: 45,
    labHours: 2,
    tutorialHours: 1,
    sentBy: 'Dr. Zatul Alwani',
  },
  {
    id: 'req-2',
    lecturerId: 'staff-3',
    lecturerName: 'Dr. Siti Aminah',
    courseCode: 'CS202',
    courseName: 'Data Structures',
    section: '01',
    credits: 3.0,
    roleType: 'Teaching',
    status: 'expiring',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    studentCount: 38,
    labHours: 2,
    tutorialHours: 0,
    sentBy: 'Dr. Zatul Alwani',
  },
  {
    id: 'req-3',
    lecturerId: 'staff-3',
    lecturerName: 'Dr. Siti Aminah',
    courseCode: 'CS303',
    courseName: 'Database Systems',
    section: '01',
    credits: 0.5,
    roleType: 'Moderator',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 6),
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
    studentCount: 35,
    labHours: 1,
    tutorialHours: 1,
    sentBy: 'Dr. Zatul Alwani',
  },
  {
    id: 'req-4',
    lecturerId: 'staff-3',
    lecturerName: 'Dr. Siti Aminah',
    courseCode: 'MA101',
    courseName: 'Calculus I',
    section: '02',
    credits: 4.0,
    roleType: 'Teaching',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 8),
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 40),
    studentCount: 50,
    labHours: 0,
    tutorialHours: 2,
    sentBy: 'Dr. Zatul Alwani',
  },
];

const initialCourses: MyCourse[] = [
  { id: 'course-coord-1', ownerId: 'staff-coordinator', courseCode: 'SCSE2243', courseName: 'Software Engineering', section: '01', roleType: 'Teaching', credits: 3, studentCount: 40, semester: 'Spring 2026' },
  { id: 'course-coord-2', ownerId: 'staff-coordinator', courseCode: 'CS303', courseName: 'Database Systems', section: '01', roleType: 'Moderator', credits: 0.5, studentCount: 35, semester: 'Spring 2026' },
  { id: 'course-lect-1', ownerId: 'staff-3', courseCode: 'CS101', courseName: 'Introduction to Programming', section: '01', roleType: 'Teaching', credits: 3, studentCount: 45, semester: 'Spring 2026' },
  { id: 'course-lect-2', ownerId: 'staff-3', courseCode: 'CS205', courseName: 'Algorithms', section: '01', roleType: 'Teaching', credits: 3, studentCount: 32, semester: 'Spring 2026' },
  { id: 'course-lect-3', ownerId: 'staff-3', courseCode: 'CS205', courseName: 'Algorithms', section: '02', roleType: 'Teaching', credits: 3, studentCount: 32, semester: 'Spring 2026' },
  { id: 'course-lect-4', ownerId: 'staff-3', courseCode: 'CS303', courseName: 'Database Systems', section: '01', roleType: 'Moderator', credits: 0.5, studentCount: 35, semester: 'Spring 2026' },
  { id: 'course-lect-5', ownerId: 'staff-3', courseCode: 'SCSE2243', courseName: 'Software Engineering', section: '01', roleType: 'Teaching', credits: 3, studentCount: 40, semester: 'Spring 2026' },
  { id: 'course-lect-6', ownerId: 'staff-3', courseCode: 'CS202', courseName: 'Data Structures', section: '01', roleType: 'Moderator', credits: 0.5, studentCount: 38, semester: 'Spring 2026' },
];

interface AppDataContextValue {
  staff: Staff[];
  assignmentRequests: AssignmentRequest[];
  myCourses: MyCourse[];
  auditLogs: AuditLog[];
  getStaffForUser: (user: User | null) => Staff | null;
  isStaffExemptionActive: (staffId?: string) => boolean;
  updateStaffStatus: (staffId: string, data: Partial<Staff>, actorName?: string) => Staff | null;
  recordAudit: (entry: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  sendAssignment: (course: Course, lecturer: Staff, moderators: Staff[], actorName: string) => void;
  acceptAssignment: (request: AssignmentRequest, user: User | null) => void;
  declineAssignment: (request: AssignmentRequest, reason: string, user: User | null) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function staffIdForUser(user: User | null) {
  if (!user) return null;
  if (user.role === 'coordinator') return 'staff-coordinator';
  if (user.email === 'lecturer@utm.my') return 'staff-3';
  return null;
}

function isDateRangeActive(start?: Date, end?: Date) {
  if (!start || !end) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const starts = new Date(start);
  const ends = new Date(end);
  starts.setHours(0, 0, 0, 0);
  ends.setHours(23, 59, 59, 999);
  return starts <= today && today <= ends;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [assignmentRequests, setAssignmentRequests] = useState<AssignmentRequest[]>(initialRequests);
  const [myCourses, setMyCourses] = useState<MyCourse[]>(initialCourses);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const appendAudit = (entry: Omit<AuditLog, 'id' | 'timestamp'>) => {
    setAuditLogs(prev => [
      { ...entry, id: `audit-${Date.now()}-${prev.length}`, timestamp: new Date() },
      ...prev,
    ]);
  };

  const getStaffForUser = (user: User | null) => {
    const id = staffIdForUser(user);
    return staff.find(person => person.id === id) ?? null;
  };

  const isStaffExemptionActive = (staffId?: string) => {
    const person = staff.find(item => item.id === staffId);
    if (!person?.exemptionFlag) return false;
    return isDateRangeActive(person.exemptionStartDate, person.exemptionExpiryDate);
  };

  const updateStaffStatus = (staffId: string, data: Partial<Staff>, actorName = 'Coordinator') => {
    let updated: Staff | null = null;
    setStaff(prev => prev.map(person => {
      if (person.id !== staffId) return person;
      updated = { ...person, ...data };
      return updated;
    }));
    if (updated) {
      appendAudit({
        user: actorName,
        action: 'Staff Status Updated',
        status: 'Success',
        details: `${updated.name} status updated to ${data.exemptionType ?? 'standard workload policy'}`,
      });
    }
    return updated;
  };

  const sendAssignment = (course: Course, lecturer: Staff, moderators: Staff[], actorName: string) => {
    const request: AssignmentRequest = {
      id: `req-${Date.now()}`,
      lecturerId: lecturer.id,
      lecturerName: lecturer.name,
      courseCode: course.code,
      courseName: course.name,
      section: course.section,
      credits: course.credits,
      roleType: 'Teaching',
      status: 'new',
      receivedDate: new Date(),
      deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
      studentCount: course.studentCount,
      labHours: course.labHours,
      tutorialHours: course.tutorialHours,
      moderatorNames: moderators.map(moderator => moderator.name),
      sentBy: actorName,
    };
    setAssignmentRequests(prev => [request, ...prev]);
    appendAudit({
      user: actorName,
      action: 'Assignment Sent',
      status: 'Success',
      details: `${course.code}-${course.section} sent to ${lecturer.name}`,
    });
  };

  const acceptAssignment = (request: AssignmentRequest, user: User | null) => {
    const staffId = request.lecturerId ?? staffIdForUser(user);
    if (!staffId) return;

    setAssignmentRequests(prev => prev.filter(item => item.id !== request.id));
    setStaff(prev => prev.map(person => {
      if (person.id !== staffId) return person;
      const newLoad = person.currentLoad + request.credits;
      return {
        ...person,
        currentLoad: newLoad,
        status: newLoad > 15 ? 'full' : newLoad >= 12 ? 'warning' : 'available',
      };
    }));
    setMyCourses(prev => [
      {
        id: `course-${request.id}`,
        ownerId: staffId,
        courseCode: request.courseCode,
        courseName: request.courseName,
        section: request.section,
        roleType: request.roleType,
        credits: request.credits,
        studentCount: request.studentCount,
        semester: 'Spring 2026',
      },
      ...prev,
    ]);
    appendAudit({
      user: request.lecturerName ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
      action: 'Assignment Accepted',
      status: 'Success',
      details: `${request.courseCode}-${request.section} accepted`,
    });
  };

  const declineAssignment = (request: AssignmentRequest, reason: string, user: User | null) => {
    setAssignmentRequests(prev => prev.filter(item => item.id !== request.id));
    appendAudit({
      user: request.lecturerName ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
      action: 'Assignment Declined',
      status: 'Warning',
      details: `${request.courseCode}-${request.section} declined. Reason: ${reason}`,
    });
  };

  const value = useMemo<AppDataContextValue>(() => ({
    staff,
    assignmentRequests,
    myCourses,
    auditLogs,
    getStaffForUser,
    isStaffExemptionActive,
    updateStaffStatus,
    recordAudit: appendAudit,
    sendAssignment,
    acceptAssignment,
    declineAssignment,
  }), [staff, assignmentRequests, myCourses, auditLogs]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
