'use server';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import TodoPage from '../components/TodoPage';

export default async function Home() {
  const user = await auth();
  if (!user) {
    notFound();
  }

  return <TodoPage userid={user?.user?.id || ''} />;
}