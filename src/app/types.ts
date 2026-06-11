export interface Course {
  id: string;
  code: string;
  name: string;
  section: string;
  credits: number;
  year: number;
  studentCount: number;
  labHours: number;
  tutorialHours: number;
}

export interface Staff {
  id: string;
  name: string;
  currentLoad: number;
  status: 'available' | 'warning' | 'full';
  exemptionFlag?: boolean;
  exemptionType?: 'Maternity Leave' | 'Adjunct Status' | 'Borrowed Staff';
  exemptionStartDate?: Date;
  exemptionExpiryDate?: Date;
  exemptionReason?: string;
}

export interface AssignmentRequest {
  id: string;
  lecturerId?: string;
  lecturerName?: string;
  courseCode: string;
  courseName: string;
  section: string;
  credits: number;
  roleType: 'Teaching' | 'Moderator';
  status: 'new' | 'expiring';
  receivedDate: Date;
  deadlineDate: Date;
  studentCount: number;
  labHours: number;
  tutorialHours: number;
  moderatorNames?: string[];
  sentBy?: string;
}

export interface MyCourse {
  id: string;
  ownerId: string;
  courseCode: string;
  courseName: string;
  section: string;
  roleType: 'Teaching' | 'Moderator';
  credits: number;
  studentCount: number;
  semester: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  status: 'Success' | 'Warning' | 'Blocked';
  details: string;
}

export interface StaffActivity {
  id: string;
  staffName: string;
  title: string;
  type: 'Research' | 'Grant' | 'Service';
  hoursSpent: number;
  mode: 'Hybrid';
  date: Date;
}

export interface Assignment {
  id: string;
  lecturerName: string;
  courseCode: string;
  courseName: string;
  section: string;
  credits: number;
  status: 'accepted' | 'pending' | 'rejected';
  rejectionReason?: string;
  sentDate: Date;
  responseDate?: Date;
}
