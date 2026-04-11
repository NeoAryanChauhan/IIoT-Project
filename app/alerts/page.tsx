'use client';

import { DashboardLayout } from '@/components/dashboard/layout-wrapper';
import { useSensorData } from '@/context/sensor-context';

export default function AlertsPage() {
  const { alerts } = useSensorData();

  const getAlertColor = (type: 'info' | 'warning' | 'critical') => {
    switch (type) {
      case 'critical':
        return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'info':
        return 'bg-accent/10 border-accent/30 text-accent';
    }
  };

  const getAlertIcon = (type: 'info' | 'warning' | 'critical') => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
    }
  };

  const resolvedAlerts = alerts.filter((a) => a.resolved);
  const activeAlerts = alerts.filter((a) => !a.resolved);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            System Alerts
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor all system alerts and notifications
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Active Alerts</p>
            <p className="text-3xl font-bold text-foreground">{activeAlerts.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Resolved Alerts</p>
            <p className="text-3xl font-bold text-accent">{resolvedAlerts.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Alerts</p>
            <p className="text-3xl font-bold text-foreground">{alerts.length}</p>
          </div>
        </div>

        {/* Active Alerts */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Alerts</h2>
          {activeAlerts.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">No active alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border p-4 flex items-start gap-4 ${getAlertColor(
                    alert.type
                  )}`}
                >
                  <span className="text-2xl mt-0.5">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alert History */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Alert History</h2>
          {resolvedAlerts.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">No resolved alerts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {resolvedAlerts.slice(0, 10).map((alert) => (
                <div
                  key={alert.id}
                  className="bg-card rounded-lg border border-border p-4 flex items-start gap-4 opacity-60"
                >
                  <span className="text-lg mt-0.5">✓</span>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alert Legend */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Alert Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-medium text-destructive text-sm">Critical Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Immediate action required
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-medium text-orange-400 text-sm">Warning Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Monitor the situation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="font-medium text-accent text-sm">Info Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  General information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
