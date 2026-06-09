import { Shield } from 'lucide-react';
import { LecturerDashboard } from './LecturerDashboard';

export function LecturerOnLeaveDashboard() {
  return (
    <>
      {/* Amber administrative leave banner */}
      <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 mb-6">
        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900">You are currently on Administrative Leave — Maternity Leave</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Your 12-credit minimum workload requirement is waived. You may decline all assignments freely. Exemption expires: Dec 31, 2026
          </p>
        </div>
      </div>

      <LecturerDashboard />
    </>
  );
}
