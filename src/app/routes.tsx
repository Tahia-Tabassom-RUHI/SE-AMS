import { createHashRouter, isRouteErrorResponse, Outlet, useRouteError } from 'react-router';
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
import { ProfileORCIDSetup } from './components/ProfileORCIDSetup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleDashboard } from './pages/RoleDashboard';
import { AuthProvider } from './contexts/AuthContext';

function QueueRoute() {
  return <LecturerQueueContent />;
}

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

function RouteErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Something went wrong.';

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#900021] mb-2">
          Application error
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          We could not load this page.
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <a
          href="#/login"
          className="inline-block bg-[#900021] text-white px-5 py-2 rounded-lg hover:bg-[#5C001F] transition-colors"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}

export const router = createHashRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
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
    ],
  },
]);
