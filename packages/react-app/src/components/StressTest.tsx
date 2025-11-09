import { useEffect, useState } from "react";
import { Todo } from "../types";
import { generateTodos } from "../utils";

interface StressTestProps {
  onTodosUpdate: (todos: Todo[]) => void;
  currentTodos: Todo[];
}

export default function StressTest({
  onTodosUpdate,
  currentTodos,
}: StressTestProps) {
  const [todoCount, setTodoCount] = useState(100);
  const [updateInterval, setUpdateInterval] = useState(100);

  useEffect(() => {
    // Generate initial stress test todos
    const stressTodos = generateTodos(todoCount);
    onTodosUpdate([...currentTodos, ...stressTodos]);

    // Periodic updates
    const interval = setInterval(() => {
      onTodosUpdate((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        return prev.map((todo, i) =>
          i === randomIndex ? { ...todo, completed: !todo.completed } : todo
        );
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [todoCount, updateInterval]);

  return (
    <div className="stress-test">
      <h3>🔥 Stress Test Active</h3>
      <div className="stress-controls">
        <label>
          Todo Count:
          <input
            type="range"
            min="10"
            max="1000"
            value={todoCount}
            onChange={(e) => setTodoCount(Number(e.target.value))}
          />
          <span>{todoCount}</span>
        </label>
        <label>
          Update Interval (ms):
          <input
            type="range"
            min="10"
            max="500"
            value={updateInterval}
            onChange={(e) => setUpdateInterval(Number(e.target.value))}
          />
          <span>{updateInterval}</span>
        </label>
      </div>
    </div>
  );
}
