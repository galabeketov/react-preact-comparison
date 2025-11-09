import { Todo, PerformanceMetrics } from "./types";

export const generateTodos = (count: number): Todo[] => {
  const texts = [
    "Buy groceries",
    "Finish project",
    "Call client",
    "Review code",
    "Write documentation",
    "Deploy to production",
    "Test new feature",
    "Fix bug in authentication",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `todo-${Date.now()}-${i}`,
    text: `${texts[Math.floor(Math.random() * texts.length)]} ${i + 1}`,
    completed: Math.random() > 0.5,
    createdAt: Date.now() - Math.random() * 1000000,
  }));
};

export const measurePerformance = async (
  framework: "react" | "preact"
): Promise<Partial<PerformanceMetrics>> => {
  const metrics: Partial<PerformanceMetrics> = {
    framework,
    timestamp: Date.now(),
  };

  const startTime = performance.now();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  metrics.renderTime = performance.now() - startTime;

  if ("memory" in performance) {
    const memory = (performance as any).memory;
    metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024;
  }

  metrics.fps = await measureFPS();

  return metrics;
};

const measureFPS = (): Promise<number> => {
  return new Promise((resolve) => {
    let frames = 0;
    const startTime = performance.now();

    const countFrame = () => {
      frames++;
      if (performance.now() - startTime < 1000) {
        requestAnimationFrame(countFrame);
      } else {
        resolve(frames);
      }
    };

    requestAnimationFrame(countFrame);
  });
};

export const sendMetricsToParent = (metrics: PerformanceMetrics) => {
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "PERFORMANCE_METRICS", data: metrics },
      "*"
    );
  }
};
