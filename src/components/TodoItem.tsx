import React, { useState } from "react";

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, toggleComplete, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center bg-white shadow p-3 mb-2 rounded-lg ${
        todo.completed ? "line-through text-gray-400" : ""
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          className="flex-1 mr-2 border p-1 rounded"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span className="flex-1">{todo.text}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>

        <button
          onClick={() => toggleComplete(todo.id)}
          className={`${
            todo.completed ? "bg-gray-500" : "bg-blue-500"
          } text-white px-3 py-1 rounded-lg hover:opacity-80`}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
      </div>
    </div>
  );
};
