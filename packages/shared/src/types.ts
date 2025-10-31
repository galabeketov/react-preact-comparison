export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface PerformanceMetrics {
  framework: "react" | "preact";
  bundleSize: number; // KB
  renderTime: number; // ms
  memoryUsage: number; // MB
  fps: number;
  timestamp: number;
}

export interface StressTestConfig {
  todoCount: number;
  updateInterval: number; // ms
  duration: number; // seconds
}
