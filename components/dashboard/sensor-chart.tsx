'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataPoint {
  time: string;
  value: number;
}

interface SensorChartProps {
  data: ChartDataPoint[];
  title: string;
  color: string;
  unit: string;
}

export function SensorChart({ data, title, color, unit }: SensorChartProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2847" />
          <XAxis
            dataKey="time"
            stroke="#8b96b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#8b96b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111a35',
              border: `1px solid ${color}`,
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e0e6ff' }}
            formatter={(value: any) => `${value.toFixed(2)}${unit}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
