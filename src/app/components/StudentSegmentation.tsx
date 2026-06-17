import { useState } from 'react';
import { Users, Globe, Home, GraduationCap } from 'lucide-react';

type IntakeFilter = 'all' | 'normal' | 'direct';

interface CourseRow {
  courseCode: string;
  courseName: string;
  international: number;
  local: number;
  total: number;
  normal: number | null;
  direct: number | null;
  localPct: number;
  intlPct: number;
}

const allData: CourseRow[] = [
  { courseCode: 'CS101', courseName: 'Introduction to Programming', international: 15, local: 30, total: 45, normal: 35, direct: 10, localPct: 67, intlPct: 33 },
  { courseCode: 'CS202', courseName: 'Data Structures',             international: 12, local: 26, total: 38, normal: 30, direct: 8,  localPct: 68, intlPct: 32 },
  { courseCode: 'CS303', courseName: 'Database Systems',            international: 10, local: 25, total: 35, normal: 28, direct: 7,  localPct: 71, intlPct: 29 },
  { courseCode: 'CS404', courseName: 'Software Engineering',        international: 8,  local: 20, total: 28, normal: 22, direct: 6,  localPct: 71, intlPct: 29 },
  { courseCode: 'MA101', courseName: 'Calculus I',                  international: 18, local: 32, total: 50, normal: 40, direct: 10, localPct: 64, intlPct: 36 },
  { courseCode: 'CS205', courseName: 'Algorithms',                  international: 10, local: 22, total: 32, normal: 26, direct: 6,  localPct: 69, intlPct: 31 },
];

const normalData: CourseRow[] = [
  { courseCode: 'CS101', courseName: 'Introduction to Programming', international: 11, local: 24, total: 35, normal: 35, direct: null, localPct: 69, intlPct: 31 },
  { courseCode: 'CS202', courseName: 'Data Structures',             international: 9,  local: 21, total: 30, normal: 30, direct: null, localPct: 70, intlPct: 30 },
  { courseCode: 'CS303', courseName: 'Database Systems',            international: 8,  local: 20, total: 28, normal: 28, direct: null, localPct: 71, intlPct: 29 },
  { courseCode: 'CS404', courseName: 'Software Engineering',        international: 6,  local: 16, total: 22, normal: 22, direct: null, localPct: 73, intlPct: 27 },
  { courseCode: 'MA101', courseName: 'Calculus I',                  international: 14, local: 26, total: 40, normal: 40, direct: null, localPct: 65, intlPct: 35 },
  { courseCode: 'CS205', courseName: 'Algorithms',                  international: 8,  local: 18, total: 26, normal: 26, direct: null, localPct: 69, intlPct: 31 },
];

const directData: CourseRow[] = [
  { courseCode: 'CS101', courseName: 'Introduction to Programming', international: 4, local: 6, total: 10, normal: null, direct: 10, localPct: 60, intlPct: 40 },
  { courseCode: 'CS202', courseName: 'Data Structures',             international: 3, local: 5, total: 8,  normal: null, direct: 8,  localPct: 63, intlPct: 38 },
  { courseCode: 'CS303', courseName: 'Database Systems',            international: 2, local: 5, total: 7,  normal: null, direct: 7,  localPct: 71, intlPct: 29 },
  { courseCode: 'CS404', courseName: 'Software Engineering',        international: 2, local: 4, total: 6,  normal: null, direct: 6,  localPct: 67, intlPct: 33 },
  { courseCode: 'MA101', courseName: 'Calculus I',                  international: 4, local: 6, total: 10, normal: null, direct: 10, localPct: 60, intlPct: 40 },
  { courseCode: 'CS205', courseName: 'Algorithms',                  international: 2, local: 4, total: 6,  normal: null, direct: 6,  localPct: 67, intlPct: 33 },
];

const summaryByFilter = {
  all: {
    total: 228,
    international: 73,
    local: 155,
    intlPct: '32.0',
    localPct: '68.0',
    localColor: 'text-green-600',
  },
  normal: {
    total: 183,
    international: 56,
    local: 127,
    intlPct: '31.0',
    localPct: '69.0',
    localColor: 'text-green-600',
  },
  direct: {
    total: 45,
    international: 17,
    local: 30,
    intlPct: '38.0',
    localPct: '62.0',
    localColor: 'text-green-600',
  },
};

const yearDistribution = { year1: 65, year2: 52, year3: 48, year4: 38 };

const intakeTabs: { key: IntakeFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'normal', label: 'Normal Intake' },
  { key: 'direct', label: 'Direct Intake' },
];

