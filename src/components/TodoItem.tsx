import type { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
  return (
    <li
      className="flex items-center py-2 cursor-pointer hover:bg-gray-50"
      onClick={() => onToggle(todo.id)}
      data-testid="todo-item"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="mr-3 w-5 h-5"
      />
      <span
        className={`flex-grow select-none ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.text}
      </span>
    </li>
  );
};

export default TodoItem;
