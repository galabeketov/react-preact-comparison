import { PerformanceMetrics } from "../types";

interface MetricsComparisonProps {
  reactMetrics: PerformanceMetrics | null;
  preactMetrics: PerformanceMetrics | null;
}

export default function MetricsComparison({
  reactMetrics,
  preactMetrics,
}: MetricsComparisonProps) {
  const calculateDifference = (reactVal: number, preactVal: number) => {
    if (!reactVal || !preactVal) return null;
    const diff = ((reactVal - preactVal) / reactVal) * 100;
    return diff.toFixed(1);
  };

  const MetricCard = ({
    title,
    reactValue,
    preactValue,
    unit,
    lowerIsBetter = true,
  }: {
    title: string;
    reactValue?: number;
    preactValue?: number;
    unit: string;
    lowerIsBetter?: boolean;
  }) => {
    const diff =
      reactValue && preactValue
        ? calculateDifference(reactValue, preactValue)
        : null;

    const winner = diff
      ? lowerIsBetter
        ? Number(diff) > 0
          ? "preact"
          : "react"
        : Number(diff) < 0
        ? "preact"
        : "react"
      : null;

    return (
      <div className="metric-card">
        <h3>{title}</h3>
        <div className="metric-values">
          <div className={`value ${winner === "react" ? "winner" : ""}`}>
            <span className="label">React</span>
            <span className="number">
              {reactValue?.toFixed(2) || "—"}
              {unit}
            </span>
          </div>
          <div className="divider">vs</div>
          <div className={`value ${winner === "preact" ? "winner" : ""}`}>
            <span className="label">Preact</span>
            <span className="number">
              {preactValue?.toFixed(2) || "—"}
              {unit}
            </span>
          </div>
        </div>
        {diff && (
          <div
            className={`difference ${
              Number(diff) > 0 ? "positive" : "negative"
            }`}
          >
            {Number(diff) > 0 ? "⬇" : "⬆"} {Math.abs(Number(diff))}%{" "}
            {Number(diff) > 0 ? "smaller" : "larger"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="metrics-comparison">
      <MetricCard
        title="📦 Bundle Size"
        reactValue={reactMetrics?.bundleSize}
        preactValue={preactMetrics?.bundleSize}
        unit="KB"
      />
      <MetricCard
        title="⚡ Render Time"
        reactValue={reactMetrics?.renderTime}
        preactValue={preactMetrics?.renderTime}
        unit="ms"
      />
      <MetricCard
        title="🧠 Memory Usage"
        reactValue={reactMetrics?.memoryUsage}
        preactValue={preactMetrics?.memoryUsage}
        unit="MB"
      />
      <MetricCard
        title="📊 FPS"
        reactValue={reactMetrics?.fps}
        preactValue={preactMetrics?.fps}
        unit=""
        lowerIsBetter={false}
      />
    </div>
  );
}
