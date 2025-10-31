import { useState, useEffect, useCallback } from "react";
import {
  Todo,
  PerformanceMetrics,
  generateTodos,
  measurePerformance,
  sendMetricsToParent,
} from "@comparison/shared";
import TodoList from "./components/TodoList";
import StressTest from "./components/StressTest";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isStressTest, setIsStressTest] = useState(false);
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  // Initial load va metrics
  useEffect(() => {
    const initialTodos = generateTodos(5);
    setTodos(initialTodos);

    // Load bundle size (approximate)
    const bundleSize = 42; // React taxminan 42KB

    // Measure performance
    measurePerformance("react").then((perfMetrics) => {
      const fullMetrics: PerformanceMetrics = {
        ...perfMetrics,
        bundleSize,
        framework: "react",
      } as PerformanceMetrics;

      setMetrics(fullMetrics);
      sendMetricsToParent(fullMetrics);
    });

    // Periodic metrics update
    const interval = setInterval(() => {
      measurePerformance("react").then((perfMetrics) => {
        const fullMetrics: PerformanceMetrics = {
          ...perfMetrics,
          bundleSize,
          framework: "react",
        } as PerformanceMetrics;

        setMetrics(fullMetrics);
        sendMetricsToParent(fullMetrics);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addTodo = useCallback(() => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: `todo-${Date.now()}`,
        text: newTodoText,
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [newTodo, ...prev]);
      setNewTodoText("");
    }
  }, [newTodoText]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ React Todo</h1>
        <div className="metrics-mini">
          <span>Bundle: {metrics.bundleSize}KB</span>
          <span>Render: {metrics.renderTime?.toFixed(2)}ms</span>
          <span>FPS: {metrics.fps}</span>
        </div>
      </header>

      <div className="container">
        <div className="input-section">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active ({activeCount})
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed ({todos.length - activeCount})
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        <div className="footer">
          <span>{activeCount} items left</span>
          <button onClick={clearCompleted} className="clear-btn">
            Clear completed
          </button>
          <button
            onClick={() => setIsStressTest(!isStressTest)}
            className="stress-btn"
          >
            {isStressTest ? "Stop" : "Start"} Stress Test
          </button>
        </div>

        {isStressTest && (
          <StressTest onTodosUpdate={setTodos} currentTodos={todos} />
        )}
      </div>
    </div>
  );
}

export default App;
