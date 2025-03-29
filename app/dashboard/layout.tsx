
import type { ReactNode } from 'react';
import Link from 'next/link';
import { auth, signOut } from "@/auth";
import Image from 'next/image';
import { redirect } from 'next/navigation';

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
    const session = await auth();
    if (!session) {
        redirect('/');
    }

    return (
        <section>
            <nav className='bg-slate-900 p-4 px-32'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-3xl font-bold'><span className=' text-white'>To Do List</span>🎮</h1>
                    </div>
                    <div className='flex flex-row justify-around items-center gap-4'>
                        <Link href={'/dashboard'}>Home</Link>
                        {session ? (
                            <div className='flex flex-row justify-around items-center gap-4'>
                                <div>
                                    <form className='cursor-pointer' action={async () => {
                                        "use server";
                                        await signOut();
                                    }}>
                                        <button type="submit" className="cursor-pointer">Logout</button>
                                    </form>
                                </div>
                                <div>
                                    <p>welcome {session.user?.name?.split(' ')[0]}</p>
                                </div>
                                <div className='cursor-pointer'>
                                    <Image className='rounded-full border border-sky-500' src={session.user?.image ?? ''} alt={session.user?.name ?? ''} width={50} height={50} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link href={'/login'}>Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {children}
        </section>
    );
}
