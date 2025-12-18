import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Network, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: '대시보드', to: '/' },
    { icon: Users, label: '고객 관리', to: '/customers' },
    { icon: Calendar, label: '일정 관리', to: '/schedule' },
    { icon: Network, label: '네트워크', to: '/network' },
];

export function Sidebar() {
    const handleSignOut = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            // In a real app, clear tokens here
            alert('로그아웃 되었습니다.');
            window.location.reload();
        }
    };

    return (
        <aside className="h-screen w-64 bg-surface border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 shadow-xl">
            <div className="p-6 flex items-center justify-center border-b border-gray-100/50">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    Ruby-Cell
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/5 text-primary font-medium shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5 transition-colors" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-primary hover:bg-red-50 w-full rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span>로그아웃</span>
                </button>
            </div>
        </aside>
    );
}
