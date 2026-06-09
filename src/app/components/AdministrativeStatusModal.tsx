import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import type { Staff } from '../types';

interface AdministrativeStatusModalProps {
  open: boolean;
  onClose: () => void;
  lecturer: Staff | null;
  onSave: (exemptionData: {
    exemptionFlag: boolean;
    exemptionType?: 'Maternity Leave' | 'Adjunct Status' | 'Borrowed Staff';
    exemptionStartDate?: Date;
    exemptionExpiryDate?: Date;
    exemptionReason?: string;
  }) => void;
}

export function AdministrativeStatusModal({
  open,
  onClose,
  lecturer,
  onSave,
}: AdministrativeStatusModalProps) {
  const [exemptionActive, setExemptionActive] = useState(false);
  const [exemptionType, setExemptionType] = useState<'Maternity Leave' | 'Adjunct Status' | 'Borrowed Staff'>('Maternity Leave');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (lecturer) {
      setExemptionActive(lecturer.exemptionFlag || false);
      setExemptionType(lecturer.exemptionType || 'Maternity Leave');
      setStartDate(
        lecturer.exemptionStartDate
          ? new Date(lecturer.exemptionStartDate).toISOString().split('T')[0]
          : ''
      );
      setExpiryDate(
        lecturer.exemptionExpiryDate
          ? new Date(lecturer.exemptionExpiryDate).toISOString().split('T')[0]
          : ''
      );
      setReason(lecturer.exemptionReason || '');
    }
  }, [lecturer]);

  const getStaffId = (id: string) => {
    const num = parseInt(id.replace(/\D/g, ''), 10);
    return `UTM-LEC-${String(num).padStart(3, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      exemptionFlag: exemptionActive,
      exemptionType: exemptionActive ? exemptionType : undefined,
      exemptionStartDate: exemptionActive && startDate ? new Date(startDate) : undefined,
      exemptionExpiryDate: exemptionActive && expiryDate ? new Date(expiryDate) : undefined,
      exemptionReason: exemptionActive ? reason : undefined,
    });
    onClose();
  };

  if (!open || !lecturer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-xl">Manage Administrative Status</h2>
            <p className="text-sm text-gray-500 mt-1">
              Toggle exemption flag to allow this lecturer to bypass the 12-credit minimum rejection check
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4 flex-shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 1. Lecturer (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lecturer</label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="font-bold text-gray-900">{lecturer.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">Staff ID: {getStaffId(lecturer.id)}</p>
            </div>
          </div>

          {/* 2. Status Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Status Type <span className="text-red-500">*</span>
            </label>
            <select
              value={exemptionType}
              onChange={(e) => setExemptionType(e.target.value as typeof exemptionType)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent bg-white text-gray-900"
            >
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Adjunct Status">Adjunct Status</option>
              <option value="Borrowed Staff">Borrowed Staff</option>
            </select>
          </div>

          {/* 3. Start Date + End Date */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-xs text-red-500 mt-1">Both start and end dates are required for all administrative exemptions</p>
          </div>

          {/* 4. Exemption Status toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exemption Status</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setExemptionActive(!exemptionActive)}
                className={`relative inline-flex h-7 items-center rounded-full transition-colors flex-shrink-0 ${
                  exemptionActive ? 'bg-[#900021]' : 'bg-gray-300'
                }`}
                style={{ width: '52px' }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    exemptionActive ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${exemptionActive ? 'text-[#900021]' : 'text-gray-500'}`}>
                {exemptionActive
                  ? 'Active — 12-credit minimum bypassed'
                  : 'Inactive — Standard policies apply'}
              </span>
            </div>
          </div>

          {/* Amber info box */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
            <p className="text-sm text-amber-800">
              When active, this lecturer can freely decline assignments even if their total credits are below 12.
              This prevents false compliance errors for staff on administrative leave.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="px-6 bg-white border border-[#900021] text-[#900021] hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#900021] hover:bg-[#5C001F] text-white"
            >
              Save Status
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
