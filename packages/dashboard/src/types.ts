export interface PerformanceMetrics {
  framework: "react" | "preact";
  bundleSize: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  timestamp: number;
}
