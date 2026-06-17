import { useState } from 'react';
import { toast } from 'sonner';
import { SummaryBar } from './SummaryBar';
import { LecturerWorkloadGauge } from './LecturerWorkloadGauge';
import { QueueTable } from './QueueTable';
import { DeclineModal } from './DeclineModal';
import { useAuth } from '../contexts/AuthContext';
import type { AssignmentRequest } from '../types';
import { useAppData } from '../contexts/AppDataContext';

export function LecturerQueueContent() {
  const { user } = useAuth();
  const {
    assignmentRequests,
    acceptAssignment,
    declineAssignment,
    getStaffForUser,
    isStaffExemptionActive,
  } = useAppData();
  const currentStaff = getStaffForUser(user);
  const requests = user?.role === 'coordinator'
    ? assignmentRequests
    : assignmentRequests.filter(request => !request.lecturerId || request.lecturerId === currentStaff?.id);
  const currentLoad = currentStaff?.currentLoad ?? user?.currentLoad ?? 9.0;
  const isExemptionActive = isStaffExemptionActive(currentStaff?.id);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssignmentRequest | null>(null);
  const [hoveredCredits, setHoveredCredits] = useState(0);

  const pendingCredits = requests.reduce((sum, req) => sum + req.credits, 0);
  const projectedTotal = currentLoad + pendingCredits;

  // Decline is blocked for lecturers below the 12-credit minimum unless an exemption is active.
  const isDeclineBlocked = user?.role === 'lecturer' && currentLoad < 12 && !isExemptionActive;

  const handleAccept = (request: AssignmentRequest) => {
    const newLoad = currentLoad + request.credits;

    // 15-credit maximum is always enforced regardless of exemption status.
    // Exemption only waives the 12-credit minimum rejection floor.
    if (newLoad > 15) {
      toast.error('Cannot accept: Would exceed the 15-credit semester limit', {
        duration: 3000,
      });
      return;
    }

    acceptAssignment(request, user);

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
    // Guard: Decline button is disabled in QueueTable when isDeclineBlocked.
    // This handler only runs when decline is permitted.
    setSelectedRequest(request);
    setDeclineModalOpen(true);
  };

  const confirmDecline = (reason: string) => {
    if (!selectedRequest) return;

    declineAssignment(selectedRequest, reason, user);

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
        isExemptionActive={isExemptionActive}
      />

      <LecturerWorkloadGauge
        currentLoad={currentLoad}
        pendingCredits={pendingCredits}
        projectedTotal={projectedTotal}
        hoveredCredits={hoveredCredits}
        isExemptionActive={isExemptionActive}
      />

      <QueueTable
        requests={requests}
        currentLoad={currentLoad}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onHoverPreview={setHoveredCredits}
        onHoverEnd={() => setHoveredCredits(0)}
        isExemptionActive={isExemptionActive}
        isDeclineBlocked={isDeclineBlocked}
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