export function StudentSegmentation() {
  const [intakeFilter, setIntakeFilter] = useState<IntakeFilter>('all');

  const tableData = intakeFilter === 'all' ? allData : intakeFilter === 'normal' ? normalData : directData;
  const summary = summaryByFilter[intakeFilter];

  const normalHeaderStyle = intakeFilter === 'normal'
    ? { color: '#111827', fontWeight: 700 }
    : {};
  const directHeaderStyle = intakeFilter === 'direct'
    ? { color: '#185FA5', fontWeight: 700 }
    : {};

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Student Segmentation</h1>
        <p className="text-gray-600">
          Departmental planning data for student distribution and demographics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-4">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Students</div>
            <Users className="w-5 h-5 text-[#900021]" />
          </div>
          <div className="text-4xl font-bold text-gray-900">{summary.total}</div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">International</div>
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-4xl font-bold text-blue-600">{summary.intlPct}%</div>
          <div className="text-xs text-gray-500 mt-1">{summary.international} students</div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Local</div>
            <Home className="w-5 h-5 text-green-600" />
          </div>
          <div className={`text-4xl font-bold ${summary.localColor}`}>{summary.localPct}%</div>
          <div className="text-xs text-gray-500 mt-1">{summary.local} students</div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Year 1-4</div>
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <div className="grid grid-cols-4 gap-1 mt-3">
            {(['year1', 'year2', 'year3', 'year4'] as const).map((y, i) => (
              <div key={y} className="text-center">
                <div className="text-lg font-bold text-gray-900">{yearDistribution[y]}</div>
                <div className="text-xs text-gray-500">Y{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intake Type Stat Cards */}
      <div className="flex gap-4 mb-6">
        <div
          className="bg-white border border-[#E5E7EB] rounded-lg"
          style={{
            borderLeft: intakeFilter === 'normal' ? '4px solid #7B1A2A' : '3px solid #7B1A2A',
            padding: '20px 24px',
            minWidth: '220px',
            boxShadow: intakeFilter === 'normal' ? '0 0 0 1px #7B1A2A22' : undefined,
          }}
        >
          <div className="text-sm text-[#6B7280] mb-1">Normal Intake</div>
          <div className="text-2xl font-semibold text-[#111827] mb-1">183</div>
          <div className="text-sm text-[#6B7280]">Standard admission route</div>
        </div>

        <div
          className="bg-white border border-[#E5E7EB] rounded-lg"
          style={{
            borderLeft: '3px solid #185FA5',
            padding: '20px 24px',
            minWidth: '220px',
          }}
        >
          <div className="text-sm text-[#6B7280] mb-1">Direct Intake</div>
          <div className="text-2xl font-semibold text-[#111827] mb-1">45</div>
          <div className="text-sm text-[#6B7280]">Advanced standing / diploma entry</div>
        </div>
      </div>

      {/* Intake Filter Tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {intakeTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setIntakeFilter(tab.key)}
            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
              intakeFilter === tab.key
                ? 'bg-[#900021] border-[#900021] text-white'
                : 'border-[#c5c5c5] bg-white text-gray-600 hover:border-[#900021] hover:text-[#900021]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Segmentation Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#F9FAFB] border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Course Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">International</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Local</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Total</th>
                <th
                  className="px-6 py-4 text-center text-xs uppercase tracking-wider"
                  style={{ width: '100px', color: intakeFilter === 'normal' ? '#111827' : '#6B7280', fontWeight: intakeFilter === 'normal' ? 700 : 600, ...normalHeaderStyle }}
                >
                  Normal
                </th>
                <th
                  className="px-6 py-4 text-center text-xs uppercase tracking-wider"
                  style={{ width: '100px', color: intakeFilter === 'direct' ? '#185FA5' : '#6B7280', fontWeight: intakeFilter === 'direct' ? 700 : 600, ...directHeaderStyle }}
                >
                  Direct
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((course, idx) => (
                <tr
                  key={course.courseCode}
                  className={`hover:bg-[#F3F4F6] transition-colors ${idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{course.courseCode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{course.courseName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900">{course.international}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-gray-900">{course.local}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-gray-900">{course.total}</div>
                  </td>
                  <td className="px-6 py-4 text-center" style={{ width: '100px' }}>
                    {course.normal !== null ? (
                      <span style={{ color: '#111827', fontSize: 14, fontWeight: intakeFilter === 'normal' ? 500 : 400 }}>
                        {course.normal}
                      </span>
                    ) : (
                      <span style={{ color: '#9CA3AF', fontSize: 14 }}>—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ width: '100px' }}>
                    {course.direct !== null ? (
                      <span style={{ color: '#185FA5', fontSize: 14, fontWeight: intakeFilter === 'direct' ? 500 : 400 }}>
                        {course.direct}
                      </span>
                    ) : (
                      <span style={{ color: '#9CA3AF', fontSize: 14 }}>—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex h-2.5 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-green-500" style={{ width: `${course.localPct}%` }} />
                      <div className="h-full bg-blue-500" style={{ width: `${course.intlPct}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                        {course.localPct}% local
                      </span>
                      <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                        {course.intlPct}% intl
      </span>
                    </div>
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
