'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard', href: '/' },
  { icon: '📡', label: 'Sensor Data', id: 'sensors', href: '/sensors' },
  { icon: '⚠', label: 'Alerts', id: 'alerts', href: '/alerts' },
  { icon: '📈', label: 'Reports', id: 'reports', href: '/reports' },
  { icon: '⚙', label: 'Settings', id: 'settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col overflow-hidden">
      <div className="px-6 py-8 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
            <span className="text-sidebar-foreground text-lg font-bold">⚙</span>
          </div>
          <span className="font-bold text-sidebar-foreground">IOT Pro</span>
        </div>
        <p className="text-xs text-sidebar-accent-foreground opacity-70">
          Industrial Monitoring
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              isActive(item.href)
                ? 'bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="bg-sidebar-primary/10 rounded-lg p-3 border border-sidebar-primary/20">
          <p className="text-xs font-semibold text-sidebar-primary mb-1">
            System Status
          </p>
          <p className="text-xs text-sidebar-accent-foreground">
            All systems operational
          </p>
        </div>
      </div>
    </div>
  );
}
