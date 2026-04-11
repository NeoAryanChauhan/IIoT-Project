'use client';

import { Alert } from '@/context/sensor-context';

interface AlertPanelProps {
  alerts: Alert[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return '#ff3d3d';
      case 'warning':
        return '#ff9500';
      case 'info':
      default:
        return '#00d9ff';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
        System Alerts
      </h3>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alerts</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded border"
              style={{
                borderColor: getAlertColor(alert.type),
                backgroundColor: getAlertColor(alert.type) + '11',
              }}
            >
              <span className="text-lg flex-shrink-0">
                {getAlertIcon(alert.type)}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium"
                  style={{ color: getAlertColor(alert.type) }}
                >
                  {alert.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
