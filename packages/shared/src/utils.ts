import { Todo, PerformanceMetrics } from "./types";

export const generateTodos = (count: number): Todo[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `todo-${Date.now()}-${i}`,
    text: `Task ${i + 1} - ${generateRandomText()}`,
    completed: Math.random() > 0.5,
    createdAt: Date.now() - Math.random() * 1000000,
  }));
};

const generateRandomText = (): string => {
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
  return texts[Math.floor(Math.random() * texts.length)];
};

export const measurePerformance = async (
  framework: "react" | "preact"
): Promise<Partial<PerformanceMetrics>> => {
  const metrics: Partial<PerformanceMetrics> = {
    framework,
    timestamp: Date.now(),
  };

  // Render time
  const startTime = performance.now();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  metrics.renderTime = performance.now() - startTime;

  // Memory usage (if available)
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
  }

  // FPS measurement
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

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const sendMetricsToParent = (metrics: PerformanceMetrics) => {
  console.log(`📤 [${metrics.framework}] Sending metrics to parent:`, metrics);

  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "PERFORMANCE_METRICS", data: metrics },
      "*" // CORS uchun wildcard
    );
    console.log(`✅ [${metrics.framework}] Message sent!`);
  } else {
    console.warn(`⚠️ [${metrics.framework}] No parent window found`);
  }
};
