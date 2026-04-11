'use client';

import { DashboardLayout } from '@/components/dashboard/layout-wrapper';
import { SensorCard } from '@/components/dashboard/sensor-card';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { useSensorData } from '@/context/sensor-context';

export default function SensorsPage() {
  const { sensorData, sensorHistory } = useSensorData();

  // Convert history to chart format
  const chartData = {
    temperature: sensorHistory.map((data, idx) => ({
      time: `${idx}s`,
      value: data.temperature,
    })),
    current: sensorHistory.map((data, idx) => ({
      time: `${idx}s`,
      value: data.current,
    })),
    vibration: sensorHistory.map((data, idx) => ({
      time: `${idx}s`,
      value: data.vibration,
    })),
  };

  const getTrendDirection = (history: typeof sensorHistory, key: 'temperature' | 'current' | 'vibration') => {
    if (history.length < 2) return 'stable';
    const current = history[history.length - 1][key];
    const previous = history[history.length - 2][key];
    const diff = current - previous;
    return Math.abs(diff) < 0.1 ? 'stable' : diff > 0 ? 'up' : 'down';
  };

  const getSensorStatus = (
    value: number,
    type: 'temperature' | 'current' | 'vibration'
  ) => {
    switch (type) {
      case 'temperature':
        if (value > 65) return 'critical';
        if (value > 55) return 'warning';
        return 'healthy';
      case 'current':
        if (value > 3.5) return 'critical';
        if (value > 2.5) return 'warning';
        return 'healthy';
      case 'vibration':
        if (value > 1.5) return 'critical';
        if (value > 1.0) return 'warning';
        return 'healthy';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Sensor Data
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time sensor readings and trends
          </p>
        </div>

        {/* Sensor Cards - All Together */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SensorCard
            label="Temperature"
            value={sensorData.temperature}
            unit="°C"
            trend={getTrendDirection(sensorHistory, 'temperature')}
            status={getSensorStatus(sensorData.temperature, 'temperature')}
          />
          <SensorCard
            label="Current"
            value={sensorData.current}
            unit="A"
            trend={getTrendDirection(sensorHistory, 'current')}
            status={getSensorStatus(sensorData.current, 'current')}
          />
          <SensorCard
            label="Vibration"
            value={sensorData.vibration}
            unit="g"
            trend={getTrendDirection(sensorHistory, 'vibration')}
            status={getSensorStatus(sensorData.vibration, 'vibration')}
          />
        </div>

        {/* Threshold Guidelines */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            Safety Thresholds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Temperature</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Optimal:</span>
                  <span className="text-accent">20-45°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warning:</span>
                  <span className="text-orange-400">45-65°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical:</span>
                  <span className="text-destructive">&gt;65°C</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-3">Current</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Optimal:</span>
                  <span className="text-accent">0.5-2.0A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warning:</span>
                  <span className="text-orange-400">2.0-3.5A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical:</span>
                  <span className="text-destructive">&gt;3.5A</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-3">Vibration</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Optimal:</span>
                  <span className="text-accent">0.0-1.0g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warning:</span>
                  <span className="text-orange-400">1.0-1.5g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical:</span>
                  <span className="text-destructive">&gt;1.5g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Sensor Trends
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SensorChart
              data={chartData.temperature}
              title="Temperature vs Time"
              color="#ff9500"
              unit="°C"
            />
            <SensorChart
              data={chartData.current}
              title="Current vs Time"
              color="#00d9ff"
              unit="A"
            />
            <SensorChart
              data={chartData.vibration}
              title="Vibration vs Time"
              color="#00ff88"
              unit="g"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
