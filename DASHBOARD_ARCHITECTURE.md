# Industrial IoT Dashboard - Multi-Page Architecture

## Overview
The dashboard has been reorganized into a multi-page application with centralized data management using React Context. Each page serves a specific purpose with shared navigation and real-time data synchronization.

## Page Structure

### 1. Dashboard Home (/)
**Purpose:** System Overview and Health Monitoring
- **Main Component:** Health Score Gauge (large, centered)
- **Features:**
  - Displays current health score (0-100) with animated circular gauge
  - Shows operating mode and system status
  - Machine status card with uptime and machine ID
  - Recent alerts preview (last 5)
- **Layout:** Health score takes precedence, supporting info on the side

### 2. Sensor Data (/sensors)
**Purpose:** Real-Time Sensor Readings
- **Sensors Displayed Together:**
  - Temperature (°C)
  - Current (A)
  - Vibration (g)
- **Features:**
  - Three cards in one row showing current readings
  - Trend indicators (↑ up, ↓ down, → stable)
  - Status badges (healthy, warning, critical)
  - Safety threshold guidelines
  - Historical charts for all three sensors
- **Layout:** Sensor cards grouped together, trends below

### 3. Alerts (/alerts)
**Purpose:** Alert Management and History
- **Features:**
  - Active alerts count and display
  - Resolved alerts history
  - Alert statistics (total, active, resolved)
  - Color-coded by severity (critical, warning, info)
  - Alert legend explaining types
- **Layout:** Stats at top, active alerts prominent, history below

### 4. Reports (/reports)
**Purpose:** Performance Analytics and Statistics
- **Features:**
  - Temperature, Current, Vibration analysis (avg, min, max)
  - System health summary
  - Report generation buttons
  - Maintenance schedule recommendations
  - Export options
- **Layout:** Statistics cards, followed by system info and maintenance

### 5. Settings (/settings)
**Purpose:** System Configuration
- **Features:**
  - Machine configuration (ID, location)
  - Alert threshold customization
  - Notification preferences (email, push)
  - Data collection interval settings
  - System information display
- **Layout:** Organized in collapsible sections with save/reset buttons

## Data Architecture

### SensorContext (`context/sensor-context.tsx`)
Centralized state management providing:
- **SensorData:** Current readings (temperature, current, vibration, timestamp)
- **HealthData:** Score, status, operating mode
- **Alerts:** Array of alert objects with types and timestamps
- **SensorHistory:** Last 60 readings for trend analysis

**Simulation:**
- Updates every 2 seconds
- Realistic value variations
- Automatic fault detection and alert generation
- Health score calculation based on thresholds

## Component Hierarchy

```
RootLayout (with SensorProvider)
├── DashboardLayout
│   ├── Header
│   ├── Sidebar (with navigation)
│   └── Page Content (specific per route)
│
├── Shared Components
│   ├── HealthGauge
│   ├── SensorCard (Temperature, Current, Vibration)
│   ├── SensorChart (Recharts)
│   ├── AlertPanel
│   └── MachineStatus
│
├── Pages
│   ├── / (Dashboard)
│   ├── /sensors (Sensor Data)
│   ├── /alerts (Alerts)
│   ├── /reports (Reports)
│   └── /settings (Settings)
```

## Navigation
The sidebar appears on all pages with:
- Dashboard link (/)
- Sensor Data link (/sensors)
- Alerts link (/alerts)
- Reports link (/reports)
- Settings link (/settings)
- System status indicator

## Color Scheme
- **Primary:** Cyan (#00d9ff)
- **Accent:** Neon Green (#00ff88)
- **Warning:** Orange (#ff9500)
- **Critical:** Red (#ff3d3d)
- **Background:** Dark Blue (#0a0e27)
- **Card:** Deep Blue (#111a35)

## Key Benefits
1. **Separation of Concerns:** Each page focuses on specific functionality
2. **Scalability:** Easy to add new pages or features
3. **Real-Time Sync:** All pages use the same data context
4. **Professional UI:** SCADA-like industrial aesthetic
5. **Responsive Design:** Mobile-first approach with proper breakpoints
