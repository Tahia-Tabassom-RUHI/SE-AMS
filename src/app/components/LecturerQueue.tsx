import { useState } from 'react';
import { Clock, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';
import { TopNavigationBar } from './TopNavigationBar';
import { LecturerSidebar } from './LecturerSidebar';
import { SummaryBar } from './SummaryBar';
import { LecturerWorkloadGauge } from './LecturerWorkloadGauge';
import { QueueTable } from './QueueTable';
import { DeclineModal } from './DeclineModal';
import type { AssignmentRequest } from '../types';

// Mock Data - Assignment requests from Coordinator
const mockRequests: AssignmentRequest[] = [
  {
    id: 'req-1',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    section: '01',
    credits: 3.0,
    roleType: 'Teaching',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 36), // 36 hours from now
    studentCount: 45,
    labHours: 2,
    tutorialHours: 1,
  },
  {
    id: 'req-2',
    courseCode: 'CS202',
    courseName: 'Data Structures',
    section: '01',
    credits: 3.0,
    roleType: 'Teaching',
    status: 'expiring',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    studentCount: 38,
    labHours: 2,
    tutorialHours: 0,
  },
  {
    id: 'req-3',
    courseCode: 'CS303',
    courseName: 'Database Systems',
    section: '01',
    credits: 0.5,
    roleType: 'Moderator',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
    studentCount: 35,
    labHours: 1,
    tutorialHours: 1,
  },
  {
    id: 'req-4',
    courseCode: 'MA101',
    courseName: 'Calculus I',
    section: '02',
    credits: 4.0,
    roleType: 'Teaching',
    status: 'new',
    receivedDate: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 40), // 40 hours from now
    studentCount: 50,
    labHours: 0,
    tutorialHours: 2,
  },
];

export function LecturerQueue() {
  const [requests, setRequests] = useState<AssignmentRequest[]>(mockRequests);
  const [currentLoad, setCurrentLoad] = useState(9.0); // Already accepted credits
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssignmentRequest | null>(null);
  const [hoveredCredits, setHoveredCredits] = useState(0);

  const pendingCredits = requests.reduce((sum, req) => sum + req.credits, 0);
  const projectedTotal = currentLoad + pendingCredits;

  const handleAccept = (request: AssignmentRequest) => {
    const newLoad = currentLoad + request.credits;

    if (newLoad > 15) {
      toast.error('Cannot accept: Would exceed 15-credit limit', {
        duration: 3000,
      });
      return;
    }

    setCurrentLoad(newLoad);
    setRequests(prev => prev.filter(req => req.id !== request.id));

    toast.success(
      <div>
        <div className="font-semibold">Assignment Accepted</div>
        <div className="text-sm">
          {request.courseCode} - {request.courseName} has been added to your teaching load
        </div>
      </div>,
      { duration: 3000 }
    );
  };

  const handleDecline = (request: AssignmentRequest) => {
    setSelectedRequest(request);
    setDeclineModalOpen(true);
  };

  const confirmDecline = (reason: string) => {
    if (!selectedRequest) return;

    setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));

    toast.error(
      <div>
        <div className="font-semibold">Assignment Declined</div>
        <div className="text-sm">
          {selectedRequest.courseCode} - {selectedRequest.courseName}
        </div>
        <div className="text-xs mt-1 opacity-75">Reason: {reason}</div>
      </div>,
      { duration: 4000 }
    );

    setDeclineModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F4F4F4]">
      <TopNavigationBar hasNotifications={requests.length > 0} />

      <div className="flex flex-1 overflow-hidden">
        <LecturerSidebar />

        <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl mb-2">My Assignment Queue</h1>
            <p className="text-gray-600">
              Review and respond to teaching assignments from your coordinator
            </p>
          </div>

          {/* Summary Bar */}
          <SummaryBar
            pendingCount={requests.length}
            currentLoad={currentLoad}
            nextDeadline={requests.length > 0 ? Math.min(...requests.map(r => r.deadlineDate.getTime())) : null}
          />

          {/* Workload Gauge */}
          <LecturerWorkloadGauge
            currentLoad={currentLoad}
            pendingCredits={pendingCredits}
            projectedTotal={projectedTotal}
            hoveredCredits={hoveredCredits}
          />

          {/* Queue Table */}
          <QueueTable
            requests={requests}
            currentLoad={currentLoad}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onHoverPreview={setHoveredCredits}
            onHoverEnd={() => setHoveredCredits(0)}
          />
        </div>
        </main>
      </div>

      <DeclineModal
        open={declineModalOpen}
        onOpenChange={setDeclineModalOpen}
        request={selectedRequest}
        onConfirm={confirmDecline}
      />

      <Toaster />
    </div>
  );
}
