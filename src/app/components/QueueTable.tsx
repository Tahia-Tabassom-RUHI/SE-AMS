import { CheckCircle2, X, Clock, AlertCircle, GraduationCap, ClipboardCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { AssignmentRequest } from '../types';

interface QueueTableProps {
  requests: AssignmentRequest[];
  currentLoad: number;
  onAccept: (request: AssignmentRequest) => void;
  onDecline: (request: AssignmentRequest) => void;
  onHoverPreview?: (credits: number) => void;
  onHoverEnd?: () => void;
  isExemptionActive?: boolean;
}

export function QueueTable({
  requests,
  currentLoad,
  onAccept,
  onDecline,
  onHoverPreview,
  onHoverEnd,
  isExemptionActive = false,
}: QueueTableProps) {
  const canAccept = (request: AssignmentRequest) => {
    if (isExemptionActive) return true;
    return currentLoad + request.credits <= 15;
  };

  const getStatusBadge = (status: 'new' | 'expiring') => {
    if (status === 'new') {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
          <Clock className="w-3 h-3 mr-1" />
          New
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-100 text-orange-700 border-orange-300">
        <AlertCircle className="w-3 h-3 mr-1" />
        Expiring Soon
      </Badge>
    );
  };

  const getRoleIcon = (roleType: 'Teaching' | 'Moderator') => {
    if (roleType === 'Teaching') {
      return <GraduationCap className="w-4 h-4 text-blue-600" />;
    }
    return <ClipboardCheck className="w-4 h-4 text-purple-600" />;
  };

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#c5c5c5] p-12 text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">All Clear!</h3>
        <p className="text-gray-600">
          You have no pending assignment requests at this time.
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credit Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => {
                const acceptable = canAccept(request);

                return (
                  <tr
                    key={request.id}
                    className="hover:bg-[#F3F4F6] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 mb-1">
                        {request.courseCode}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {request.courseName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          Section {request.section}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {request.studentCount} students
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        request.roleType === 'Teaching'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-purple-100 text-purple-700 border-purple-200'
                      }>
                        {getRoleIcon(request.roleType)}
                        <span className="ml-1">{request.roleType}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-2xl font-bold text-gray-900">
                        {request.credits}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">CR</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(request.deadlineDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 shadow-sm">
                        <Button
                          onClick={() => onDecline(request)}
                          variant="outline"
                          className="border-[#EF4444] text-[#EF4444] hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>

                        {acceptable ? (
                          <Button
                            onClick={() => onAccept(request)}
                            onMouseEnter={() => onHoverPreview?.(request.credits)}
                            onMouseLeave={() => onHoverEnd?.()}
                            className="bg-[#10B981] hover:bg-[#059669] text-white rounded-lg"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Accept Assignment
                          </Button>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  disabled
                                  className="bg-[#D1D5DB] hover:bg-[#D1D5DB] cursor-not-allowed"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Accept Assignment
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">
                                Accepting this assignment would exceed your 15-credit semester limit
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
}
