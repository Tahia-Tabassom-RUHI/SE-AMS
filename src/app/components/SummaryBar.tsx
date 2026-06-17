import { Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';

interface SummaryBarProps {
  pendingCount: number;
  currentLoad: number;
  nextDeadline: number | null;
  isExemptionActive?: boolean;
}

export function SummaryBar({ pendingCount, currentLoad, nextDeadline, isExemptionActive }: SummaryBarProps) {
  const getTimeRemaining = (deadline: number) => {
    const diff = deadline - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 0) return 'Overdue';
    if (hours < 24) return `${hours}h remaining`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h remaining`;
  };

  const isUrgent = nextDeadline ? (nextDeadline - Date.now()) < (1000 * 60 * 60 * 48) : false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
      {/* Pending Requests */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">Pending Requests</div>
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="text-3xl font-semibold">{pendingCount}</div>
        <div className="text-xs text-gray-500 mt-1">
          {pendingCount === 0 ? 'All caught up!' : 'Awaiting your response'}
        </div>
      </div>

      {/* Current Credits */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">Current Credits</div>
          <TrendingUp className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold">
            {currentLoad.toFixed(1)} <span className="text-lg text-gray-400">/ 15.0</span>
          </span>
          {isExemptionActive && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">Exempt</Badge>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {currentLoad < 10 && 'Below optimal range'}
          {currentLoad >= 10 && currentLoad <= 15 && 'Optimal range'}
          {currentLoad > 15 && 'Over capacity'}
        </div>
      </div>

      {/* Deadline Alert */}
      <div className={`bg-white rounded-lg border p-6 shadow-sm ${
        isUrgent ? 'border-orange-300 bg-orange-50' : 'border-[#c5c5c5]'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">Next Deadline</div>
          <Clock className={`w-5 h-5 ${isUrgent ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>
        <div className={`text-3xl font-semibold ${isUrgent ? 'text-orange-700' : ''}`}>
          {nextDeadline ? getTimeRemaining(nextDeadline) : 'None'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {nextDeadline ? (isUrgent ? 'Urgent response needed' : 'Response deadline') : 'No pending deadlines'}
        </div>
      </div>
    </div>
  );
}
