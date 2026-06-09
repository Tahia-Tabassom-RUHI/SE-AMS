import { useState } from 'react';
import { CheckCircle, Clock, XCircle, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { Assignment } from '../types';

const mockAssignments: Assignment[] = [
  {
    id: 'assign-1',
    lecturerName: 'Dr. Aisyah Rahman',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    section: '01',
    credits: 3.0,
    status: 'accepted',
    sentDate: new Date('2026-04-20'),
    responseDate: new Date('2026-04-21'),
  },
  {
    id: 'assign-2',
    lecturerName: 'Dr. Aisyah Rahman',
    courseCode: 'CS202',
    courseName: 'Data Structures',
    section: '01',
    credits: 3.0,
    status: 'pending',
    sentDate: new Date('2026-04-26'),
  },
  {
    id: 'assign-3',
    lecturerName: 'Prof. Muhammad Ali',
    courseCode: 'CS303',
    courseName: 'Database Systems',
    section: '01',
    credits: 3.0,
    status: 'accepted',
    sentDate: new Date('2026-04-18'),
    responseDate: new Date('2026-04-19'),
  },
  {
    id: 'assign-4',
    lecturerName: 'Dr. Ahmad Hassan',
    courseCode: 'MA101',
    courseName: 'Calculus I',
    section: '02',
    credits: 4.0,
    status: 'rejected',
    rejectionReason: 'Reached Maximum Credit Limit (15)',
    sentDate: new Date('2026-04-15'),
    responseDate: new Date('2026-04-16'),
  },
  {
    id: 'assign-5',
    lecturerName: 'Dr. Siti Aminah',
    courseCode: 'CS205',
    courseName: 'Algorithms',
    section: '01',
    credits: 3.0,
    status: 'accepted',
    sentDate: new Date('2026-04-22'),
    responseDate: new Date('2026-04-23'),
  },
  {
    id: 'assign-6',
    lecturerName: 'Dr. Noor Hayati',
    courseCode: 'CS404',
    courseName: 'Software Engineering',
    section: '01',
    credits: 3.0,
    status: 'rejected',
    rejectionReason: 'Course Outside of Specialization',
    sentDate: new Date('2026-04-19'),
    responseDate: new Date('2026-04-20'),
  },
  {
    id: 'assign-7',
    lecturerName: 'Dr. Fatimah Zahra',
    courseCode: 'CS301',
    courseName: 'Operating Systems',
    section: '01',
    credits: 3.0,
    status: 'pending',
    sentDate: new Date('2026-04-27'),
  },
];

export function AssignmentStatusBoard() {
  const [assignments] = useState<Assignment[]>(mockAssignments);

  const getStatusBadge = (status: Assignment['status']) => {
    const configs = {
      accepted: {
        icon: CheckCircle,
        className: 'bg-[#D1FAE5] text-[#065F46] border-green-200',
        label: 'Accepted',
      },
      pending: {
        icon: Clock,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        label: 'Pending',
      },
      rejected: {
        icon: XCircle,
        className: 'bg-[#FEE2E2] text-[#991B1B] border-red-200',
        label: 'Rejected',
      },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const statusCounts = {
    accepted: assignments.filter(a => a.status === 'accepted').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    rejected: assignments.filter(a => a.status === 'rejected').length,
  };

  const totalCredits = assignments
    .filter(a => a.status === 'accepted')
    .reduce((sum, a) => sum + a.credits, 0);

  return (
    <TooltipProvider>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Assignment Status Board</h1>
          <p className="text-gray-600">
            Monitor teaching load distribution across the department
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Accepted</div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-green-600">
              {statusCounts.accepted.toString().padStart(2, '0')}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Pending</div>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-4xl font-bold text-yellow-600">
              {statusCounts.pending.toString().padStart(2, '0')}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Rejected</div>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-600">
              {statusCounts.rejected.toString().padStart(2, '0')}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Credits Assigned</div>
            </div>
            <div className="text-4xl font-bold text-[#900021]">{totalCredits}</div>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-[#c5c5c5]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lecturer Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course & Section
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sent Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assignments.map((assignment, idx) => (
                  <tr
                    key={assignment.id}
                    className={`hover:bg-[#F3F4F6] transition-colors ${
                      idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{assignment.lecturerName}</span>
                        {assignment.lecturerName === 'Dr. Ahmad Hassan' && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">Exempt</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {assignment.courseCode} - {assignment.section}
                      </div>
                      <div className="text-sm text-gray-500">{assignment.courseName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-semibold text-gray-900">{assignment.credits}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(assignment.status)}
                        {assignment.rejectionReason && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{assignment.rejectionReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {assignment.sentDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                      {assignment.responseDate && (
                        <div className="text-xs text-gray-400 mt-1">
                          Response: {assignment.responseDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
