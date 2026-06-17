import { useState } from 'react';
import { MessageSquare, X, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';
import type { Staff } from '../types';
import { mockStaff } from '../data/mockData';
import { useAppData } from '../contexts/AppDataContext';

interface CourseAssignment {
  id: string;
  courseCode: string;
  courseName: string;
  section: string;
  credits: number;
  lecturer: {
    name: string;
    status: 'accepted' | 'pending' | 'rejected';
  };
  moderator1: Staff | null;
  moderator2: Staff | null;
  yearLevel: number;
}

const mockAssignments: CourseAssignment[] = [
  {
    id: 'assign-1',
    courseCode: 'SCSE2243',
    courseName: 'Software Engineering',
    section: '01',
    credits: 3.0,
    lecturer: { name: 'Dr. Aisyah Rahman', status: 'accepted' },
    moderator1: mockStaff[1],
    moderator2: null,
    yearLevel: 2,
  },
  {
    id: 'assign-2',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    section: '01',
    credits: 3.0,
    lecturer: { name: 'Dr. Aisyah Rahman', status: 'pending' },
    moderator1: null,
    moderator2: null,
    yearLevel: 1,
  },
  {
    id: 'assign-3',
    courseCode: 'CS202',
    courseName: 'Data Structures',
    section: '01',
    credits: 3.0,
    lecturer: { name: 'Prof. Muhammad Ali', status: 'accepted' },
    moderator1: mockStaff[0],
    moderator2: mockStaff[4],
    yearLevel: 2,
  },
  {
    id: 'assign-4',
    courseCode: 'CS303',
    courseName: 'Database Systems',
    section: '01',
    credits: 3.0,
    lecturer: { name: 'Dr. Siti Aminah', status: 'accepted' },
    moderator1: mockStaff[5],
    moderator2: null,
    yearLevel: 3,
  },
  {
    id: 'assign-5',
    courseCode: 'CS404',
    courseName: 'Software Engineering',
    section: '01',
    credits: 3.0,
    lecturer: { name: 'Dr. Noor Hayati', status: 'rejected' },
    moderator1: null,
    moderator2: null,
    yearLevel: 4,
  },
  {
    id: 'assign-6',
    courseCode: 'MA101',
    courseName: 'Calculus I',
    section: '02',
    credits: 4.0,
    lecturer: { name: 'Dr. Fatimah Zahra', status: 'accepted' },
    moderator1: null,
    moderator2: null,
    yearLevel: 1,
  },
];

export function CourseModeratorManager() {
  const { staff } = useAppData();
  const [assignments, setAssignments] = useState<CourseAssignment[]>(mockAssignments);
  const [semester, setSemester] = useState('Spring 2026');
  const [yearLevel, setYearLevel] = useState('all');

  const getStatusBadge = (status: 'accepted' | 'pending' | 'rejected') => {
    const configs = {
      accepted: {
        className: 'bg-[#D1FAE5] text-[#065F46] border-green-200',
        label: 'Accepted',
      },
      pending: {
        className: 'bg-[#FEF3C7] text-[#92400E] border-yellow-200',
        label: 'Pending',
      },
      rejected: {
        className: 'bg-[#FEE2E2] text-[#991B1B] border-red-200',
        label: 'Rejected',
      },
    };
    return configs[status];
  };

  const getAvailableModerators = (assignmentId: string, excludeModeratorId?: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return staff;

    return staff.filter(staff => {
      // Exclude the assigned lecturer
      if (staff.name === assignment.lecturer.name) return false;
      // Exclude the other moderator if already assigned
      if (excludeModeratorId && staff.id === excludeModeratorId) return false;
      return true;
    });
  };

  const assignModerator = (assignmentId: string, moderatorSlot: 'moderator1' | 'moderator2', staff: Staff) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId ? { ...a, [moderatorSlot]: staff } : a
      )
    );
  };

  const removeModerator = (assignmentId: string, moderatorSlot: 'moderator1' | 'moderator2') => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId ? { ...a, [moderatorSlot]: null } : a
      )
    );
  };

  const filteredAssignments = assignments.filter(a => {
    if (yearLevel !== 'all' && a.yearLevel !== Number(yearLevel)) return false;
    return true;
  });

  // Fixed moderation counts for consistency across all dropdowns
  const getModerationCount = (staffName: string): number => {
    const moderationCounts: Record<string, number> = {
      'Prof. Muhammad Ali': 1,
      'Dr. Aisyah Rahman': 1,
      'Prof. Ibrahim Malik': 1,
      'Dr. Noor Hayati': 1,
      'Dr. Siti Aminah': 0,
      'Dr. Fatimah Zahra': 0,
      'Dr. Ahmad Hassan': 0,
      'Dr. Zatul Alwani': 0,
    };
    return moderationCounts[staffName] ?? 0;
  };

  const ModeratorCell = ({
    assignment,
    slot,
  }: {
    assignment: CourseAssignment;
    slot: 'moderator1' | 'moderator2';
  }) => {
    const [open, setOpen] = useState(false);
    const moderator = assignment[slot];
    const otherModeratorId = slot === 'moderator1' ? assignment.moderator2?.id : assignment.moderator1?.id;
    const availableStaff = getAvailableModerators(assignment.id, otherModeratorId);

    if (moderator) {
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] hover:bg-[#EDE9FE] transition-colors">
            {moderator.name}
            <button
              onClick={() => removeModerator(assignment.id, slot)}
              className="ml-2 hover:text-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        </div>
      );
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="border-2 border-dashed border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Add Moderator
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="max-h-60 overflow-auto">
            {availableStaff.map(staff => {
              const moderationCount = getModerationCount(staff.name);

              return (
                <button
                  key={staff.id}
                  onClick={() => {
                    assignModerator(assignment.id, slot, staff);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left transition-colors text-sm flex items-center justify-between hover:bg-gray-100"
                >
                  <span className="font-medium">{staff.name}</span>
                  <Badge className="bg-[#900021] text-white text-xs">
                    {moderationCount} moderation{moderationCount !== 1 ? 's' : ''}
                  </Badge>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Course & Moderator Manager</h1>
        <p className="text-gray-600">
          Central place to add, change, or remove moderators for all assigned courses. Initial moderator setup can also be done during assignment in the Assignment Tool.
        </p>
      </div>

      {/* Filter Bar — styled like MyActivityTracker */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Filter Assignments</h3>
          {(semester !== 'Spring 2026' || yearLevel !== 'all') && (
            <button
              onClick={() => { setSemester('Spring 2026'); setYearLevel('all'); }}
              className="text-sm text-[#900021] hover:text-[#5C001F] flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            >
              <option value="Spring 2026">Spring 2026</option>
              <option value="Fall 2025">Fall 2025</option>
              <option value="Summer 2026">Summer 2026</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            >
              <option value="all">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards — moved above table */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Assignments</div>
          <div className="text-2xl font-bold text-gray-900">{filteredAssignments.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">With Moderators</div>
          <div className="text-2xl font-bold text-[#7C3AED]">
            {filteredAssignments.filter(a => a.moderator1 || a.moderator2).length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Pending Acceptance</div>
          <div className="text-2xl font-bold text-[#92400E]">
            {filteredAssignments.filter(a => a.lecturer.status === 'pending').length}
          </div>
        </div>
      </div>

      {/* Master Oversight Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lecturer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div>
                    Moderator 1
                    <span className="text-xs text-gray-400 ml-1">(Optional)</span>
                  </div>
                  <div className="text-xs text-gray-500 italic font-normal normal-case mt-1">
                    Staff with 3+ moderations are flagged
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Moderator 2
                  <span className="text-xs text-gray-400 ml-1">(Optional)</span>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment, idx) => {
                const statusConfig = getStatusBadge(assignment.lecturer.status);

                return (
                  <tr
                    key={assignment.id}
                    className={`hover:bg-[#F4F4F4] transition-colors ${
                      idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{assignment.courseCode}</div>
                      <div className="text-xs text-gray-500">{assignment.courseName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                        Sec {assignment.section}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{assignment.credits}</div>
                      <div className="text-xs text-gray-500">CR</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 mb-1">
                        {assignment.lecturer.name}
                      </div>
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <ModeratorCell assignment={assignment} slot="moderator1" />
                    </td>
                    <td className="px-6 py-4">
                      <ModeratorCell assignment={assignment} slot="moderator2" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <MessageSquare className="w-4 h-4 text-[#900021]" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add a note to this assignment</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
