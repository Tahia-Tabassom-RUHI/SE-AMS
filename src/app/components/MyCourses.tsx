import { TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppDataContext';

export function MyCourses() {
  const { user } = useAuth();
  const { myCourses, getStaffForUser, isStaffExemptionActive } = useAppData();
  const isCoordinator = user?.role === 'coordinator';
  const currentStaff = getStaffForUser(user);
  const isOnLeave = isStaffExemptionActive(currentStaff?.id) || user?.status === 'onleave';

  const courses = currentStaff
    ? myCourses.filter(course => course.ownerId === currentStaff.id)
    : [];
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const remainingCapacity = 15.0 - totalCredits;

  // For Lecturer: count only Teaching assignments. For Coordinator: count all assignments
  const acceptedCoursesCount = isCoordinator
    ? courses.length
    : courses.filter(course => course.roleType === 'Teaching').length;

  // Calculate load color
  const getLoadColor = (load: number) => {
    if (load < 12) return '#F59E0B';
    if (load > 15) return '#EF4444';
    return '#10B981';
  };

  const barColor = getLoadColor(totalCredits);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl">My Courses</h1>
          {isOnLeave && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">On Leave</Badge>
          )}
        </div>
        <p className="text-gray-600">
          Your confirmed teaching assignments for the current semester
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Accepted Courses</div>
          <div className="text-3xl font-bold text-gray-900">{acceptedCoursesCount}</div>
          <div className="text-xs text-gray-500 mt-1">Current semester assignments</div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Credits</div>
          <div className="text-3xl font-bold text-[#900021]">{totalCredits.toFixed(1)}</div>
          <div className="text-xs text-gray-500 mt-1">Out of 15.0 credit limit</div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Remaining Capacity</div>
          <div
            className="text-3xl font-bold"
            style={{ color: remainingCapacity > 0 ? '#10B981' : '#EF4444' }}
          >
            {remainingCapacity.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Credits before limit</div>
        </div>
      </div>

      {/* Workload Progress Bar */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: barColor }} />
            <h2 className="text-lg font-semibold">My Semester Workload</h2>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-lg" style={{ color: barColor }}>
              {totalCredits.toFixed(1)}
            </span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="font-medium">15.0 Credits</span>
          </div>
        </div>

        {/* Visual Gauge */}
        <div className="space-y-3">
          <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
            {/* Accepted Credits bar */}
            <div
              className="absolute top-0 left-0 h-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{
                width: `${Math.min((totalCredits / 20) * 100, 100)}%`,
                backgroundColor: barColor,
              }}
            >
              {totalCredits > 0 && (
                <span className="text-xs font-medium text-white">{totalCredits.toFixed(1)}</span>
              )}
            </div>

            {/* 15-credit limit marker */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: '75%' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-red-600 font-semibold whitespace-nowrap">
                15
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>20 credits</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: barColor }}></div>
              <span>Accepted ({totalCredits.toFixed(1)} CR)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <span>Under 12</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span>12–15 Optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <span>Over 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Semester
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#F3F4F6] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{course.courseCode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{course.courseName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      Sec {course.section}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={
                      course.roleType === 'Teaching'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-purple-100 text-purple-700 border-purple-200'
                    }>
                      {course.roleType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{course.credits}</div>
                    <div className="text-xs text-gray-500">CR</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-900">
                      <Users className="w-4 h-4 text-green-600" />
                      <span>{course.studentCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {course.semester}
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
