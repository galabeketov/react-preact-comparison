import { Todo } from "@comparison/shared";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className="todo-text">{todo.text}</span>
          <button onClick={() => onDelete(todo.id)} className="delete-btn">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
