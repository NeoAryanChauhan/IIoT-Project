'use client';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
}

export function SensorCard({
  label,
  value,
  unit,
  trend,
  status,
}: SensorCardProps) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'healthy':
        return '#00ff88';
      case 'warning':
        return '#ff9500';
      case 'critical':
        return '#ff3d3d';
      default:
        return '#00d9ff';
    }
  };

  const getTrendIcon = (t: string) => {
    switch (t) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm"
      style={{
        boxShadow: `inset 0 0 20px ${statusColor}22`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {value.toFixed(1)}{unit}
          </p>
        </div>
        <div
          className="text-xl font-bold"
          style={{ color: statusColor }}
        >
          {getTrendIcon(trend)}
        </div>
      </div>
      <div
        className="h-1 rounded-full"
        style={{ backgroundColor: statusColor, opacity: 0.5 }}
      />
    </div>
  );
}
