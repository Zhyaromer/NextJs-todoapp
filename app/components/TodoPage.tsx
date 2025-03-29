'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import { Todo } from '../../types';

type Props = {
    userid: string
};

export default function Home({ userid }: Props) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTodos = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/todos/getalltodos?userid=${userid}`);
            const data = await response.json();
            setTodos(data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userid]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = useCallback(async (text: string) => {
        if (text.trim()) {
            const newTodo: Todo = {
                userid: userid,
                task: text,
                complete: false,
            };
            await fetch('http://localhost:3000/api/todos/add', {
                method: 'POST',
                body: JSON.stringify(newTodo),
            });
            fetchTodos();
        }
    }, [userid, fetchTodos]);

    const toggleTodo = useCallback(async (id: number) => {
        await fetch(`http://localhost:3000/api/todos/toggle?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setTodos(prevTodos => prevTodos?.map(todo =>
            todo.id === id ? { ...todo, complete: !todo.complete } : todo
        ));
    }, []);

    const deleteTodo = useCallback(async (id: number) => {
        await fetch(`http://localhost:3000/api/todos/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const memoizedTodoList = useMemo(() => (
        <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            loading={isLoading}
        />
    ), [todos, toggleTodo, deleteTodo,isLoading]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <AddTodoForm onAddTodo={addTodo} />
                    {memoizedTodoList}
                </div>
            </div>
        </main>
    );
}