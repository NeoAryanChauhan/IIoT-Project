'use client';

import { useSensorData } from '@/context/sensor-context';

export function MachineStatus() {
  const { sensorData } = useSensorData();

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-card-foreground mb-6">
          Machine Status
        </h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Last Updated
            </p>
            <p className="text-sm font-mono text-foreground">
              {sensorData.timestamp.toLocaleTimeString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Machine ID
            </p>
            <p className="text-sm font-semibold text-primary">MOTOR-001</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Uptime
            </p>
            <p className="text-sm text-foreground">24 days, 6 hours</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-accent font-semibold">OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
