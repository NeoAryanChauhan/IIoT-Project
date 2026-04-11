'use client';

interface StatusBadgeProps {
  label: string;
  value: string;
  icon?: string;
}

export function StatusBadge({ label, value, icon }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
