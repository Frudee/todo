import { useState } from "react";
import type { Todo } from "./types/Todo";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import { getTaskWord } from "./utils/getTaskWord";

export type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">ToDo App</h1>

        <TodoInput onAdd={addTodo} />

        <FilterButtons currentFilter={filter} onChangeFilter={setFilter} />

        <TodoList todos={filteredTodos} onToggle={toggleTodo} />

        <div className="flex justify-between items-center text-gray-700 text-sm">
          <span>
            {activeCount} {getTaskWord(activeCount)}
          </span>
          <button
            onClick={clearCompleted}
            disabled={todos.filter((t) => t.completed).length === 0}
            className="text-red-500 hover:underline disabled:text-gray-400"
          >
            Очистить выполненные
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
