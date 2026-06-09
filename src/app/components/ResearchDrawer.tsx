import { X, BookOpen, GraduationCap, Award, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import type { Staff } from '../types';

interface ResearchDrawerProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TeachingHistory {
  semester: string;
  courses: Array<{ code: string; name: string; credits: number }>;
}

interface ResearchPublication {
  title: string;
  journal: string;
  year: number;
  type: 'Journal' | 'Conference' | 'Book Chapter';
}

const mockTeachingHistory: Record<string, TeachingHistory[]> = {
  'Dr. Aisyah Rahman': [
    {
      semester: 'Fall 2025',
      courses: [
        { code: 'CS101', name: 'Intro to Programming', credits: 3.0 },
        { code: 'CS201', name: 'Object-Oriented Programming', credits: 3.0 },
        { code: 'CS301', name: 'Software Design', credits: 3.0 },
      ],
    },
  ],
  'Prof. Muhammad Ali': [
    {
      semester: 'Fall 2025',
      courses: [
        { code: 'CS303', name: 'Database Systems', credits: 3.0 },
        { code: 'CS403', name: 'Advanced Databases', credits: 3.0 },
      ],
    },
  ],
};

const mockResearchPublications: Record<string, ResearchPublication[]> = {
  'Dr. Aisyah Rahman': [
    {
      title: 'Machine Learning Approaches for Educational Data Mining',
      journal: 'IEEE Transactions on Learning Technologies',
      year: 2026,
      type: 'Journal',
    },
    {
      title: 'Adaptive Learning Systems: A Comprehensive Survey',
      journal: 'ACM Computing Surveys',
      year: 2025,
      type: 'Journal',
    },
    {
      title: 'Real-time Student Performance Prediction using Neural Networks',
      journal: 'International Conference on Artificial Intelligence in Education',
      year: 2025,
      type: 'Conference',
    },
  ],
  'Prof. Muhammad Ali': [
    {
      title: 'Distributed Database Query Optimization Techniques',
      journal: 'ACM SIGMOD',
      year: 2026,
      type: 'Conference',
    },
    {
      title: 'NoSQL Database Performance Analysis',
      journal: 'Journal of Database Management',
      year: 2025,
      type: 'Journal',
    },
  ],
};

export function ResearchDrawer({ staff, isOpen, onClose }: ResearchDrawerProps) {
  if (!staff || !isOpen) return null;

  const teachingHistory = mockTeachingHistory[staff.name] || [];
  const publications = mockResearchPublications[staff.name] || [];

  const getPublicationIcon = (type: ResearchPublication['type']) => {
    const colors = {
      Journal: 'bg-blue-100 text-blue-700',
      Conference: 'bg-purple-100 text-purple-700',
      'Book Chapter': 'bg-green-100 text-green-700',
    };
    return colors[type];
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-[#900021] text-white font-semibold">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{staff.name}</h2>
              <p className="text-sm text-gray-500">Faculty Profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Load Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Semester Load</span>
              <Badge className="bg-[#900021] text-white">
                {staff.currentLoad} / 15 Credits
              </Badge>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#900021] transition-all"
                style={{ width: `${(staff.currentLoad / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Teaching History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-[#900021]" />
              <h3 className="font-semibold text-gray-900">Teaching History</h3>
            </div>

            {teachingHistory.length > 0 ? (
              <div className="space-y-4">
                {teachingHistory.map((semester, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm text-gray-700">{semester.semester}</span>
                    </div>
                    <div className="space-y-2">
                      {semester.courses.map((course, courseIdx) => (
                        <div
                          key={courseIdx}
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <div className="font-medium text-sm text-gray-900">{course.code}</div>
                            <div className="text-xs text-gray-500">{course.name}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {course.credits} CR
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No teaching history available</p>
            )}
          </div>

          {/* Research Activity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#900021]" />
              <h3 className="font-semibold text-gray-900">Research Publications</h3>
            </div>

            {publications.length > 0 ? (
              <div className="space-y-4">
                {publications.map((pub, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-[#900021] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 mb-2 leading-snug">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">{pub.journal}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getPublicationIcon(pub.type)}>
                            {pub.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{pub.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No publications available</p>
            )}
          </div>

          {/* Contextual Insight */}
          {publications.length >= 3 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-yellow-900 mb-1">High Research Activity</h4>
                  <p className="text-xs text-yellow-700">
                    This faculty member has published {publications.length} papers recently.
                    Consider their research commitments when assigning teaching loads.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
