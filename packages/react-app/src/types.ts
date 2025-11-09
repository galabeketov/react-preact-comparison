export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface PerformanceMetrics {
  framework: "react" | "preact";
  bundleSize: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  timestamp: number;
}

export interface StressTestConfig {
  todoCount: number;
  updateInterval: number;
  duration: number;
}
