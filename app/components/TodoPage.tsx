'use client';
import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import { Todo } from '../../types';

type Props = {
    userid: string
};

export default function Home({ userid }: Props) {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = async (text: string) => {
        if (text.trim()) {
            const newTodo: Todo = {
                userid: userid,
                task: text,
                complete: false,
            };
            await fetch('http://localhost:3000/api/todos/add', {
                method: 'POST',
                body: JSON.stringify(newTodo),
            })
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/todos/getalltodos?userid=${userid}`);
                const data = await response.json();
                setTodos(data.todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, [userid]);

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.complete } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.userid !== id.toString()));
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <AddTodoForm onAddTodo={addTodo} />
                    <TodoList
                        todos={todos}
                        onToggleTodo={toggleTodo}
                        onDeleteTodo={deleteTodo}
                    />
                </div>
            </div>
        </main>
    );
}