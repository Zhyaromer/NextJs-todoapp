'use client';

import { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="text-gray-900 flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}