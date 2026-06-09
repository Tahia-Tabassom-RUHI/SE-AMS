import { createBrowserRouter } from 'react-router';
import { Login } from './components/Login';
import { DashboardLayout } from './components/DashboardLayout';
import { AssignmentTool } from './pages/AssignmentTool';
import { AssignmentStatusBoard } from './components/AssignmentStatusBoard';
import { CourseModeratorManager } from './components/CourseModeratorManager';
import { StaffActivityTracker } from './components/StaffActivityTracker';
import { StudentSegmentation } from './components/StudentSegmentation';
import { LabResourcePlanner } from './components/LabResourcePlanner';
import { SystemAuditLog } from './components/SystemAuditLog';
import { SystemAudit } from './pages/SystemAudit';
import { CourseCatalog } from './pages/CourseCatalog';
import { ExportReports } from './components/ExportReports';
import { MyActivityTracker } from './components/MyActivityTracker';
import { MyCourses } from './components/MyCourses';
import { LecturerQueueContent } from './components/LecturerQueueContent';
import { LecturerOnLeaveQueue } from './components/LecturerOnLeaveQueue';
import { ProfileORCIDSetup } from './components/ProfileORCIDSetup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleDashboard } from './pages/RoleDashboard';
import { useAuth } from './contexts/AuthContext';

function QueueRoute() {
  const { user } = useAuth();
  if (user?.role === 'onleave') return <LecturerOnLeaveQueue />;
  return <LecturerQueueContent />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <RoleDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <RoleDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'assignment',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <AssignmentTool />
          </ProtectedRoute>
        ),
      },
      {
        path: 'status-board',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <AssignmentStatusBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'course-moderator',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <CourseModeratorManager />
          </ProtectedRoute>
        ),
      },
      {
        path: 'activity-tracker',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <StaffActivityTracker />
          </ProtectedRoute>
        ),
      },
      {
        path: 'segmentation',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <StudentSegmentation />
          </ProtectedRoute>
        ),
      },
      {
        path: 'lab-planner',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <div className="-m-8 p-8 bg-[#F4F4F4] min-h-full">
              <LabResourcePlanner />
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'audit-log',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <SystemAuditLog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'course-catalog',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <CourseCatalog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'system-audit',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <SystemAudit />
          </ProtectedRoute>
        ),
      },
      {
        path: 'export-reports',
        element: (
          <ProtectedRoute requiredRole="coordinator">
            <ExportReports />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-activity',
        element: (
          <ProtectedRoute>
            <MyActivityTracker />
          </ProtectedRoute>
        ),
      },
      {
        path: 'queue',
        element: (
          <ProtectedRoute>
            <QueueRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-courses',
        element: (
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfileORCIDSetup />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
