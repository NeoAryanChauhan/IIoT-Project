'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface SensorData {
  temperature: number;
  current: number;
  vibration: number;
  timestamp: Date;
}

export interface HealthData {
  score: number;
  status: 'healthy' | 'warning' | 'critical';
  mode: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

interface SensorContextType {
  sensorData: SensorData;
  healthData: HealthData;
  alerts: Alert[];
  sensorHistory: SensorData[];
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export function SensorProvider({ children }: { children: React.ReactNode }) {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 35,
    current: 1.5,
    vibration: 0.3,
    timestamp: new Date(),
  });

  const [healthData, setHealthData] = useState<HealthData>({
    score: 95,
    status: 'healthy',
    mode: 'Normal Operation',
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'info',
      message: 'System initialized successfully',
      timestamp: new Date(Date.now() - 3600000),
      resolved: true,
    },
  ]);

  const [sensorHistory, setSensorHistory] = useState<SensorData[]>([]);

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => {
        const newTemp = Math.max(20, Math.min(75, prev.temperature + (Math.random() - 0.5) * 2));
        const newCurrent = Math.max(0.5, Math.min(4, prev.current + (Math.random() - 0.5) * 0.3));
        const newVibration = Math.max(0.1, Math.min(2, prev.vibration + (Math.random() - 0.5) * 0.2));

        const newData = {
          temperature: parseFloat(newTemp.toFixed(1)),
          current: parseFloat(newCurrent.toFixed(2)),
          vibration: parseFloat(newVibration.toFixed(2)),
          timestamp: new Date(),
        };

        // Update history
        setSensorHistory((hist) => [...hist.slice(-59), newData]);

        // Calculate health score and detect faults
        let score = 100;
        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        let mode = 'Normal Operation';
        let newAlert: Alert | null = null;

        // Temperature penalties
        if (newTemp > 60) {
          score -= 20;
          status = 'warning';
          if (newTemp > 70) {
            score -= 15;
            status = 'critical';
            mode = 'Overheat';
            newAlert = {
              id: Date.now().toString(),
              type: 'critical',
              message: 'High temperature detected',
              timestamp: new Date(),
              resolved: false,
            };
          }
        }

        // Current penalties
        if (newCurrent > 2.5) {
          score -= 15;
          status = 'warning';
          if (newCurrent > 3.5) {
            score -= 20;
            status = 'critical';
            mode = 'Overload';
            newAlert = {
              id: Date.now().toString(),
              type: 'critical',
              message: 'Current overload detected',
              timestamp: new Date(),
              resolved: false,
            };
          }
        }

        // Vibration penalties
        if (newVibration > 1.0) {
          score -= 15;
          status = 'warning';
          if (newVibration > 1.5) {
            score -= 20;
            status = 'critical';
            mode = 'Imbalance';
            newAlert = {
              id: Date.now().toString(),
              type: 'critical',
              message: 'High vibration detected',
              timestamp: new Date(),
              resolved: false,
            };
          }
        }

        setHealthData({
          score: Math.max(0, Math.min(100, score)),
          status,
          mode,
        });

        if (newAlert) {
          setAlerts((prev) => [newAlert, ...prev].slice(0, 50));
        }

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SensorContext.Provider value={{ sensorData, healthData, alerts, sensorHistory }}>
      {children}
    </SensorContext.Provider>
  );
}

export function useSensorData() {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensorData must be used within SensorProvider');
  }
  return context;
}
