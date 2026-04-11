'use client';

import { DashboardLayout } from '@/components/dashboard/layout-wrapper';
import { HealthGauge } from '@/components/dashboard/health-gauge';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { MachineStatus } from '@/components/dashboard/machine-status';
import { useSensorData } from '@/context/sensor-context';

export default function DashboardPage() {
  const { healthData, alerts } = useSensorData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            System Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time system health and status monitoring
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Score - Large */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-8 h-full">
              <h2 className="text-lg font-semibold text-card-foreground mb-8">
                System Health Score
              </h2>
              <div className="flex items-center justify-center py-8">
                <HealthGauge score={healthData.score} status={healthData.status} />
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Operating Mode:</span>
                  <span className="text-sm font-semibold text-foreground">
                    {healthData.mode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span
                    className={`text-sm font-semibold capitalize px-3 py-1 rounded-full ${
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
          </div>

          {/* Machine Status */}
          <div>
            <MachineStatus />
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h2>
          <AlertPanel alerts={alerts.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  );
}
