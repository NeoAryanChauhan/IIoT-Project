'use client';

import { DashboardLayout } from '@/components/dashboard/layout-wrapper';
import { useSensorData } from '@/context/sensor-context';

export default function ReportsPage() {
  const { sensorData, healthData, sensorHistory } = useSensorData();

  // Calculate statistics
  const stats = {
    avgTemp: sensorHistory.length
      ? (sensorHistory.reduce((sum, d) => sum + d.temperature, 0) / sensorHistory.length).toFixed(1)
      : sensorData.temperature.toFixed(1),
    maxTemp: sensorHistory.length
      ? Math.max(...sensorHistory.map((d) => d.temperature)).toFixed(1)
      : sensorData.temperature.toFixed(1),
    minTemp: sensorHistory.length
      ? Math.min(...sensorHistory.map((d) => d.temperature)).toFixed(1)
      : sensorData.temperature.toFixed(1),

    avgCurrent: sensorHistory.length
      ? (sensorHistory.reduce((sum, d) => sum + d.current, 0) / sensorHistory.length).toFixed(2)
      : sensorData.current.toFixed(2),
    maxCurrent: sensorHistory.length
      ? Math.max(...sensorHistory.map((d) => d.current)).toFixed(2)
      : sensorData.current.toFixed(2),
    minCurrent: sensorHistory.length
      ? Math.min(...sensorHistory.map((d) => d.current)).toFixed(2)
      : sensorData.current.toFixed(2),

    avgVibration: sensorHistory.length
      ? (sensorHistory.reduce((sum, d) => sum + d.vibration, 0) / sensorHistory.length).toFixed(2)
      : sensorData.vibration.toFixed(2),
    maxVibration: sensorHistory.length
      ? Math.max(...sensorHistory.map((d) => d.vibration)).toFixed(2)
      : sensorData.vibration.toFixed(2),
    minVibration: sensorHistory.length
      ? Math.min(...sensorHistory.map((d) => d.vibration)).toFixed(2)
      : sensorData.vibration.toFixed(2),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            System Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Analytics and performance statistics
          </p>
        </div>

        {/* Report Generation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:bg-primary/90 transition-colors">
            📥 Export Daily Report
          </button>
          <button className="bg-secondary text-secondary-foreground rounded-lg px-6 py-3 font-medium hover:bg-secondary/80 transition-colors border border-border">
            📊 Generate Custom Report
          </button>
        </div>

        {/* Temperature Statistics */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">
            Temperature Analysis
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Average
              </p>
              <p className="text-2xl font-bold text-foreground">{stats.avgTemp}°C</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Maximum
              </p>
              <p className="text-2xl font-bold text-orange-400">{stats.maxTemp}°C</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Minimum
              </p>
              <p className="text-2xl font-bold text-accent">{stats.minTemp}°C</p>
            </div>
          </div>
        </div>

        {/* Current Statistics */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">
            Current Analysis
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Average
              </p>
              <p className="text-2xl font-bold text-foreground">{stats.avgCurrent}A</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Maximum
              </p>
              <p className="text-2xl font-bold text-orange-400">{stats.maxCurrent}A</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Minimum
              </p>
              <p className="text-2xl font-bold text-accent">{stats.minCurrent}A</p>
            </div>
          </div>
        </div>

        {/* Vibration Statistics */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">
            Vibration Analysis
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Average
              </p>
              <p className="text-2xl font-bold text-foreground">{stats.avgVibration}g</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Maximum
              </p>
              <p className="text-2xl font-bold text-orange-400">{stats.maxVibration}g</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Minimum
              </p>
              <p className="text-2xl font-bold text-accent">{stats.minVibration}g</p>
            </div>
          </div>
        </div>

        {/* System Health Summary */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">
            System Health Summary
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Health Score</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {healthData.score}
                </span>
                <span className="text-lg text-muted-foreground mb-1">/100</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">System Status</p>
              <span
                className={`inline-block px-4 py-2 rounded-full font-semibold capitalize text-sm ${
                  healthData.status === 'healthy'
                    ? 'bg-accent/20 text-accent'
                    : healthData.status === 'warning'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-destructive/20 text-destructive'
                }`}
              >
                {healthData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">
            Recommended Maintenance
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <span className="text-lg">🔧</span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Bearing Inspection
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Due in 45 days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <span className="text-lg">🧹</span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Filter Replacement
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Due in 60 days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <span className="text-lg">🛢️</span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  Oil Change
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Due in 90 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
