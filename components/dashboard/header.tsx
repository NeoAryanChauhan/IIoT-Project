'use client';

import { useSensorData } from '@/context/sensor-context';

export function Header() {
  const { healthData } = useSensorData();

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const statusColor = getStatusColor(healthData?.status || 'healthy');
  const statusText = healthData?.status || 'healthy';

  return (
    <div className="bg-gradient-to-r from-sidebar to-card border-b border-border px-8 py-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Predictive Maintenance System
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Machine A</p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: statusColor }}
          />
          <span className="text-sm font-medium text-foreground">
            {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
