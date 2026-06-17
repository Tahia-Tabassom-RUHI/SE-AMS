import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { StaffActivity } from '../types';

interface AddActivityModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (activity: Omit<StaffActivity, 'id' | 'staffName'>) => void;
  activity?: StaffActivity | null;
}

export function AddActivityModal({ open, onClose, onSave, activity }: AddActivityModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Research' | 'Grant' | 'Service'>('Research');
  const [hours, setHours] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setType(activity.type);
      setHours(activity.hoursSpent.toString());
    } else {
      setTitle('');
      setType('Research');
      setHours('');
      setFileName('');
    }
  }, [activity, open]);

  const handleSave = () => {
    if (!title.trim() || !hours || Number(hours) <= 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    onSave({
      title: title.trim(),
      type,
      hoursSpent: Number(hours),
      mode: 'Hybrid',
      date: new Date(),
    });

    // Reset form
    setTitle('');
    setType('Research');
    setHours('');
    setFileName('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {activity ? 'Edit Activity' : 'Add New Activity'}
          </DialogTitle>
          <DialogDescription>
            Log your research, grants, and service activities. This information will be visible to
            coordinators and staff.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Activity Name */}
          <div>
            <Label htmlFor="activity-name" className="mb-2 block text-sm font-medium">
              Activity Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="activity-name"
              placeholder="e.g., Deep Learning for Software Engineering Research"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10"
            />
          </div>

          {/* Activity Type */}
          <div>
            <Label htmlFor="activity-type" className="mb-2 block text-sm font-medium">
              Activity Type <span className="text-red-500">*</span>
            </Label>
            <Select value={type} onValueChange={(val) => setType(val as typeof type)}>
              <SelectTrigger id="activity-type" className="h-10">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Research">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    Research
                  </div>
                </SelectItem>
                <SelectItem value="Grant">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    Grant
                  </div>
                </SelectItem>
                <SelectItem value="Service">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Service
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hours Spent */}
          <div>
            <Label htmlFor="hours-spent" className="mb-2 block text-sm font-medium">
              Hours Spent <span className="text-red-500">*</span>
            </Label>
            <Input
              id="hours-spent"
              type="number"
              min="1"
              placeholder="e.g., 120"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="h-10"
            />
            <p className="text-xs text-gray-500 mt-1">
              Estimated total hours dedicated to this activity
            </p>
          </div>

          {/* Documentation Upload (Optional) */}
          <div>
            <Label htmlFor="documentation" className="mb-2 block text-sm font-medium">
              Documentation <span className="text-gray-400">(Optional)</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <input
                id="documentation"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="documentation"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Upload research papers, grant letters, or certificates
                </p>
                <p className="text-xs text-gray-400">PDF, DOC, DOCX (Max 10MB)</p>
                {fileName && (
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    Selected: {fileName}
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* Mode Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> All activities are automatically tagged as "Hybrid" mode
              in the system.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#900021] hover:bg-[#5C001F]">
            {activity ? 'Save Changes' : 'Add Activity'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
