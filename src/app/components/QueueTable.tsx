import { CheckCircle2, X, Clock, AlertCircle, GraduationCap, ClipboardCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
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
  isDeclineBlocked?: boolean;
}

export function QueueTable({
  requests,
  currentLoad,
  onAccept,
  onDecline,
  onHoverPreview,
  onHoverEnd,
  isExemptionActive = false,
  isDeclineBlocked = false,
}: QueueTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // 15-credit maximum is always enforced; exemption only waives the 12-credit rejection floor.
  const canAccept = (request: AssignmentRequest) => {
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
      {/* Desktop table — hidden on small screens */}
      <div className="hidden md:block bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900 mb-0.5">
                        {request.courseCode}
                      </div>
                      <div className="text-sm text-gray-600 mb-1.5">
                        {request.courseName}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          Section {request.section}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {request.studentCount} students
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge className={
                        request.roleType === 'Teaching'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-purple-100 text-purple-700 border-purple-200'
                      }>
                        {getRoleIcon(request.roleType)}
                        <span className="ml-1">{request.roleType}</span>
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-2xl font-bold text-gray-900">
                        {request.credits}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">CR</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(request.deadlineDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isDeclineBlocked ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  disabled
                                  variant="outline"
                                  className="border-gray-300 text-gray-400 cursor-not-allowed rounded-lg"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Decline
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[220px] text-center">
                              <p className="text-sm">
                                Decline unavailable — accepted workload is below 12 credits.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Button
                            onClick={() => onDecline(request)}
                            variant="outline"
                            className="border-[#EF4444] text-[#EF4444] hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        )}

                        {acceptable ? (
                          <Button
                            onClick={() => onAccept(request)}
                            onMouseEnter={() => onHoverPreview?.(request.credits)}
                            onMouseLeave={() => onHoverEnd?.()}
                            className="bg-[#10B981] hover:bg-[#059669] text-white rounded-lg"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Accept
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
                                  Accept
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px] text-center">
                              <p className="text-sm">
                                Accepting would exceed the 15-credit semester limit.
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

      {/* Mobile card layout — shown only on small screens */}
      <div className="md:hidden space-y-3">
        {isDeclineBlocked && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Decline unavailable.</strong> Your accepted workload is below 12 credits. You may not decline assignments unless an exemption is active.
            </span>
          </div>
        )}

        {requests.map((request) => {
          const acceptable = canAccept(request);
          const isExpanded = expandedRow === request.id;

          return (
            <div
              key={request.id}
              className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden"
            >
              {/* Card header — always visible */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{request.courseCode}</div>
                    <div className="text-sm text-gray-600 truncate">{request.courseName}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getStatusBadge(request.status)}
                    <button
                      onClick={() => setExpandedRow(isExpanded ? null : request.id)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4 text-gray-500" />
                        : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    Section {request.section}
                  </Badge>
                  <Badge className={
                    request.roleType === 'Teaching'
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-purple-100 text-purple-700 border-purple-200'
                  }>
                    {request.roleType}
                  </Badge>
                  <span className="text-sm font-bold text-gray-900">{request.credits} CR</span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="text-sm text-gray-600 space-y-1 mb-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Students</span>
                      <span>{request.studentCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Deadline</span>
                      <span>{new Date(request.deadlineDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Projected load</span>
                      <span className={currentLoad + request.credits > 15 ? 'text-red-600 font-medium' : 'text-green-700 font-medium'}>
                        {(currentLoad + request.credits).toFixed(1)} CR
                      </span>
                    </div>
                  </div>
                )}

                {/* Action row */}
                <div className="flex gap-2">
                  {isDeclineBlocked ? (
                    <Button
                      disabled
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-400 cursor-not-allowed text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onDecline(request)}
                      variant="outline"
                      className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-red-50 text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  )}

                  {acceptable ? (
                    <Button
                      onClick={() => onAccept(request)}
                      className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="flex-1 bg-[#D1D5DB] hover:bg-[#D1D5DB] cursor-not-allowed text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  )}
                </div>

                {!acceptable && (
                  <p className="text-xs text-red-600 mt-1.5">
                    Accepting would bring total to {(currentLoad + request.credits).toFixed(1)} CR — exceeds the 15-credit limit.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
