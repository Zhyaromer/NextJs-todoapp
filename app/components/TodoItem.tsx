'use client';

import { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => onToggle(todo.id || 0)}
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
        />
        <span
          className={`ml-3 ${
            todo.complete ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.task}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id || 0)}
        className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}