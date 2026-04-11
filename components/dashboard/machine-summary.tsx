'use client';

interface MachineSummaryProps {
  mode: string;
  lastUpdated: string;
  systemStatus: 'operational' | 'warning' | 'maintenance';
}

export function MachineSummary({
  mode,
  lastUpdated,
  systemStatus,
}: MachineSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return '#00ff88';
      case 'warning':
        return '#ff9500';
      case 'maintenance':
        return '#ff3d3d';
      default:
        return '#00d9ff';
    }
  };

  const statusColor = getStatusColor(systemStatus);

  return (
    <div className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
        Machine Status Summary
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Current Mode</p>
          <p className="text-lg font-semibold text-foreground">{mode}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Last Updated</p>
          <p className="text-sm text-foreground">{lastUpdated}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: statusColor }}
            >
              {systemStatus.charAt(0).toUpperCase() +
                systemStatus.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
