import { useEffect, useState } from "preact/hooks";
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
    console.log("🔥 Stress Test Started!", { todoCount, updateInterval });

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

    return () => {
      console.log("🛑 Stress Test Stopped!");
      clearInterval(interval);
    };
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
            onInput={(e) =>
              setTodoCount(Number((e.target as HTMLInputElement).value))
            }
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
            onInput={(e) =>
              setUpdateInterval(Number((e.target as HTMLInputElement).value))
            }
          />
          <span>{updateInterval}</span>
        </label>
      </div>
    </div>
  );
}
