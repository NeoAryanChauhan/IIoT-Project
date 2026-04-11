'use client';

import { SensorProvider } from '@/context/sensor-context';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SensorProvider>
      {children}
    </SensorProvider>
  );
}
