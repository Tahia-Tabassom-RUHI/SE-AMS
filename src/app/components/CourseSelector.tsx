import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Input } from './ui/input';
import type { Course } from '../types';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: Course | null;
  onSelectCourse: (course: Course) => void;
}

export function CourseSelector({ courses, selectedCourse, onSelectCourse }: CourseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const coursesByYear = filteredCourses.reduce((acc, course) => {
    if (!acc[course.year]) acc[course.year] = [];
    acc[course.year].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Course Section
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-[#c5c5c5] h-12"
          >
            {selectedCourse ? (
              <span>
                {selectedCourse.code} | Section {selectedCourse.section} | {selectedCourse.credits} Credits
              </span>
            ) : (
              <span className="text-gray-400 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Type course code or name...
              </span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-auto">
            {Object.keys(coursesByYear).map(year => (
              <div key={year}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  Year {year}
                </div>
                {coursesByYear[Number(year)].map(course => (
                  <button
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      setOpen(false);
                      setSearchTerm('');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium">
                      {course.code} {course.name} - Section {course.section}
                    </div>
                    <div className="text-xs text-gray-500">
                      {course.credits} Credits | {course.studentCount} Students
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Section Info Card */}
      {selectedCourse && (
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Course:</span>{' '}
              <span className="font-medium">{selectedCourse.code} - {selectedCourse.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Section:</span>{' '}
              <span className="font-medium">{selectedCourse.section}</span>
            </div>
            <div>
              <span className="text-gray-600">Credit Value:</span>{' '}
              <span className="font-medium">{selectedCourse.credits}</span>
            </div>
            <div>
              <span className="text-gray-600">Student Count:</span>{' '}
              <span className="font-medium">{selectedCourse.studentCount}</span>
            </div>
            <div>
              <span className="text-gray-600">Lab Hours:</span>{' '}
              <span className="font-medium">{selectedCourse.labHours}</span>
            </div>
            <div>
              <span className="text-gray-600">Tutorial Hours:</span>{' '}
              <span className="font-medium">{selectedCourse.tutorialHours}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
