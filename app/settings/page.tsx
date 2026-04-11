'use client';

import { DashboardLayout } from '@/components/dashboard/layout-wrapper';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    machineId: 'MOTOR-001',
    location: 'Production Floor - Line A',
    tempAlert: '65',
    currentAlert: '3.5',
    vibrationAlert: '1.5',
    notificationsEmail: true,
    notificationsPush: true,
    updateInterval: '2000',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure system parameters and preferences
          </p>
        </div>

        {/* Machine Settings */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Machine Configuration
          </h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Machine ID
            </label>
            <input
              type="text"
              value={settings.machineId}
              onChange={(e) => handleChange('machineId', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Unique identifier for this machine
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Physical location of the machine
            </p>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Alert Thresholds
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                value={settings.tempAlert}
                onChange={(e) => handleChange('tempAlert', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Critical threshold
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current (A)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.currentAlert}
                onChange={(e) => handleChange('currentAlert', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Critical threshold
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vibration (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.vibrationAlert}
                onChange={(e) => handleChange('vibrationAlert', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Critical threshold
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Receive alerts via email
                </p>
              </div>
              <button
                onClick={() => handleChange('notificationsEmail', !settings.notificationsEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notificationsEmail ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notificationsEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Receive browser alerts
                </p>
              </div>
              <button
                onClick={() => handleChange('notificationsPush', !settings.notificationsPush)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notificationsPush ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notificationsPush ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Data Collection
          </h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Update Interval (ms)
            </label>
            <input
              type="number"
              step="500"
              min="500"
              value={settings.updateInterval}
              onChange={(e) => handleChange('updateInterval', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Frequency of sensor data updates
            </p>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-secondary/30 rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            System Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">System Version</span>
              <span className="text-sm font-medium text-foreground">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-sm font-medium text-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">API Status</span>
              <span className="text-sm font-medium text-accent">Connected</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            💾 Save Settings
          </button>
          <button className="px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors border border-border">
            ↺ Reset to Defaults
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
