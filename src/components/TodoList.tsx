import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggle }) => {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500 py-2">Задачи отсутствуют</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 mb-4" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default TodoList;
