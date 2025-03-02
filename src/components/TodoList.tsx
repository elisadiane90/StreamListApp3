import React from "react";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  return (
    <div className="w-full max-w-md">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};