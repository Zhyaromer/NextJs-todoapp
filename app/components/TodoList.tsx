'use client';

import { Todo } from '../../types';
import TodoItem from '../components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
}