import { useState } from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';
import type { Staff } from '../types';

interface ModeratorSectionProps {
  staff: Staff[];
  selectedLecturer: Staff | null;
  primaryModerator: Staff | null;
  secondaryModerator: Staff | null;
  onSelectPrimary: (staff: Staff | null) => void;
  onSelectSecondary: (staff: Staff | null) => void;
}

// Fixed moderation counts for consistency
const getModerationCount = (staffName: string): number => {
  const moderationCounts: Record<string, number> = {
    'Prof. Muhammad Ali': 1,
    'Dr. Aisyah Rahman': 1,
    'Prof. Ibrahim Malik': 1,
    'Dr. Noor Hayati': 1,
    'Dr. Siti Aminah': 0,
    'Dr. Fatimah Zahra': 0,
    'Dr. Ahmad Hassan': 0,
    'Dr. Zatul Alwani (Me)': 0,
    'Dr. Zatul Alwani': 0,
  };
  return moderationCounts[staffName] ?? 0;
};

export function ModeratorSection({
  staff,
  selectedLecturer,
  primaryModerator,
  secondaryModerator,
  onSelectPrimary,
  onSelectSecondary,
}: ModeratorSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryOpen, setPrimaryOpen] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);

  const getAvailableModerators = (excludeId?: string) => {
    return staff.filter(person => {
      if (selectedLecturer && person.id === selectedLecturer.id) return false;
      if (excludeId && person.id === excludeId) return false;
      return true;
    });
  };

  const ModeratorDropdown = ({
    label,
    selected,
    onSelect,
    exclude,
    open,
    setOpen,
  }: {
    label: string;
    selected: Staff | null;
    onSelect: (staff: Staff | null) => void;
    exclude?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  }) => {
    const availableStaff = getAvailableModerators(exclude);

    return (
      <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-dashed border-2 border-gray-300 h-10 text-gray-600"
            >
              {selected ? (
                <span className="flex items-center gap-2">
                  {selected.name}
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                      <Info className="w-3 h-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current moderation load: {getModerationCount(selected.name)} course{getModerationCount(selected.name) !== 1 ? 's' : ''}</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              ) : (
                <span className="text-gray-400">Select moderator (optional)</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <div className="max-h-60 overflow-auto">
              {selected && (
                <button
                  onClick={() => {
                    onSelect(null);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-500 italic border-b"
                >
                  Clear selection
                </button>
              )}
              {availableStaff.map(person => {
                const count = getModerationCount(person.name);
                return (
                  <button
                    key={person.id}
                    onClick={() => {
                      onSelect(person);
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{person.name}</span>
                      <Badge className="bg-[#900021] text-white text-xs">
                        {count} moderation{count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">Add Moderator (Optional)</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center cursor-default">
                    <Info className="w-4 h-4 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    FR-05: Assign moderators for quality assurance. Moderators cannot moderate their own courses.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            {(primaryModerator || secondaryModerator) && (
              <Badge variant="secondary">
                {[primaryModerator, secondaryModerator].filter(Boolean).length} assigned
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 text-left">
            You can also manage or change moderators later via Course & Moderator Manager
          </p>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 space-y-4">
        <ModeratorDropdown
          label="Primary Moderator"
          selected={primaryModerator}
          onSelect={onSelectPrimary}
          exclude={secondaryModerator?.id}
          open={primaryOpen}
          setOpen={setPrimaryOpen}
        />
        <ModeratorDropdown
          label="Secondary Moderator"
          selected={secondaryModerator}
          onSelect={onSelectSecondary}
          exclude={primaryModerator?.id}
          open={secondaryOpen}
          setOpen={setSecondaryOpen}
        />

        {selectedLecturer && (
          <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-3">
            <strong>Note:</strong> {selectedLecturer.name} is excluded from moderator selection to prevent self-moderation.
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}