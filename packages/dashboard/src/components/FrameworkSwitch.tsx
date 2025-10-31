interface FrameworkSwitchProps {
  active: "react" | "preact";
  onChange: (framework: "react" | "preact") => void;
}

export default function FrameworkSwitch({
  active,
  onChange,
}: FrameworkSwitchProps) {
  return (
    <div className="framework-switch">
      <button
        className={active === "react" ? "active react-btn" : "react-btn"}
        onClick={() => onChange("react")}
      >
        <span className="icon">⚛️</span>
        <span>React</span>
      </button>
      <button
        className={active === "preact" ? "active preact-btn" : "preact-btn"}
        onClick={() => onChange("preact")}
      >
        <span className="icon">⚡</span>
        <span>Preact</span>
      </button>
    </div>
  );
}
