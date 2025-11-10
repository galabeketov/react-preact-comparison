import { useState, useEffect } from "react";
import { PerformanceMetrics } from "./types";
import MetricsComparison from "./components/MetricsComparison";
import LiveChart from "./components/LiveChart";
import FrameworkSwitch from "./components/FrameworkSwitch";
import "./App.css";

function App() {
  const [activeFramework, setActiveFramework] = useState<"react" | "preact">(
    "react"
  );
  const [reactMetrics, setReactMetrics] = useState<PerformanceMetrics[]>([]);
  const [preactMetrics, setPreactMetrics] = useState<PerformanceMetrics[]>([]);
  const [currentReactMetrics, setCurrentReactMetrics] =
    useState<PerformanceMetrics | null>(null);
  const [currentPreactMetrics, setCurrentPreactMetrics] =
    useState<PerformanceMetrics | null>(null);

  // Listen to messages from iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("📥 Dashboard received message:", event.data);

      if (event.data.type === "PERFORMANCE_METRICS") {
        const metrics: PerformanceMetrics = event.data.data;
        console.log(
          `📊 Processing metrics from ${metrics.framework}:`,
          metrics
        );

        if (metrics.framework === "react") {
          setCurrentReactMetrics(metrics);
          setReactMetrics((prev) => [...prev.slice(-50), metrics]);
          console.log("✅ React metrics updated");
        } else if (metrics.framework === "preact") {
          setCurrentPreactMetrics(metrics);
          setPreactMetrics((prev) => [...prev.slice(-50), metrics]);
          console.log("✅ Preact metrics updated");
        }
      }
    };

    console.log("👂 Dashboard: Listening for messages...");
    window.addEventListener("message", handleMessage);

    return () => {
      console.log("🛑 Dashboard: Stopped listening");
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const iframeUrl =
    activeFramework === "react"
      ? "http://localhost:3001"
      : "http://localhost:3002";

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>⚡ React vs Preact Performance Dashboard</h1>
        <p>
          Real-time comparison of bundle size, render performance, and memory
          usage
        </p>
      </header>

      <FrameworkSwitch active={activeFramework} onChange={setActiveFramework} />

      <MetricsComparison
        reactMetrics={currentReactMetrics}
        preactMetrics={currentPreactMetrics}
      />

      <div className="charts-section">
        <LiveChart reactData={reactMetrics} preactData={preactMetrics} />
      </div>

      <div className="iframe-container">
        <div className="iframe-header">
          <h3>
            {activeFramework === "react" ? "⚛️ React" : "⚡ Preact"} Todo App
          </h3>
        </div>
        <iframe
          key={activeFramework}
          src={iframeUrl}
          title={`${activeFramework} app`}
          className="app-iframe"
        />
      </div>
    </div>
  );
}

export default App;
