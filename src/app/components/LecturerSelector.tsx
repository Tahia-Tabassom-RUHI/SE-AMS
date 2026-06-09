import { useState } from 'react';
import { ChevronDown, Shield } from 'lucide-react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Badge } from './ui/badge';
import type { Staff, Course } from '../types';

interface LecturerSelectorProps {
  staff: Staff[];
  selectedLecturer: Staff | null;
  onSelectLecturer: (staff: Staff) => void;
  selectedCourse: Course | null;
}

export function LecturerSelector({
  staff,
  selectedLecturer,
  onSelectLecturer,
  selectedCourse
}: LecturerSelectorProps) {
  const [open, setOpen] = useState(false);

  const getStaffColor = (staff: Staff, newCredits: number = 0) => {
    const projected = staff.currentLoad + newCredits;
    if (projected > 15) return 'text-red-500 line-through';
    if (projected >= 12) return 'text-orange-500';
    if (staff.currentLoad === 0) return 'text-gray-400';
    return 'text-gray-900';
  };

  const isStaffDisabled = (staff: Staff) => {
    if (!selectedCourse) return false;
    return staff.currentLoad + selectedCourse.credits > 15;
  };

  return (
    <div>
      <label className="block mb-2 font-medium">
        Assign to Lecturer
      </label>
      <p className="text-xs text-gray-500 mb-2">
        Only showing staff with available capacity.
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-[#c5c5c5] h-12"
          >
            {selectedLecturer ? (
              <span className="flex items-center gap-2">
                {selectedLecturer.name}
                <Badge variant="secondary" className="ml-2">
                  {selectedLecturer.currentLoad}/15
                </Badge>
              </span>
            ) : (
              <span className="text-gray-400">Select a lecturer...</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" align="start">
          <div className="max-h-80 overflow-auto">
            {staff.map(person => {
              const disabled = isStaffDisabled(person);
              const colorClass = getStaffColor(person, selectedCourse?.credits || 0);

              return (
                <button
                  key={person.id}
                  onClick={() => {
                    if (!disabled) {
                      onSelectLecturer(person);
                      setOpen(false);
                    }
                  }}
                  disabled={disabled}
                  className={`w-full px-4 py-3 text-left transition-colors ${
                    disabled
                      ? 'opacity-50 cursor-not-allowed bg-gray-50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <span className={`font-medium ${colorClass}`}>
                          {person.name}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          [{person.currentLoad}/15 Credits]
                        </span>
                      </div>
                      {person.exemptionFlag && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <Shield className="w-3 h-3" />
                          <span className="text-xs font-medium">Exempt</span>
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        person.currentLoad === 0
                          ? 'bg-gray-100'
                          : person.currentLoad >= 12
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }
                    >
                      {person.currentLoad >= 12 ? 'Near Limit' : 'Available'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {person.exemptionFlag ? (
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {person.exemptionType} - Exempt from 12-credit minimum
                      </span>
                    ) : (
                      <>
                        {person.currentLoad === 0 && 'No courses assigned'}
                        {person.currentLoad > 0 && person.currentLoad < 10 && 'Below optimal range'}
                        {person.currentLoad >= 10 && person.currentLoad < 12 && 'Optimal workload'}
                        {person.currentLoad >= 12 && person.currentLoad < 15 && 'Approaching maximum'}
                        {person.currentLoad >= 15 && 'At maximum capacity'}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
