'use client';

interface HealthGaugeProps {
  score: number;
}

export function HealthGauge({ score }: HealthGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 80) return '#00ff88';
    if (s >= 50) return '#ff9500';
    return '#ff3d3d';
  };

  const getStatus = (s: number) => {
    if (s >= 80) return 'Healthy';
    if (s >= 50) return 'Warning';
    return 'Critical';
  };

  const color = getColor(score);
  const status = getStatus(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#1a2847"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Center text */}
          <text
            x="60"
            y="65"
            textAnchor="middle"
            className="fill-[#e0e6ff] font-bold text-2xl"
            style={{ fontSize: '28px' }}
          >
            {Math.round(score)}
          </text>
        </svg>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Health Score</p>
        <p
          className="text-2xl font-bold"
          style={{ color }}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
