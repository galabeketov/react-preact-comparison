import { PerformanceMetrics } from "@comparison/shared";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LiveChartProps {
  reactData: PerformanceMetrics[];
  preactData: PerformanceMetrics[];
}

export default function LiveChart({ reactData, preactData }: LiveChartProps) {
  // Combine data for chart
  const chartData = reactData.map((r, i) => ({
    index: i,
    reactRender: r.renderTime,
    preactRender: preactData[i]?.renderTime || 0,
    reactMemory: r.memoryUsage,
    preactMemory: preactData[i]?.memoryUsage || 0,
    reactFPS: r.fps,
    preactFPS: preactData[i]?.fps || 0,
  }));

  console.log("chartData", preactData);

  return (
    <div className="live-charts">
      <div className="chart-container">
        <h3>⚡ Render Time Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reactRender"
              stroke="#61dafb"
              name="React (ms)"
            />
            <Line
              type="monotone"
              dataKey="preactRender"
              stroke="#673ab8"
              name="Preact (ms)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>🧠 Memory Usage Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reactMemory"
              stroke="#61dafb"
              name="React (MB)"
            />
            <Line
              type="monotone"
              dataKey="preactMemory"
              stroke="#673ab8"
              name="Preact (MB)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>📊 FPS Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reactFPS"
              stroke="#61dafb"
              name="React FPS"
            />
            <Line
              type="monotone"
              dataKey="preactFPS"
              stroke="#673ab8"
              name="Preact FPS"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
