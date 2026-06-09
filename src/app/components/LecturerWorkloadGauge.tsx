import { TrendingUp } from 'lucide-react';

interface LecturerWorkloadGaugeProps {
  currentLoad: number;
  pendingCredits: number;
  projectedTotal: number;
  hoveredCredits?: number;
  isExemptionActive?: boolean;
}

export function LecturerWorkloadGauge({
  currentLoad,
  pendingCredits,
  projectedTotal,
  hoveredCredits = 0,
  isExemptionActive = false,
}: LecturerWorkloadGaugeProps) {
  // Zone-aware bar color: orange under 12, green 12-15, red over 15
  const getLoadColor = (load: number) => {
    if (load < 12) return '#F59E0B';
    if (load > 15) return '#EF4444';
    return '#10B981';
  };

  const barColor = getLoadColor(currentLoad);
  const projectedColor = getLoadColor(projectedTotal);

  const getPendingBg = () => {
    if (projectedTotal > 15) return '#FEE2E2';
    if (projectedTotal >= 12) return '#D1FAE5';
    return '#FEF3C7';
  };

  const previewTotal = hoveredCredits > 0 ? currentLoad + hoveredCredits : projectedTotal;
  const previewColor = getLoadColor(previewTotal);
  const shouldPulse = hoveredCredits > 0;

  return (
    <div className={`bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm mb-6 transition-all duration-300 ${
      shouldPulse ? `ring-2 ring-opacity-50` : ''
    }`} style={shouldPulse ? { outline: `2px solid ${barColor}40` } : {}}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" style={{ color: barColor }} />
          <h2 className="text-lg font-semibold">My Semester Workload</h2>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-lg" style={{ color: barColor }}>
            {currentLoad.toFixed(1)}
          </span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="font-medium">15.0 Credits</span>
          {isExemptionActive && currentLoad < 12 && (
            <span className="ml-2 text-amber-600 text-xs font-medium">
              Exemption active — 12-credit minimum floor waived
            </span>
          )}
          {hoveredCredits > 0 && (
            <span className="ml-2 font-medium" style={{ color: previewColor }}>
              → {previewTotal.toFixed(1)} (Preview)
            </span>
          )}
          {projectedTotal > 15 && !hoveredCredits && (
            <span className="ml-2 text-[#EF4444] font-medium">EXCEEDS LIMIT</span>
          )}
        </div>
      </div>

      {/* Visual Gauge */}
      <div className="space-y-3">
        <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
          {/* Accepted Credits bar — zone-coloured */}
          <div
            className="absolute top-0 left-0 h-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{
              width: `${Math.min((currentLoad / 20) * 100, 100)}%`,
              backgroundColor: barColor,
            }}
          >
            {currentLoad > 0 && (
              <span className="text-xs font-medium text-white">{currentLoad.toFixed(1)}</span>
            )}
          </div>

          {/* Pending / hover preview section */}
          {(pendingCredits > 0 || hoveredCredits > 0) && (
            <div
              className={`absolute top-0 h-full transition-all duration-300 flex items-center justify-end pr-2 ${shouldPulse ? 'animate-pulse' : ''}`}
              style={{
                left: `${Math.min((currentLoad / 20) * 100, 100)}%`,
                width: `${Math.min(((hoveredCredits || pendingCredits) / 20) * 100, 100)}%`,
                backgroundColor: hoveredCredits > 0 ? previewColor : getPendingBg(),
                opacity: hoveredCredits > 0 ? 0.5 : 1,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,.35) 8px, rgba(255,255,255,.35) 16px)',
              }}
            >
              {(hoveredCredits > 1 || pendingCredits > 1) && (
                <span className="text-xs font-medium" style={{ color: projectedTotal > 15 ? '#fff' : '#333' }}>
                  +{(hoveredCredits || pendingCredits).toFixed(1)}
                </span>
              )}
            </div>
          )}

          {/* 15-credit limit marker */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: '75%' }}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-red-600 font-semibold whitespace-nowrap">
              15
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>20 credits</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: barColor }}></div>
            <span>Accepted ({currentLoad.toFixed(1)} CR)</span>
          </div>
          {pendingCredits > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{
                backgroundColor: getPendingBg(),
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,.5) 2px, rgba(255,255,255,.5) 4px)'
              }}></div>
              <span>Pending ({pendingCredits.toFixed(1)} CR)</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <span>Under 12</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <span>12–15 Optimal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
            <span>Over 15</span>
          </div>
        </div>
      </div>

      {projectedTotal > 15 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          <strong>Warning:</strong> Accepting all pending requests would exceed the 15-credit policy limit.
          You must decline some assignments.
        </div>
      )}
    </div>
  );
}
