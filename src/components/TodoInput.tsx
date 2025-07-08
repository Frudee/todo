import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col flex sm:flex sm:flex-row gap-3 sm:gap-0 mb-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите новую задачу"
        className="flex-grow border border-gray-300 rounded-l sm:px-3 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
      >
        Добавить
      </button>
    </form>
  );
};

export default TodoInput;
