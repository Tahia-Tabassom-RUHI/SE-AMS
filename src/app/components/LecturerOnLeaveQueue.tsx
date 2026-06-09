import { useState } from 'react';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';
import { SummaryBar } from './SummaryBar';
import { LecturerWorkloadGauge } from './LecturerWorkloadGauge';
import { QueueTable } from './QueueTable';
import { DeclineModal } from './DeclineModal';
import { useAuth } from '../contexts/AuthContext';
import type { AssignmentRequest } from '../types';

const mockRequests: AssignmentRequest[] = [
  {
    id: 'req-1',
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
  },
  {
    id: 'req-2',
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
  },
  {
    id: 'req-3',
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
  },
  {
    id: 'req-4',
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
  },
];

export function LecturerOnLeaveQueue() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AssignmentRequest[]>(mockRequests);
  const [currentLoad, setCurrentLoad] = useState(user?.currentLoad || 9.0);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssignmentRequest | null>(null);
  const [hoveredCredits, setHoveredCredits] = useState(0);

  const pendingCredits = requests.reduce((sum, req) => sum + req.credits, 0);
  const projectedTotal = currentLoad + pendingCredits;

  const handleAccept = (request: AssignmentRequest) => {
    const newLoad = currentLoad + request.credits;

    if (newLoad > 15) {
      toast.error('Cannot accept: Would exceed 15-credit limit', { duration: 3000 });
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
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">My Assignment Queue</h1>
        <p className="text-gray-600">
          Review and respond to teaching assignments from your coordinator
        </p>
      </div>

      <SummaryBar
        pendingCount={requests.length}
        currentLoad={currentLoad}
        nextDeadline={requests.length > 0 ? Math.min(...requests.map(r => r.deadlineDate.getTime())) : null}
        isExemptionActive={true}
      />

      {/* Exemption Active Banner */}
      <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 mb-6">
        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900">Administrative Exemption Active — Maternity Leave</p>
          <p className="text-sm text-gray-500 mt-0.5">
            You may decline assignments freely regardless of your current credit total. Exemption expires: Dec 31, 2026
          </p>
        </div>
      </div>

      <LecturerWorkloadGauge
        currentLoad={currentLoad}
        pendingCredits={pendingCredits}
        projectedTotal={projectedTotal}
        hoveredCredits={hoveredCredits}
        isExemptionActive={true}
      />

      <QueueTable
        requests={requests}
        currentLoad={currentLoad}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onHoverPreview={setHoveredCredits}
        onHoverEnd={() => setHoveredCredits(0)}
        isExemptionActive={true}
      />

      <DeclineModal
        open={declineModalOpen}
        onOpenChange={setDeclineModalOpen}
        request={selectedRequest}
        onConfirm={confirmDecline}
      />
    </>
  );
}
