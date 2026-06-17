import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';
import { UnifiedTopNav } from './UnifiedTopNav';
import { UnifiedSystemSidebar } from './UnifiedSystemSidebar';
import { CourseSelector } from './CourseSelector';
import { LecturerSelector } from './LecturerSelector';
import { WorkloadMonitor } from './WorkloadMonitor';
import { ModeratorSection } from './ModeratorSection';
import { StaffActivityTracker } from './StaffActivityTracker';
import { AssignmentStatusBoard } from './AssignmentStatusBoard';
import { StudentSegmentation } from './StudentSegmentation';
import { CourseModeratorManager } from './CourseModeratorManager';
import { SystemAuditLog } from './SystemAuditLog';
import { ExportReports } from './ExportReports';
import { StaffContextCard } from './StaffContextCard';
import { MyActivityTracker } from './MyActivityTracker';
import { LecturerQueue } from './LecturerQueue';
import { LabResourcePlanner } from './LabResourcePlanner';
import { ActivityLogPortal } from './ActivityLogPortal';
import { ProfileORCIDSetup } from './ProfileORCIDSetup';
import { WorkloadGauge } from './WorkloadGauge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Course, Staff } from '../types';

// Mock Data
const mockCourses: Course[] = [
  { id: 'CS101-01', code: 'CS101', name: 'Introduction to Programming', section: '01', credits: 3.0, year: 1, studentCount: 45, labHours: 2, tutorialHours: 1 },
  { id: 'CS101-02', code: 'CS101', name: 'Introduction to Programming', section: '02', credits: 3.0, year: 1, studentCount: 42, labHours: 2, tutorialHours: 1 },
  { id: 'CS202-01', code: 'CS202', name: 'Data Structures', section: '01', credits: 3.0, year: 2, studentCount: 38, labHours: 2, tutorialHours: 0 },
  { id: 'CS303-01', code: 'CS303', name: 'Database Systems', section: '01', credits: 3.0, year: 3, studentCount: 35, labHours: 1, tutorialHours: 1 },
  { id: 'CS404-01', code: 'CS404', name: 'Software Engineering', section: '01', credits: 3.0, year: 4, studentCount: 28, labHours: 0, tutorialHours: 2 },
  { id: 'MA101-01', code: 'MA101', name: 'Calculus I', section: '01', credits: 4.0, year: 1, studentCount: 50, labHours: 0, tutorialHours: 2 },
  { id: 'CS205-01', code: 'CS205', name: 'Algorithms', section: '01', credits: 3.0, year: 2, studentCount: 32, labHours: 1, tutorialHours: 1 },
];

const mockStaff: Staff[] = [
  { id: 'staff-1', name: 'Dr. Aisyah Rahman', currentLoad: 9.0, status: 'available' },
  { id: 'staff-2', name: 'Prof. Muhammad Ali', currentLoad: 12.0, status: 'available' },
  { id: 'staff-3', name: 'Dr. Siti Aminah', currentLoad: 13.0, status: 'warning' },
  { id: 'staff-4', name: 'Dr. Ahmad Hassan', currentLoad: 15.0, status: 'full' },
  { id: 'staff-5', name: 'Dr. Fatimah Zahra', currentLoad: 6.0, status: 'available' },
  { id: 'staff-6', name: 'Prof. Ibrahim Malik', currentLoad: 0, status: 'available' },
  { id: 'staff-7', name: 'Dr. Noor Hayati', currentLoad: 14.0, status: 'warning' },
  { id: 'staff-coordinator', name: 'Dr. Zatul Alwani (Me)', currentLoad: 6.0, status: 'available' },
];

