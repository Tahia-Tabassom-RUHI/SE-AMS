import { AlertCircle, TrendingUp, Shield } from 'lucide-react';
import { Progress } from './ui/progress';
import type { Staff, Course } from '../types';

interface WorkloadMonitorProps {
  selectedLecturer: Staff | null;
  selectedCourse: Course | null;
  projectedLoad: number;
}

export function WorkloadMonitor({
  selectedLecturer,
  selectedCourse,
  projectedLoad
}: WorkloadMonitorProps) {
  const getLoadStatus = () => {
    if (projectedLoad > 15) {
      return {
        label: 'EXCEEDS LIMIT',
        color: 'text-[#EF4444]',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'This assignment violates the 15-credit policy (FR-03)',
      };
    }
    if (projectedLoad >= 10 && projectedLoad <= 15) {
      return {
        label: 'Within Limit',
        color: 'text-[#059669]',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Target range - optimal workload distribution',
      };
    }
    return {
      label: 'Under-utilized',
      color: 'text-[#F59E0B]',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Staff member has capacity for additional courses',
    };
  };

  const status = getLoadStatus();
  const progressPercentage = Math.min((projectedLoad / 20) * 100, 100);

  // Calculate segment colors for the progress bar
  const getProgressColor = () => {
    if (projectedLoad > 15) return 'bg-[#EF4444]';
    if (projectedLoad >= 10) return 'bg-[#10B981]';
    return 'bg-[#F59E0B]';
  };

  return (
    <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm sticky top-8">
      <h2 className="text-xl mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Live Analytics
      </h2>

      {!selectedLecturer ? (
        <div className="text-center py-12 text-gray-400">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Select a lecturer to view workload analysis</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Lecturer Info */}
          <div>
            <div className="text-sm text-gray-500 mb-1">Assigned Lecturer</div>
            <div className="font-semibold text-lg">{selectedLecturer.name}</div>
            {selectedLecturer.exemptionFlag && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-medium text-blue-900">{selectedLecturer.exemptionType}</div>
                  <div className="text-blue-700">Exempt from 12-credit minimum (FR-04)</div>
                </div>
              </div>
            )}
          </div>

          {/* Load Balancer */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500">Workload Distribution</div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Credits</span>
                <span className="font-medium">{selectedLecturer.currentLoad} credits</span>
              </div>

              {selectedCourse && (
                <div className="flex justify-between text-sm">
                  <span>New Assignment</span>
                  <span className="font-medium text-blue-600">+{selectedCourse.credits} credits</span>
                </div>
              )}

              <div className="flex justify-between font-semibold">
                <span>Projected Total</span>
                <span className={status.color}>{projectedLoad} / 15</span>
              </div>
            </div>

            {/* Visual Gauge */}
            <div className="space-y-2">
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                {/* Current load (grey bar) */}
                <div
                  className="absolute top-0 left-0 h-full bg-gray-300 transition-all duration-300"
                  style={{ width: `${Math.min((selectedLecturer.currentLoad / 20) * 100, 100)}%` }}
                />

                {/* Projected addition (striped pattern) */}
                {selectedCourse && (
                  <div
                    className={`absolute top-0 h-full transition-all duration-300 ${getProgressColor()} opacity-60`}
                    style={{
                      left: `${Math.min((selectedLecturer.currentLoad / 20) * 100, 100)}%`,
                      width: `${Math.min((selectedCourse.credits / 20) * 100, 100)}%`,
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)'
                    }}
                  />
                )}

                {/* 15-credit marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                  style={{ left: '75%' }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-red-600 font-medium whitespace-nowrap">
                    15
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>20 credits</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`p-4 rounded-lg border ${status.bgColor} ${status.borderColor}`}>
            <div className={`font-semibold mb-1 ${status.color}`}>
              {projectedLoad > 15 && <AlertCircle className="inline w-4 h-4 mr-1" />}
              Total: {projectedLoad} Credits - {status.label}
            </div>
            <div className="text-xs text-gray-600">
              {status.description}
            </div>
          </div>

          {/* Policy Reminder */}
          <div className="pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <strong>FR-03 Policy:</strong> Maximum teaching load is 15 credits per semester.
              Assignments exceeding this limit cannot be saved.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
