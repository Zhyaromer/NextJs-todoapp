'use client';

import { Todo } from '../../types';
import TodoItem from '../components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loading: boolean;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  loading
}: TodoListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  if (todos?.length === 0) {
    return <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-2">
      {todos?.map((todo) => (
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