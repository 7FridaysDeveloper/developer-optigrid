/**
 * Collection of energy and analytics related icon components
 * Used throughout the application for consistent visual representation
 */

export function BatteryIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="8" y="6" width="16" height="20" rx="2" ry="2" />
      <path d="M14 10l4 6h-4l4 6" />
    </svg>
  );
}

export function WindTurbineIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M16 2v28M16 16l6-4m-6 4l-6-4m6 4v6" />
    </svg>
  );
}

export function PlantIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 20h8v-6H12v6zm0 0v4m8-4v4M8 24h16" />
    </svg>
  );
}

export function ScreenIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="4" y="6" width="24" height="16" rx="2" ry="2" />
      <path d="M12 20v4h8v-4" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 18l4-4 4 4 6-6 4 4" />
    </svg>
  );
}

export function DashboardIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="4" y="6" width="24" height="16" rx="2" ry="2" />
      <path d="M12 12h2v6h-2zM18 10h2v8h-2z" />
    </svg>
  );
}
