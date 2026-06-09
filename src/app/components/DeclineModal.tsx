import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import type { AssignmentRequest } from '../types';

interface DeclineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: AssignmentRequest | null;
  onConfirm: (reason: string) => void;
}

const DECLINE_REASONS = [
  'Reached Maximum Credit Limit (15)',
  'Research/Administrative Conflict',
  'Sabbatical/Leave of Absence',
  'Course Outside of Specialization',
  'Other (Requires text input)',
];

export function DeclineModal({ open, onOpenChange, request, onConfirm }: DeclineModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    if (!selectedReason) return;

    const finalReason = selectedReason === 'Other (Requires text input)'
      ? customReason
      : selectedReason;

    if (!finalReason.trim()) return;

    onConfirm(finalReason);

    // Reset state
    setSelectedReason('');
    setCustomReason('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedReason('');
    setCustomReason('');
  };

  const isValid = selectedReason && (
    selectedReason !== 'Other (Requires text input)' || customReason.trim()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            Decline Assignment
          </DialogTitle>
          <DialogDescription>
            Please provide a reason for declining this assignment. This information will be sent to the Coordinator.
          </DialogDescription>
        </DialogHeader>

        {request && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="font-semibold text-gray-900 mb-1">
              {request.courseCode} - {request.courseName}
            </div>
            <div className="text-sm text-gray-600">
              Section {request.section} | {request.credits} Credits | {request.roleType}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="reason" className="mb-2 block">
              Reason for Declining <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {DECLINE_REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReason === 'Other (Requires text input)' && (
            <div>
              <Label htmlFor="custom-reason" className="mb-2 block">
                Please specify <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="custom-reason"
                placeholder="Enter your reason for declining this assignment..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters required
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValid || (selectedReason === 'Other (Requires text input)' && customReason.length < 10)}
            className="bg-[#EF4444] hover:bg-[#DC2626]"
          >
            Confirm Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