export function CoordinatorDashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('assignment');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<Staff | null>(null);
  const [primaryModerator, setPrimaryModerator] = useState<Staff | null>(null);
  const [secondaryModerator, setSecondaryModerator] = useState<Staff | null>(null);
  const [showError, setShowError] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#900021] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const projectedLoad = selectedLecturer && selectedCourse
    ? selectedLecturer.currentLoad + selectedCourse.credits
    : selectedLecturer?.currentLoad || 0;

  const isOverLimit = projectedLoad > 15;
  const canSave = selectedCourse && selectedLecturer && !isOverLimit;

  const handleSave = () => {
    if (!canSave) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    toast.success(`Assignment sent to ${selectedLecturer?.name}`, {
      duration: 3000,
    });

    // Reset form
    setSelectedCourse(null);
    setSelectedLecturer(null);
    setPrimaryModerator(null);
    setSecondaryModerator(null);
  };


  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col h-screen bg-[#F4F4F4]">
        <UnifiedTopNav />

        <div className="flex flex-1 overflow-hidden">
          <UnifiedSystemSidebar activeView={activeView} onViewChange={setActiveView} />

          <main className="flex-1 overflow-auto">
            {/* Error Banner */}
            {showError && activeView === 'assignment' && (
              <div className="bg-[#DC2626] text-white px-6 py-3 text-sm font-medium">
                ⚠ Assignment Blocked: Policy Violation (FR-03) - Would exceed 15-credit limit
              </div>
            )}

            <div className="p-8">
              {/* Assignment Tool View */}
              {activeView === 'assignment' && (
                <>
                  <div className="mb-6">
                    <h1 className="text-3xl mb-2">Assignment Tool</h1>
                    <p className="text-gray-600">
                      Assign course sections to academic staff (including yourself)
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {/* Left: Input Form (60%) */}
                    <div className="col-span-2 space-y-6">
                      <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
                        <h2 className="text-xl mb-6 flex items-center gap-2">
                          Assignment Details
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                FR-03 Policy: Academic staff teaching load must not exceed 15 credits per semester.
                                The system will prevent assignments that violate this limit.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </h2>

                        <div className="space-y-6">
                          <CourseSelector
                            courses={mockCourses}
                            selectedCourse={selectedCourse}
                            onSelectCourse={setSelectedCourse}
                          />

                          <LecturerSelector
                            staff={mockStaff}
                            selectedLecturer={selectedLecturer}
                            onSelectLecturer={setSelectedLecturer}
                            selectedCourse={selectedCourse}
                          />

                          <ModeratorSection
                            staff={mockStaff}
                            selectedLecturer={selectedLecturer}
                            primaryModerator={primaryModerator}
                            secondaryModerator={secondaryModerator}
                            onSelectPrimary={setPrimaryModerator}
                            onSelectSecondary={setSecondaryModerator}
                          />
                        </div>

                        <div className="mt-8 flex justify-end">
                          <Button
                            onClick={handleSave}
                            disabled={!canSave}
                            className={
                              canSave
                                ? 'bg-[#900021] hover:bg-[#5C001F] h-11 shadow-sm'
                                : 'bg-[#D1D5DB] hover:bg-[#D1D5DB] cursor-not-allowed h-11'
                            }
                          >
                            Send Assignment
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Analytics & Workload Monitor (40%) */}
                    <div className="col-span-1 space-y-6">
                      <WorkloadMonitor
                        selectedLecturer={selectedLecturer}
                        selectedCourse={selectedCourse}
                        projectedLoad={projectedLoad}
                      />
                      <StaffContextCard staff={selectedLecturer} />
                    </div>
                  </div>
                </>
              )}

              {/* Staff Activity Tracker View */}
              {activeView === 'activity-tracker' && (
                <StaffActivityTracker />
              )}

              {/* Assignment Status Board View */}
              {activeView === 'status-board' && (
                <AssignmentStatusBoard />
              )}

              {/* Course & Moderator Manager View */}
              {activeView === 'course-moderator' && (
                <CourseModeratorManager />
              )}

              {/* Student Segmentation View */}
              {activeView === 'segmentation' && (
                <StudentSegmentation />
              )}

              {/* System Audit Log View */}
              {activeView === 'audit-log' && (
                <SystemAuditLog />
              )}

              {/* Export Reports View */}
              {activeView === 'export-reports' && (
                <ExportReports />
              )}

              {/* My Activity Tracker View */}
              {activeView === 'my-activity' && (
                <MyActivityTracker />
              )}

              {/* My Pending Queue View */}
              {activeView === 'queue' && (
                <>
                  <div className="-m-8 mb-8">
                    <LecturerQueue />
                  </div>
                  {user?.role === 'lecturer' && user?.currentLoad !== undefined && (
                    <div className="max-w-md mx-auto mt-8">
                      <WorkloadGauge currentLoad={user.currentLoad} />
                    </div>
                  )}
                </>
              )}

              {/* Activity Log Portal View */}
              {activeView === 'activity-log' && (
                <ActivityLogPortal />
              )}

              {/* Profile & ORCID Setup View */}
              {activeView === 'profile' && (
                <ProfileORCIDSetup />
              )}

              {activeView === 'lab-planner' && (
                <div className="-m-8 p-8 bg-[#F4F4F4] min-h-full">
                  <LabResourcePlanner />
                </div>
              )}
            </div>
          </main>
        </div>

        <Toaster />
      </div>
    </TooltipProvider>
  );
}