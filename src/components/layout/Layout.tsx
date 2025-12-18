import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
    return (
        <div className="min-h-screen bg-background font-sans text-text-primary">
            <Sidebar />
            <Header />
            <main className="pl-64 pt-16 min-h-screen transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
