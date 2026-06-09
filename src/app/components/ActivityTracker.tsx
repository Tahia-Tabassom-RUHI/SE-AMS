import { useState } from 'react';
import { CheckCircle, Clock, XCircle, RefreshCw, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SentAssignment {
  id: string;
  courseCode: string;
  courseName: string;
  section: string;
  lecturerName: string;
  credits: number;
  status: 'accepted' | 'pending' | 'rejected';
  sentDate: Date;
  responseDate?: Date;
  rejectionReason?: string;
}

interface ActivityTrackerProps {
  onReassign: (assignment: SentAssignment) => void;
}

const mockAssignments: SentAssignment[] = [
  {
    id: 'sent-1',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    section: '01',
    lecturerName: 'Dr. Aisyah Rahman',
    credits: 3.0,
    status: 'pending',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'sent-2',
    courseCode: 'CS202',
    courseName: 'Data Structures',
    section: '01',
    lecturerName: 'Dr. Aisyah Rahman',
    credits: 3.0,
    status: 'pending',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 'sent-3',
    courseCode: 'CS303',
    courseName: 'Database Systems',
    section: '01',
    lecturerName: 'Prof. Muhammad Ali',
    credits: 3.0,
    status: 'accepted',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
    responseDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'sent-4',
    courseCode: 'MA101',
    courseName: 'Calculus I',
    section: '02',
    lecturerName: 'Dr. Ahmad Hassan',
    credits: 4.0,
    status: 'rejected',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 72),
    responseDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
    rejectionReason: 'Reached Maximum Credit Limit (15)',
  },
  {
    id: 'sent-5',
    courseCode: 'CS205',
    courseName: 'Algorithms',
    section: '01',
    lecturerName: 'Dr. Siti Aminah',
    credits: 3.0,
    status: 'accepted',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 96),
    responseDate: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
  {
    id: 'sent-6',
    courseCode: 'CS404',
    courseName: 'Software Engineering',
    section: '01',
    lecturerName: 'Dr. Noor Hayati',
    credits: 3.0,
    status: 'rejected',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 120),
    responseDate: new Date(Date.now() - 1000 * 60 * 60 * 96),
    rejectionReason: 'Course Outside of Specialization',
  },
];

export function ActivityTracker({ onReassign }: ActivityTrackerProps) {
  const [assignments] = useState<SentAssignment[]>(mockAssignments);

  const statusCounts = {
    accepted: assignments.filter(a => a.status === 'accepted').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    rejected: assignments.filter(a => a.status === 'rejected').length,
  };

  const getStatusBadge = (status: 'accepted' | 'pending' | 'rejected') => {
    const styles = {
      accepted: 'bg-[#D1FAE5] text-[#065F46] border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-[#FEE2E2] text-[#991B1B] border-red-200',
    };

    const icons = {
      accepted: CheckCircle,
      pending: Clock,
      rejected: XCircle,
    };

    const Icon = icons[status];

    return (
      <Badge className={styles[status]}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Activity Tracker</h1>
        <p className="text-gray-600">Monitor the status of all sent assignment requests</p>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Accepted</div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {statusCounts.accepted.toString().padStart(2, '0')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Pending</div>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {statusCounts.pending.toString().padStart(2, '0')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Rejected</div>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {statusCounts.rejected.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className={`hover:bg-[#F3F4F6] transition-colors ${
                    assignment.status === 'rejected' ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      {assignment.courseCode} - {assignment.courseName}
                    </div>
                    <div className="text-sm text-gray-500">Section {assignment.section}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{assignment.lecturerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-gray-900">{assignment.credits}</div>
                    <div className="text-xs text-gray-500">CR</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(assignment.status)}
                    {assignment.rejectionReason && (
                      <div className="text-xs text-red-600 mt-1 max-w-xs">
                        {assignment.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {assignment.sentDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    {assignment.responseDate && (
                      <div className="text-xs text-gray-400 mt-1">
                        Response: {assignment.responseDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {assignment.status === 'rejected' && (
                      <Button
                        onClick={() => onReassign(assignment)}
                        variant="outline"
                        size="sm"
                        className="border-[#900021] text-[#900021] hover:bg-blue-50"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Reassign
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
