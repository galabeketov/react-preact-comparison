import "./InfoSection.css";

export default function InfoSection() {
  return (
    <div className="info-section">
      <h2>💡 What's the Difference?</h2>

      <div className="info-grid">
        <div className="info-card react-card">
          <div className="card-header">
            <span className="icon">⚛️</span>
            <h3>React</h3>
          </div>
          <div className="card-content">
            <h4>How it works:</h4>
            <ul>
              <li>
                <strong>Virtual DOM</strong> - Creates a copy of the DOM in
                JavaScript
              </li>
              <li>
                <strong>Reconciliation</strong> - Compares virtual DOM trees to
                find changes
              </li>
              <li>
                <strong>Batched Updates</strong> - Groups multiple state changes
                together
              </li>
              <li>
                <strong>Fiber Architecture</strong> - Can pause and resume
                rendering work
              </li>
            </ul>

            <h4>Key Features:</h4>
            <ul>
              <li>✅ Rich ecosystem & tooling</li>
              <li>✅ Large community support</li>
              <li>✅ Backed by Meta (Facebook)</li>
              <li>✅ Best for complex applications</li>
              <li>⚠️ Larger bundle size (~42KB)</li>
            </ul>

            <h4>Best For:</h4>
            <p>
              Large-scale applications, complex state management, rich ecosystem
              requirements, teams needing extensive tooling and community
              support.
            </p>
          </div>
        </div>

        <div className="info-card preact-card">
          <div className="card-header">
            <span className="icon">⚡</span>
            <h3>Preact</h3>
          </div>
          <div className="card-content">
            <h4>How it works:</h4>
            <ul>
              <li>
                <strong>Lightweight Virtual DOM</strong> - Minimal DOM
                abstraction
              </li>
              <li>
                <strong>Faster Diff Algorithm</strong> - Optimized
                reconciliation
              </li>
              <li>
                <strong>Direct DOM Updates</strong> - Less overhead than React
              </li>
              <li>
                <strong>Synchronous Rendering</strong> - Simpler than Fiber
              </li>
            </ul>

            <h4>Key Features:</h4>
            <ul>
              <li>✅ Tiny bundle size (~3KB)</li>
              <li>✅ Faster initial load</li>
              <li>✅ Lower memory usage</li>
              <li>✅ React-compatible API</li>
              <li>⚠️ Smaller ecosystem</li>
            </ul>

            <h4>Best For:</h4>
            <p>
              Mobile-first apps, embedded widgets, performance-critical
              applications, projects where bundle size matters, progressive web
              apps (PWAs).
            </p>
          </div>
        </div>
      </div>

      <div className="key-differences">
        <h3>🔑 Key Technical Differences</h3>
        <div className="differences-grid">
          <div className="difference-item">
            <h4>📦 Bundle Size</h4>
            <p>
              <strong>React:</strong> ~42KB (gzipped)
            </p>
            <p>
              <strong>Preact:</strong> ~3KB (gzipped)
            </p>
            <p className="highlight">
              93% smaller! Perfect for mobile & slow networks
            </p>
          </div>

          <div className="difference-item">
            <h4>⚡ Rendering</h4>
            <p>
              <strong>React:</strong> Fiber architecture with time-slicing
            </p>
            <p>
              <strong>Preact:</strong> Synchronous, simpler algorithm
            </p>
            <p className="highlight">Preact is faster for small updates</p>
          </div>

          <div className="difference-item">
            <h4>🧠 Memory</h4>
            <p>
              <strong>React:</strong> More memory for Fiber tree
            </p>
            <p>
              <strong>Preact:</strong> Minimal memory footprint
            </p>
            <p className="highlight">Preact uses ~40% less memory</p>
          </div>

          <div className="difference-item">
            <h4>🔧 API Compatibility</h4>
            <p>
              <strong>React:</strong> Full feature set
            </p>
            <p>
              <strong>Preact:</strong> Compatible via preact/compat
            </p>
            <p className="highlight">Easy migration between frameworks</p>
          </div>
        </div>
      </div>

      <div className="micro-frontend-info">
        <h3>🏗️ Why Micro-Frontend Architecture?</h3>
        <div className="architecture-explanation">
          <p>
            This dashboard uses <strong>micro-frontend architecture</strong> to
            demonstrate real-world performance differences:
          </p>

          <div className="architecture-points">
            <div className="point">
              <span className="point-icon">🔒</span>
              <div>
                <strong>Isolated Runtime</strong>
                <p>
                  Each app runs in its own iframe, ensuring true isolation and
                  preventing cross-contamination of metrics.
                </p>
              </div>
            </div>

            <div className="point">
              <span className="point-icon">📡</span>
              <div>
                <strong>PostMessage Communication</strong>
                <p>
                  Apps send performance metrics to the dashboard via browser's
                  PostMessage API, enabling real-time comparison.
                </p>
              </div>
            </div>

            <div className="point">
              <span className="point-icon">🚀</span>
              <div>
                <strong>Independent Deployments</strong>
                <p>
                  Each app is deployed separately on Vercel, demonstrating how
                  micro-frontends enable independent scaling and updates.
                </p>
              </div>
            </div>

            <div className="point">
              <span className="point-icon">🎯</span>
              <div>
                <strong>Technology Agnostic</strong>
                <p>
                  React and Preact coexist peacefully, showing how different
                  frameworks can work together in modern web architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="methodology">
        <h3>🧪 Testing Methodology</h3>
        <p>
          Both apps implement <strong>identical Todo functionality</strong> with
          the same business logic:
        </p>
        <ul>
          <li>✅ Add, complete, delete todos</li>
          <li>✅ Filter by status (All/Active/Completed)</li>
          <li>
            ✅ Stress test mode (10-1000 todos with configurable update
            intervals)
          </li>
          <li>✅ Real-time performance measurement every 2 seconds</li>
        </ul>
        <p className="methodology-note">
          <strong>Note:</strong> All measurements are taken during actual usage,
          not synthetic benchmarks. Results may vary based on device, browser,
          and network conditions.
        </p>
      </div>
    </div>
  );
}
