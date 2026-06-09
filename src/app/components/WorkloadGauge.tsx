interface WorkloadGaugeProps {
  currentLoad: number;
  minThreshold?: number;
  maxThreshold?: number;
}

export function WorkloadGauge({
  currentLoad,
  minThreshold = 12,
  maxThreshold = 15
}: WorkloadGaugeProps) {
  const maxScale = 20;
  const percentage = Math.min((currentLoad / maxScale) * 100, 100);

  const getStatus = () => {
    if (currentLoad < minThreshold) return 'warning';
    if (currentLoad > maxThreshold) return 'danger';
    return 'success';
  };

  const status = getStatus();

  const colors = {
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
  };

  const color = colors[status];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Teaching Workload Monitor</h3>

      <div className="relative w-full max-w-xs mx-auto mb-4">
        <svg viewBox="0 0 200 120" className="w-full">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#c5c5c5"
            strokeWidth="20"
            strokeLinecap="round"
          />

          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={color}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.51} 251`}
            className="transition-all duration-500"
          />

          <line
            x1="100"
            y1="20"
            x2="100"
            y2="10"
            stroke="#6B7280"
            strokeWidth="2"
            transform="rotate(-54 100 100)"
          />

          <line
            x1="100"
            y1="20"
            x2="100"
            y2="10"
            stroke="#6B7280"
            strokeWidth="2"
            transform="rotate(-27 100 100)"
          />

          <text
            x="100"
            y="85"
            textAnchor="middle"
            className="text-4xl font-bold"
            fill={color}
          >
            {currentLoad.toFixed(1)}
          </text>
          <text
            x="100"
            y="105"
            textAnchor="middle"
            className="text-sm"
            fill="#6B7280"
          >
            credits
          </text>
        </svg>
      </div>

      <div className="flex justify-between text-xs text-gray-600 px-4 mb-4">
        <span>0</span>
        <span className="font-semibold">12 min</span>
        <span className="font-semibold">15 max</span>
        <span>20+</span>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${Math.min((currentLoad / maxScale) * 100, 100)}%`,
              backgroundColor: color,
            }}
          />

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-600"
            style={{ left: '60%' }}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-600"
            style={{ left: '75%' }}
          />
        </div>

        <div className="text-center">
          {status === 'warning' && (
            <p className="text-sm text-[#F59E0B] font-medium">
              ⚠ Below minimum threshold ({minThreshold} credits required)
            </p>
          )}
          {status === 'danger' && (
            <p className="text-sm text-[#EF4444] font-medium">
              ⚠ Exceeds maximum threshold ({maxThreshold} credit limit)
            </p>
          )}
          {status === 'success' && (
            <p className="text-sm text-[#10B981] font-medium">
              ✓ Optimal workload range ({minThreshold}-{maxThreshold} credits)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
