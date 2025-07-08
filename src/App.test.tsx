import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("ToDo App", () => {
  test("добавляет новую задачу", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/введите новую задачу/i);
    const addBtn = screen.getByText(/добавить/i);

    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("переключает статус задачи", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/введите новую задачу/i);
    const addBtn = screen.getByText(/добавить/i);

    fireEvent.change(input, { target: { value: "Тестовая задача" } });
    fireEvent.click(addBtn);

    const task = screen.getByText("Тестовая задача");
    fireEvent.click(task);
    expect(task).toHaveClass("line-through");
  });

  test("очищает выполненные задачи", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/введите новую задачу/i);
    const addBtn = screen.getByText(/добавить/i);

    // Добавляем задачу
    fireEvent.change(input, { target: { value: "Выполненная задача" } });
    fireEvent.click(addBtn);

    // Отмечаем выполненной
    const task = screen.getByText("Выполненная задача");
    fireEvent.click(task);

    const clearBtn = screen.getByText(/очистить выполненные/i);
    expect(clearBtn).not.toBeDisabled();

    fireEvent.click(clearBtn);

    expect(screen.queryByText("Выполненная задача")).toBeNull();
  });

  test("фильтрует задачи: только активные", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/введите новую задачу/i);
    const addBtn = screen.getByText(/добавить/i);

    // Добавляем 2 задачи
    fireEvent.change(input, { target: { value: "Активная задача" } });
    fireEvent.click(addBtn);

    fireEvent.change(input, { target: { value: "Завершенная задача" } });
    fireEvent.click(addBtn);

    // Завершаем одну
    const completedTask = screen.getByText("Завершенная задача");
    fireEvent.click(completedTask);

    // Переключаем фильтр
    fireEvent.click(screen.getByText("Активные"));

    // Проверяем что осталась только активная
    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.queryByText("Завершенная задача")).toBeNull();
  });
});
